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
  const [sortOption, setSortOption] = useState<string>("year-desc");
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // isDropdownOpen state removed as DaisyUI handles this via tabIndex
  const dropdownRef = useRef<HTMLDivElement>(null); // Still needed for click outside logic

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const genreName = params.genreName
    ? decodeURIComponent(params.genreName)
    : null;
  const isGenresPage = location.pathname === "/genres";

  // Close dropdown when clicking outside
  // Note: This useEffect still uses dropdownRef, which is necessary for closing the dropdown
  // when clicking outside of it, even if isDropdownOpen state is removed.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the click is outside the dropdown element
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Since we removed isDropdownOpen state, we can't programmatically close it this way.
        // DaisyUI dropdowns typically close on outside clicks automatically due to focus loss
        // when clicking outside the dropdown element. The tabIndex={0} on the label
        // makes it focusable, and clicking outside shifts focus, closing the dropdown.
        // We keep this listener in case there are specific scenarios where default behavior
        // needs reinforcement, but it's less critical without direct state control.
        // If you need programmatic closing, you might need a different approach or re-add state.
      }
    }

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Effect to fetch and process movie data
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        // Fetch data from the dashboard endpoint
        const response = await axios.get(import.meta.env.VITE_GET_DASHBOARD);

        // Combine movies from different categories and remove duplicates
        const allMovies: Movie[] = [
          ...response.data.popularMovies,
          ...response.data.randomMovies,
          ...response.data.newestPerGenre,
        ];

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
                genreNames: [genreNameValue], // Add genreNames for potential future use
                // Calculate rating based on DiaryEntry count, capped between 1 and 10
                rating: movie._count?.DiaryEntry
                  ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2))
                  : undefined,
              });
            });
          }
        });

        // Convert map to array, filter genres with less than 10 movies,
        // limit movies per genre to 30 (randomly selected if more),
        // sort movies within each genre by year (descending),
        // and sort genres by the number of movies (descending)
        const genreGroupsArray = Array.from(genreMap.entries())
          .map(([genreName, movies]) => {
            // If there are more than 30 movies, randomly select only 30
            let displayMovies = movies;
            if (movies.length > 30) {
              // Create a shuffled copy and take first 30
              displayMovies = [...movies]
                .sort(() => 0.5 - Math.random()) // Shuffle randomly
                .slice(0, 30); // Take the first 30
            }

            return {
              genreName,
              movies: displayMovies.sort((a, b) => b.year - a.year), // Sort movies by year descending
            };
          })
          .filter((group) => group.movies.length >= 10) // Only include genres with at least 10 movies
          .sort((a, b) => b.movies.length - a.movies.length); // Sort genres by movie count descending

        setGenreGroups(genreGroupsArray);

        // If a specific genre is requested in the URL, find and set it as the current genre
        if (genreName) {
          const specificGenre = genreGroupsArray.find(
            (group) => group.genreName.toLowerCase() === genreName.toLowerCase()
          );

          if (specificGenre) {
            setCurrentGenre(specificGenre);
            // Initialize displayMovies with the movies from the specific genre, sorted by default
            setDisplayMovies(specificGenre.movies);
          } else {
            // Set an error if the requested genre is not found or doesn't meet the minimum movie count
            setError(
              `No movies found for genre "${genreName}" or not enough movies to display.`
            );
          }
        }

        setLoading(false); // Data fetching and processing is complete
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchAllMovies(); // Execute the fetch operation
  }, [genreName]); // Re-run this effect when the genreName in the URL changes

  // Effect for sorting and filtering movies based on currentGenre, sortOption, and searchQuery
  useEffect(() => {
    // Only proceed if a genre is currently selected
    if (!currentGenre) return;

    // Start with the original list of movies for the current genre
    let filteredMovies = [...currentGenre.movies];

    // Apply search filter if the search query is not empty
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredMovies = filteredMovies.filter(
        (movie) =>
          // Filter movies where title or year includes the search query (case-insensitive for title)
          movie.title.toLowerCase().includes(query) ||
          movie.year.toString().includes(query)
      );
    }

    // Apply sorting based on the selected sort option
    const sortedMovies = [...filteredMovies]; // Create a copy to avoid mutating the original array
    switch (sortOption) {
      case "year-desc":
        sortedMovies.sort((a, b) => b.year - a.year); // Sort by year descending
        break;
      case "year-asc":
        sortedMovies.sort((a, b) => a.year - b.year); // Sort by year ascending
        break;
      case "title-asc":
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title ascending
        break;
      case "title-desc":
        sortedMovies.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title descending
        break;
      case "rating-desc":
        // Sort by rating descending, treating undefined ratings as 0 for sorting purposes
        sortedMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default case, no sorting applied (or could apply a default sort)
        break;
    }

    // Update the state with the sorted and filtered movies
    setDisplayMovies(sortedMovies);
  }, [currentGenre, sortOption, searchQuery]); // Re-run this effect when currentGenre, sortOption, or searchQuery changes

  // Helper function to navigate to a specific genre page
  const navigateToGenre = (genre: string) => {
    // setSearchQuery(""); // Clear search query when navigating to a new genre
    // Navigate to the new genre URL
    navigate(`/genres/${encodeURIComponent(genre)}`);
  };

  // Get a random movie poster URL from the current genre for the header background
  const getHeaderBackground = () => {
    // If no current genre or no movies, return null
    if (!currentGenre || currentGenre.movies.length === 0) return null;
    // Select a random index from the first 5 movies (or fewer if less than 5)
    const randomIndex = Math.floor(
      Math.random() * Math.min(5, currentGenre.movies.length)
    );
    // Return the poster URL of the randomly selected movie
    return currentGenre.movies[randomIndex]?.posterUrl;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="font-medium text-base-content/70">
          Loading movies...
        </span>
        <div className="w-48 h-2 bg-base-300 rounded-full overflow-hidden">
          {/* Simple loading bar animation */}
          <div
            className="h-full bg-primary animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>
    );
  }

  // Render error state
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
        {/* Button to navigate back to the all genres page */}
        <button className="btn btn-sm" onClick={() => navigate("/genres")}>
          Back to All Genres
        </button>
      </div>
    );
  }

  // Main component render
  return (
    <div className="container max-w-7xl mx-auto pb-12">
      {/* Page Header with Genre Dropdown */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-4 px-4 py-6">
        <div className="flex items-center gap-3">
          {/* Back button to All Genres */}
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={() => navigate("/genres")}
            aria-label="Back to all genres"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Movies by Genre</h1>
        </div>

        <div className="flex gap-3">
          {/* Genre Dropdown Selector - Improved with DaisyUI */}
          {/* The dropdown state is managed by DaisyUI's CSS and the tabIndex attribute */}
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
            {/* The dropdown content is shown/hidden by DaisyUI based on the label's focus */}
            <div
              tabIndex={0} // Make the dropdown content focusable
              className="dropdown-content z-[100] card card-compact bg-base-200 shadow-xl rounded-box w-80"
            >
              <div className="card-body">
                {/* Search input for genres */}
                <div className="form-control mb-2">
                  <input
                    type="text"
                    placeholder="Search genres..."
                    className="input input-sm input-bordered w-full"
                    // Note: This search input filters the list of genres in the dropdown, not the movies
                    // A separate search input is provided for filtering movies within a selected genre
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                    value={searchQuery}
                  />
                </div>

                {/* Link to view all genres */}
                <a
                  className={`btn btn-sm ${
                    isGenresPage ? "btn-active" : "btn-ghost"
                  } mb-2 justify-start`}
                  onClick={() => navigate("/genres")} // Navigate to the all genres page
                >
                  All Genres
                </a>

                <div className="divider my-1">Select a Genre</div>

                {/* Scrollable list of genres */}
                <div className="max-h-[50vh] overflow-y-auto">
                  <div className="grid grid-cols-1 gap-1">
                    {/* Map through genre groups to create dropdown items */}
                    {genreGroups
                      .filter(
                        (
                          group // Filter genres based on the search query
                        ) =>
                          group.genreName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                      )
                      .map((group) => (
                        <button
                          key={group.genreName}
                          className={`btn btn-sm ${
                            currentGenre?.genreName === group.genreName
                              ? "btn-active"
                              : "btn-ghost"
                          } justify-between`}
                          onClick={() => navigateToGenre(group.genreName)} // Navigate to the selected genre page
                        >
                          <span className="truncate">{group.genreName}</span>
                          <span className="badge badge-sm">
                            {group.movies.length}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button to navigate back to Home */}
          <button className="btn btn-outline" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isGenresPage ? (
        // Display All Genres Grid View when on /genres route
        <>
          <div className="mb-6 px-4">
            <p className="text-lg">Browse all {genreGroups.length} genres</p>
          </div>

          {/* Grid of genre cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 px-4">
            {genreGroups.map((group) => (
              <div
                key={group.genreName}
                className="aspect-video rounded-lg overflow-hidden relative cursor-pointer shadow-lg hover:shadow-xl transition-all group"
                onClick={
                  () =>
                    navigate(`/genres/${encodeURIComponent(group.genreName)}`) // Navigate to the specific genre page on click
                }
              >
                {/* Use the first movie poster as the genre thumbnail */}
                {group.movies[0] && (
                  <img
                    src={group.movies[0].posterUrl}
                    alt={group.genreName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Provide a placeholder image if the poster fails to load
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/800x400?text=No+Poster";
                    }}
                  />
                )}
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/90 via-neutral/30 to-transparent"></div>
                {/* Genre name and movie count overlay */}
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
        // Display Single Genre Movie Grid when a specific genre is selected
        <>
          {/* Hero section with genre info and background image */}
          <div className="w-full mb-8 relative overflow-hidden">
            {/* Background image with blur and opacity */}
            {getHeaderBackground() && (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={getHeaderBackground() || ""}
                  alt={currentGenre?.genreName}
                  className="w-full h-full object-cover object-center opacity-20 blur-sm"
                />
                {/* Gradient overlay on background image */}
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/80 to-base-100/70"></div>
              </div>
            )}

            {/* Genre information and controls */}
            <div className="px-4 py-10 relative z-10 container mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Genre poster collage (hidden on small screens) */}
                <div className="aspect-[2/3] w-32 md:w-48 rounded-lg overflow-hidden shadow-xl relative hidden sm:block">
                  {currentGenre && currentGenre.movies.length > 0 && (
                    <img
                      src={currentGenre.movies[0].posterUrl}
                      alt={currentGenre.genreName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Placeholder if poster fails
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/800x1200?text=No+Poster";
                      }}
                    />
                  )}
                </div>

                {/* Genre title, count, description, and controls */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-3xl font-bold">
                      {currentGenre?.genreName}
                    </h2>
                    <div className="badge badge-lg">
                      {currentGenre?.movies.length} movies
                    </div>
                  </div>

                  <p className="text-base-content/70 mb-4">
                    Browse our collection of {currentGenre?.genreName} movies,
                    from classics to the latest releases.
                  </p>

                  {/* Search and Sort controls */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    {/* Search input for movies within the current genre */}
                    <div className="form-control max-w-xs">
                      <input
                        type="text"
                        placeholder="Search in this genre..."
                        className="input input-bordered w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state for movie filtering
                      />
                    </div>

                    {/* Sort option select dropdown */}
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)} // Update sort option state
                    >
                      <option value="year-desc">Newest first</option>
                      <option value="year-asc">Oldest first</option>
                      <option value="title-asc">Title (A-Z)</option>
                      <option value="title-desc">Title (Z-A)</option>
                      <option value="rating-desc">Highest rated</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results count and stats */}
          <div className="px-4 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-base-content/70">
                {/* Display number of movies shown and search query if applicable */}
                {displayMovies.length === 0
                  ? "No movies found"
                  : `Showing ${displayMovies.length} movie${
                      displayMovies.length !== 1 ? "s" : ""
                    }`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          </div>

          {/* Movie grid with improved cards */}
          {displayMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
              {/* Map through filtered and sorted movies to display cards */}
              {displayMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="group bg-base-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to the movie detail page on click
                >
                  {/* Movie poster */}
                  <div className="aspect-[2/3] overflow-hidden relative">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => {
                        // Placeholder if poster fails
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/800x1200?text=No+Poster";
                      }}
                    />
                    {/* Rating badge */}
                    <div className="absolute top-2 right-2">
                      {movie.rating !== undefined && ( // Only show badge if rating exists
                        <div className="badge badge-primary">
                          {movie.rating.toFixed(1)}
                        </div>
                      )}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Movie title and year */}
                  <div className="p-3 flex-grow flex flex-col">
                    <h3 className="font-medium leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-base-content/70">{movie.year}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Display message when no movies are found after filtering/searching
            <div className="flex flex-col items-center justify-center h-64 px-4">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-medium mb-2">No movies found</h3>
              <p className="text-base-content/70 text-center mb-4">
                Try adjusting your search or explore a different genre
              </p>
              {/* Button to clear the search query */}
              <button
                className="btn btn-primary"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenrePage;
