import { useState, useEffect } from "react"; // Removed useRef import
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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

interface GenreMovieGroup {
  genreName: string;
  movies: Movie[];
}

const GenrePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [genreGroups, setGenreGroups] = useState<GenreMovieGroup[]>([]);
  const [currentGenre, setCurrentGenre] = useState<GenreMovieGroup | null>(
    null
  );
  const [sortOption, setSortOption] = useState<string>("year-desc");
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Removed genreSearchQuery state as it was unused

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const genreName = params.genreName
    ? decodeURIComponent(params.genreName)
    : null;
  const isGenresPage = location.pathname === "/genres";

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_GET_DASHBOARD);

        // Combine movies from different categories
        const allMovies: Movie[] = [
          ...response.data.popularMovies,
          ...response.data.randomMovies,
          ...response.data.newestPerGenre,
        ];

        // Deduplicate movies
        const uniqueMoviesMap = new Map<string, Movie>();
        allMovies.forEach((movie) => {
          if (!uniqueMoviesMap.has(movie.id)) {
            uniqueMoviesMap.set(movie.id, movie);
          }
        });

        // Group unique movies by genre
        const genreMap = new Map<string, Movie[]>();
        Array.from(uniqueMoviesMap.values()).forEach((movie) => {
          if (movie.genres && movie.genres.length > 0) {
            movie.genres.forEach((genreObj) => {
              const genreNameValue = genreObj.genre.name;
              if (!genreMap.has(genreNameValue)) {
                genreMap.set(genreNameValue, []);
              }
              // Add movie to the genre group, including calculated rating
              genreMap.get(genreNameValue)?.push({
                ...movie,
                genreNames: [genreNameValue],
                rating: movie._count?.DiaryEntry
                  ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2))
                  : undefined,
              });
            });
          }
        });

        // Process genres and their movies
        const genreGroupsArray = Array.from(genreMap.entries())
          .map(([genreName, movies]) => {
            // If there are more than 30 movies, randomly select only 30
            let displayMovies = movies;
            if (movies.length > 30) {
              // Create a shuffled copy and take first 30
              displayMovies = [...movies]
                .sort(() => 0.5 - Math.random())
                .slice(0, 30);
            }

            return {
              genreName,
              movies: displayMovies.sort((a, b) => b.year - a.year), // Sort by year descending
            };
          })
          .filter((group) => group.movies.length >= 10) // Only include genres with at least 10 movies
          .sort((a, b) => b.movies.length - a.movies.length); // Sort by movie count

        setGenreGroups(genreGroupsArray);

        // If genreName is provided in URL, find that specific genre group
        if (genreName) {
          const specificGenre = genreGroupsArray.find(
            (group) => group.genreName.toLowerCase() === genreName.toLowerCase()
          );

          if (specificGenre) {
            setCurrentGenre(specificGenre);
            setDisplayMovies(specificGenre.movies);
          } else {
            setError(
              `No movies found for genre "${genreName}" or not enough movies to display.`
            );
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllMovies();

    // Reset search when navigating between genres
    setSearchQuery("");
    // Removed setGenreSearchQuery call
  }, [genreName]);

  // Effect for sorting and filtering movies
  useEffect(() => {
    if (!currentGenre) return;

    let filteredMovies = [...currentGenre.movies];

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
  }, [currentGenre, sortOption, searchQuery]);

  // Navigate to genre handler
  const navigateToGenre = (genre: string) => {
    navigate(`/genres/${encodeURIComponent(genre)}`);
  };

  // Navigate to all genres
  const navigateToAllGenres = () => {
    navigate("/genres");
  };

  // Navigate to movie detail
  const navigateToMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  // Handle errors for image loading
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    isPoster = true
  ) => {
    (e.target as HTMLImageElement).src = isPoster
      ? "https://placehold.co/800x1200?text=No+Poster"
      : "https://placehold.co/800x400?text=No+Image";
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
        <div className="flex justify-center mt-6">
          <button className="btn btn-primary" onClick={navigateToAllGenres}>
            Back to All Genres
          </button>
        </div>
      </div>
    );
  }

  // Determine grid columns based on screen size for movie cards
  const movieCardGridClasses =
    "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6";

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
              <li>
                <a className="hover:underline" onClick={navigateToAllGenres}>
                  Genres
                </a>
              </li>
              {!isGenresPage && <li>{currentGenre?.genreName}</li>}
            </ul>
          </div>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-2">
          {isGenresPage ? "Browse Genres" : currentGenre?.genreName}
        </h1>
      </div>

      {/* Main Content */}
      {isGenresPage ? (
        // All Genres Grid View
        <div className="px-4">
          <div className="mb-6">
            <p className="text-base-content/70">
              Explore our collection of {genreGroups.length} movie genres
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {genreGroups.map((group) => (
              <div
                key={group.genreName}
                className="aspect-[2/3] rounded-lg overflow-hidden relative cursor-pointer shadow-md hover:shadow-lg transition-all"
                onClick={() => navigateToGenre(group.genreName)}
              >
                {group.movies[0] && (
                  <img
                    src={group.movies[0].posterUrl}
                    alt={group.genreName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => handleImageError(e, false)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">
                    {group.genreName}
                  </h2>
                  <p className="text-white/80">{group.movies.length} movies</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Single Genre Movie Grid with enhanced UI
        <div>
          {/* Genre Controls */}
          <div className="w-full mb-6 px-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
              <p className="text-base-content/70 max-w-2xl">
                Browse our collection of {currentGenre?.movies.length}{" "}
                {currentGenre?.genreName} movies, from classics to the latest
                releases.
              </p>

              {/* Controls and filtering */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="form-control w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search in this genre..."
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

                  {movie.rating !== undefined && (
                    <div className="absolute top-2 right-2">
                      <div className="badge badge-primary">
                        {movie.rating.toFixed(1)}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 hover:opacity-100 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                      {movie.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80">
                      {movie.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-2">No movies found</h3>
              <p className="text-base-content/70 text-center mb-4 max-w-md">
                Try adjusting your search or explore a different genre
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
      )}

      {/* Footer */}
      <footer className="footer footer-center p-4 mt-12 text-base-content border-t border-base-300">
        <div>
          <p className="text-sm">
            Browse and discover your favorite movies by genre
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GenrePage;
