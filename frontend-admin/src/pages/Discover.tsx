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
  _count?: {
    DiaryEntry?: number;
  };
  rating?: number;
  genreNames?: string[];
}

interface ApiResponse {
  popularMovies: Movie[];
  randomMovies: Movie[];
  newestPerGenre: Movie[];
}

const DiscoverPage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("year-desc");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
              rating: movie._count?.DiaryEntry
                ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2))
                : undefined,
            });
          }
        });

        // Get all movies as an array with consistent ordering by ID
        // This ensures the same movies appear every time until cache refreshes
        const allUniqueMovies = Array.from(uniqueMoviesMap.values()).sort(
          (a, b) => a.id.localeCompare(b.id)
        );

        // Use a deterministic "shuffle" based on movie IDs
        // This creates a pseudo-random selection that remains the same between refreshes
        const pseudoRandomMovies = allUniqueMovies
          .map((movie) => ({
            movie,
            // Create a deterministic but seemingly random sort value using the ID
            sortValue:
              parseInt(movie.id.replace(/[^0-9]/g, "").slice(0, 8) || "0", 10) %
              10000,
          }))
          .sort((a, b) => a.sortValue - b.sortValue)
          .map((item) => item.movie)
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
      let filteredMovies = [...allMovies];

      // Apply search filter if any
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filteredMovies = filteredMovies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.year.toString().includes(query)
        );
      }

      // Apply sorting
      switch (sortOption) {
        case "year-desc":
          filteredMovies.sort((a, b) => b.year - a.year);
          break;
        case "year-asc":
          filteredMovies.sort((a, b) => a.year - b.year);
          break;
        case "title-asc":
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title-desc":
          filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "rating-desc":
          filteredMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }

      setDisplayMovies(filteredMovies);
      // Reset to first page when sort changes or search changes
      setCurrentPage(1);
    }
  }, [allMovies, sortOption, searchQuery]);

  // Get current page of movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = displayMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(displayMovies.length / moviesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

      <div className="w-full mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
          <p className="text-lg mb-4 md:mb-0">
            Explore our selection of {allMovies.length} movies from our
            collection.
          </p>

          {/* Controls and filtering - matching Genre page style */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="form-control w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search movies..."
                className="input input-sm input-bordered w-full sm:max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="select select-sm select-bordered w-full sm:w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="year-desc">Newest first</option>
              <option value="year-asc">Oldest first</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="rating-desc">Highest rated</option>
            </select>
          </div>
        </div>

        {/* Results count and stats */}
        <div className="flex justify-between items-center">
          <p className="text-base-content/70">
            {displayMovies.length === 0
              ? "No movies found"
              : `Showing ${displayMovies.length} movie${
                  displayMovies.length !== 1 ? "s" : ""
                }`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
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

            {movie.rating !== undefined && (
              <div className="absolute top-2 right-2">
                <div className="badge badge-primary">
                  {movie.rating.toFixed(1)}
                </div>
              </div>
            )}

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
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
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
