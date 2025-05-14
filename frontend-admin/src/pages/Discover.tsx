import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  year: number;
  genres?: {
    genre: {
      name: string;
    };
  }[];
  genreNames?: string[];
}

interface ApiResponse {
  popularMovies: Movie[];
  randomMovies: Movie[];
  newestPerGenre: Movie[];
}

// Define sorting options
type SortField = "title" | "year";
type SortDirection = "asc" | "desc";

interface SortOption {
  field: SortField;
  direction: SortDirection;
  label: string;
}

const sortOptions: SortOption[] = [
  { field: "year", direction: "desc", label: "Newest First" },
  { field: "year", direction: "asc", label: "Oldest First" },
  { field: "title", direction: "asc", label: "Title (A-Z)" },
  { field: "title", direction: "desc", label: "Title (Z-A)" },
];

const DiscoverPage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);
  const moviesPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          import.meta.env.VITE_GET_DASHBOARD
        );

        // Get all movies from all categories
        const allMovies = [
          ...response.data.popularMovies,
          ...response.data.randomMovies,
          ...response.data.newestPerGenre,
        ];

        // Remove duplicates by creating a Map with movie ID as the key
        const uniqueMoviesMap = new Map<string, Movie>();
        allMovies.forEach((movie) => {
          if (!uniqueMoviesMap.has(movie.id)) {
            // Add genre names array for easier display
            uniqueMoviesMap.set(movie.id, {
              ...movie,
              genreNames: movie.genres?.map((g) => g.genre.name) || [],
            });
          }
        });

        // Get all movies as an array with consistent ordering by ID
        // This ensures the same movies appear every time until cache refreshes
        const allUniqueMovies = Array.from(uniqueMoviesMap.values())
          .sort((a, b) => a.id.localeCompare(b.id));
        
        // Use a deterministic "shuffle" based on movie IDs
        // This creates a pseudo-random selection that remains the same between refreshes
        const pseudoRandomMovies = allUniqueMovies
          .map(movie => ({
            movie,
            // Create a deterministic but seemingly random sort value using the ID
            sortValue: parseInt(movie.id.replace(/[^0-9]/g, '').slice(0, 8) || '0', 10) % 10000
          }))
          .sort((a, b) => a.sortValue - b.sortValue)
          .map(item => item.movie)
          .slice(0, 100);
        
        setAllMovies(pseudoRandomMovies);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Apply sorting whenever sort option or all movies change
  useEffect(() => {
    if (allMovies.length > 0) {
      const sortedMovies = [...allMovies].sort((a, b) => {
        if (currentSort.field === "title") {
          // String comparison for titles
          const comparison = a.title.localeCompare(b.title);
          return currentSort.direction === "asc" ? comparison : -comparison;
        } else {
          // Numeric comparison for years
          const comparison = a.year - b.year;
          return currentSort.direction === "asc" ? comparison : -comparison;
        }
      });
      setDisplayMovies(sortedMovies);
      // Reset to first page when sort changes
      setCurrentPage(1);
    }
  }, [allMovies, currentSort]);

  // Get current page of movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = displayMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(displayMovies.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    setCurrentSort(option);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">Loading movies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header with breadcrumb navigation */}
      <div className="mb-6">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a className="hover:underline" onClick={() => navigate("/")}>
                Home
              </a>
            </li>
            <li>Discover</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discover Movies</h1>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-8">
        <p className="text-lg mb-4 md:mb-0">
          Explore our selection of {displayMovies.length} movies from our collection.
        </p>
        
        <div className="flex flex-wrap gap-2">
          <span className="self-center mr-2 font-medium">Sort by:</span>
          <div className="join">
            {sortOptions.map((option) => (
              <button
                key={`${option.field}-${option.direction}`}
                className={`join-item btn ${
                  currentSort.field === option.field && 
                  currentSort.direction === option.direction
                    ? "btn-active"
                    : ""
                }`}
                onClick={() => handleSortChange(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <div className="h-80 overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/800x400?text=No+Poster";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 via-transparent to-transparent opacity-100" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
              {movie.genreNames && movie.genreNames.length > 0 && (
                <div className="mb-1.5">
                  <span className="bg-neutral text-neutral-content px-2 py-0.5 text-xs font-medium rounded">
                    {movie.genreNames.slice(0, 2).join(" / ")}
                  </span>
                </div>
              )}
              <div className="px-3 py-1 rounded mx-auto inline-block">
                <h3 className="text-sm font-medium leading-tight">
                  {movie.title} ({movie.year})
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            
            {/* Only show a subset of pages if there are many */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              // For large page counts, show pages around current page
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
              }
              
              return (
                <button
                  key={pageNum}
                  className={`join-item btn ${
                    currentPage === pageNum ? "btn-active" : ""
                  }`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              className="join-item btn"
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
