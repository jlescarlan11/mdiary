import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Removed unused imports: useParams, useLocation

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

// Removed unused interface: GenreMovieGroup

const DiscoverPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [sortOption, setSortOption] = useState<string>("year-desc");
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();
  // Removed unused variable: location

  // Determine grid columns based on screen size for movie cards
  const movieCardGridClasses =
    "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6";

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_GET_DASHBOARD);

        // Combine movies from different categories and deduplicate
        const combinedMovies: Movie[] = [
          ...response.data.popularMovies,
          ...response.data.randomMovies,
          ...response.data.newestPerGenre,
        ];

        const uniqueMoviesMap = new Map<string, Movie>();
        combinedMovies.forEach((movie) => {
          if (!uniqueMoviesMap.has(movie.id)) {
            // Add movie to the map, including calculated rating and genreNames
            uniqueMoviesMap.set(movie.id, {
              ...movie,
              genreNames: movie.genres?.map((g) => g.genre.name) || [],
              rating: movie._count?.DiaryEntry
                ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2))
                : undefined,
            });
          }
        });

        const uniqueMovies = Array.from(uniqueMoviesMap.values());
        setAllMovies(uniqueMovies);
        setDisplayMovies(uniqueMovies); // Initially display all fetched movies

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllMovies();
    // Reset search when navigating to discover page
    setSearchQuery("");
  }, []);

  // Effect for sorting and filtering movies
  useEffect(() => {
    let filteredMovies = [...allMovies];

    // Apply search filter if any
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.year.toString().includes(query) ||
          movie.genreNames?.some((genre) => genre.toLowerCase().includes(query)) // Also search by genre name
      );
    }

    // Apply sorting
    const sortedMovies = [...filteredMovies];
    switch (sortOption) {
      case "year-desc":
        sortedMovies.sort((a, b) => b.year - a.year);
        break;
      case "year-asc":
        sortedMovies.sort((a, b) => a.year - b.year);
        break;
      case "title-asc":
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating-desc":
        sortedMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setDisplayMovies(sortedMovies);
  }, [allMovies, sortOption, searchQuery]);

  // Navigate to movie detail
  const navigateToMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  // Handle errors for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src =
      "https://placehold.co/800x1200?text=No+Poster";
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-3 px-4">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="font-medium text-base-content/70">
          Loading movies...
        </span>
        <div className="w-48 h-2 bg-base-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 px-4">
        <div className="alert alert-error shadow-lg">
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
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto pb-12">
      {/* Header with breadcrumb navigation */}
      <div className="px-4 py-6">
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

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-2">Discover Movies</h1>
      </div>

      {/* Main Content */}
      <div>
        {/* Controls */}
        <div className="w-full mb-6 px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
            <p className="text-base-content/70 max-w-2xl">
              Explore our entire movie collection.
            </p>

            {/* Controls and filtering */}
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

        {/* Movie grid with consistent card styling */}
        {displayMovies.length > 0 ? (
          <div className={`${movieCardGridClasses} px-4`}>
            {displayMovies.map((movie) => (
              <div
                key={movie.id}
                className="aspect-[2/3] rounded-lg overflow-hidden relative cursor-pointer shadow-md hover:shadow-lg transition-all"
                onClick={() => navigateToMovie(movie.id)}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => handleImageError(e)}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {movie.rating !== undefined && (
                  <div className="absolute top-2 right-2">
                    <div className="badge badge-primary">
                      {movie.rating.toFixed(1)}
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 hover:opacity-100 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
                  <div className="px-3 py-1 rounded mx-auto inline-block">
                    <h3 className="text-sm font-medium leading-tight">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2">No movies found</h3>
            <p className="text-base-content/70 text-center mb-4 max-w-md">
              Try adjusting your search or explore a different filter
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 mt-12 text-base-content border-t border-base-300">
        <div>
          <p className="text-sm">Browse and discover your favorite movies</p>
        </div>
      </footer>
    </div>
  );
};

export default DiscoverPage;
