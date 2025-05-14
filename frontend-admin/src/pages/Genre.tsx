/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const genreName = params.genreName
    ? decodeURIComponent(params.genreName)
    : null;
  const isGenresPage = location.pathname === "/genres";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_GET_DASHBOARD);

        // Process movies by genre
        const genreMap = new Map<string, Movie[]>();
        const allMovies: Movie[] = [
          ...response.data.popularMovies,
          ...response.data.randomMovies,
          ...response.data.newestPerGenre,
        ];

        // Deduplicate movies (in case some appear in multiple categories)
        const uniqueMoviesMap = new Map<string, Movie>();
        allMovies.forEach((movie) => {
          if (!uniqueMoviesMap.has(movie.id)) {
            uniqueMoviesMap.set(movie.id, movie);
          }
        });

        // Group by genre
        Array.from(uniqueMoviesMap.values()).forEach((movie) => {
          if (movie.genres && movie.genres.length > 0) {
            movie.genres.forEach((genreObj) => {
              const genreNameValue = genreObj.genre.name;
              if (!genreMap.has(genreNameValue)) {
                genreMap.set(genreNameValue, []);
              }
              genreMap.get(genreNameValue)?.push({
                ...movie,
                genreNames: [genreNameValue],
              });
            });
          }
        });

        // Convert to array and sort by number of movies per genre (descending)
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
          .sort((a, b) => b.movies.length - a.movies.length);

        setGenreGroups(genreGroupsArray);

        // If genreName is provided in URL, find that specific genre group
        if (genreName) {
          const specificGenre = genreGroupsArray.find(
            (group) => group.genreName.toLowerCase() === genreName.toLowerCase()
          );

          if (specificGenre) {
            setCurrentGenre(specificGenre);
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
  }, [genreName]);

  // Helper function to transform Movie object
  const transformMovie = (movie: Movie): Movie => {
    return {
      ...movie,
      genreNames: movie.genres?.map((g) => g.genre.name) || [],
      rating: movie._count?.DiaryEntry
        ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2))
        : undefined,
    };
  };

  // Navigate to genre handler
  const navigateToGenre = (genre: string) => {
    setIsDropdownOpen(false);
    if (genre === "all") {
      navigate("/genres");
    } else if (currentGenre?.genreName !== genre) {
      navigate(`/genres/${encodeURIComponent(genre)}`);
    }
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
    <div className="container max-w-7xl mx-auto px-4 py-6">
      {/* Page Header with Genre Dropdown */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Movies by Genre</h1>

        <div className="flex gap-3">
          {/* Genre Dropdown Selector - Improved with DaisyUI */}
          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <label tabIndex={0} className="btn btn-primary m-1 min-w-[200px]">
              {isGenresPage ? (
                <>
                  Browse Genres <span className="ml-2">▼</span>
                </>
              ) : (
                <>
                  {currentGenre?.genreName} <span className="ml-2">▼</span>
                </>
              )}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-200 rounded-box w-72"
            >
              <li className={isGenresPage ? "bordered" : ""}>
                <a
                  className={isGenresPage ? "active font-bold" : "font-bold"}
                  onClick={() => navigate("/genres")}
                >
                  All Genres
                </a>
              </li>
              <li className="menu-title mt-2">
                <span>Select a Genre</span>
              </li>
              <div className="max-h-[50vh] overflow-y-auto">
                {genreGroups.map((group) => (
                  <li
                    key={group.genreName}
                    className={
                      currentGenre?.genreName === group.genreName
                        ? "bordered"
                        : ""
                    }
                  >
                    <a
                      className={
                        currentGenre?.genreName === group.genreName
                          ? "active"
                          : ""
                      }
                      onClick={() => navigateToGenre(group.genreName)}
                    >
                      <div className="flex justify-between w-full items-center">
                        <span>{group.genreName}</span>
                        <span className="badge badge-sm">
                          {group.movies.length}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </div>
            </ul>
          </div>

          <button className="btn btn-outline" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isGenresPage ? (
        // All Genres Grid View
        <>
          <div className="mb-6">
            <p className="text-lg">Browse all {genreGroups.length} genres</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {genreGroups.map((group) => (
              <div
                key={group.genreName}
                className="aspect-video rounded-lg overflow-hidden relative cursor-pointer shadow-lg hover:shadow-xl transition-all group"
                onClick={() =>
                  navigate(`/genres/${encodeURIComponent(group.genreName)}`)
                }
              >
                {/* Use the first movie poster as the genre thumbnail */}
                {group.movies[0] && (
                  <img
                    src={group.movies[0].posterUrl}
                    alt={group.genreName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/90 via-neutral/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">
                    {group.genreName}
                  </h2>
                  <p className="text-neutral-content">
                    {group.movies.length} movies
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Single Genre Movie Grid
        <>
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-bold">{currentGenre?.genreName}</h2>
              <p className="text-base-content/70">
                {currentGenre?.movies.length} movies
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {currentGenre?.movies.map((movie) => (
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
                  <div className="px-3 py-1 rounded mx-auto inline-block">
                    <h3 className="text-sm font-medium leading-tight">
                      {movie.title} ({movie.year})
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GenrePage;
