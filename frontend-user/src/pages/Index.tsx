import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define interfaces for data structures
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
  genreNames?: string[]; // Added for transformed data
}

interface ApiResponse {
  popularMovies: Movie[];
  randomMovies: Movie[];
  newestPerGenre: Movie[];
}

interface GenreMovie {
  genreName: string;
  movie: Movie;
}

const MovieCarousel = () => {
  // State variables
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const lastDragX = useRef(0);
  const velocityX = useRef(0);
  const animationFrameId = useRef<number | undefined>(undefined);
  const [skipTransition, setSkipTransition] = useState(false);
  const [genreMovies, setGenreMovies] = useState<GenreMovie[]>([]);
  const [limitedRandomMovies, setLimitedRandomMovies] = useState<Movie[]>([]);

  // Hook for navigation
  const navigate = useNavigate();

  // Effect to fetch movie data on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          import.meta.env.VITE_GET_DASHBOARD
        );

        // Limit popular movies to 10 for the carousel
        const limitedData = {
          ...response.data,
          popularMovies: response.data.popularMovies.slice(0, 10),
        };

        setData(limitedData);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // Update visible items count on mount and window resize
    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateVisibleItemsCount);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to process fetched data for genre and random movies
  useEffect(() => {
    if (data?.newestPerGenre) {
      const usedMovieIds = new Set<string>();
      const genreToMoviesMap = new Map<string, Movie[]>();

      // Group movies by genre
      data.newestPerGenre.forEach((movie) => {
        if (movie.genres && movie.genres.length > 0) {
          movie.genres.forEach((genreObj) => {
            const genreName = genreObj.genre.name;
            if (!genreToMoviesMap.has(genreName)) {
              genreToMoviesMap.set(genreName, []);
            }
            genreToMoviesMap.get(genreName)?.push(movie);
          });
        }
      });

      // Sort genres by the number of movies, descending
      const sortedGenres = Array.from(genreToMoviesMap.keys()).sort(
        (a, b) =>
          (genreToMoviesMap.get(b)?.length || 0) -
          (genreToMoviesMap.get(a)?.length || 0)
      );

      // Select top 10 genres
      const topGenres = sortedGenres.slice(0, 10);

      const genreMoviesArray: GenreMovie[] = [];

      // Select one unique movie per top genre
      topGenres.forEach((genreName) => {
        const moviesForGenre = genreToMoviesMap.get(genreName) || [];

        const unusedMovie = moviesForGenre.find(
          (movie) => !usedMovieIds.has(movie.id)
        );

        if (unusedMovie) {
          usedMovieIds.add(unusedMovie.id);
          genreMoviesArray.push({ genreName, movie: unusedMovie });
        }
      });

      setGenreMovies(genreMoviesArray);
    }

    if (data?.randomMovies) {
      // Create a deterministic random selection using movie IDs
      const pseudoRandomMovies = [...data.randomMovies]
        .map((movie) => ({
          movie,
          // Create a deterministic but seemingly random sort value using the ID
          sortValue:
            parseInt(movie.id.replace(/[^0-9]/g, "").slice(0, 8) || "0", 10) %
            10000,
        }))
        .sort((a, b) => a.sortValue - b.sortValue)
        .map((item) => item.movie)
        .slice(0, 10); // Limit to 10 random movies

      setLimitedRandomMovies(pseudoRandomMovies);
    }
  }, [data]); // Rerun when data changes

  // Function to update the number of visible items based on window width
  const updateVisibleItemsCount = () => {
    if (window.innerWidth < 768) {
      setVisibleItemsCount(3); // Mobile: 3 items visible
    } else {
      setVisibleItemsCount(5); // Desktop/Tablet: 5 items visible
    }
  };

  // Effect for automatic carousel sliding
  useEffect(() => {
    const popularMovies = data?.popularMovies;
    // Only start interval if there are movies and not dragging/swiping
    if (!popularMovies || popularMovies.length <= 1) return;

    const interval = setInterval(() => {
      if (mouseDown || swipeOffset !== 0) return; // Pause on drag/swipe
      setTransitioning(true); // Start transition animation
      setTimeout(() => {
        // Move to the next index after a short delay
        setCurrentIndex((prev) => (prev + 1) % popularMovies.length);
        setTransitioning(false); // End transition animation
      }, 300); // Match CSS transition duration
    }, 5000); // Auto-slide every 5 seconds

    // Cleanup interval on component unmount or dependencies change
    return () => clearInterval(interval);
  }, [data?.popularMovies, currentIndex, mouseDown, swipeOffset]); // Rerun when these dependencies change

  // --- Touch and Mouse Event Handlers for Carousel Swipe ---

  const handleTouchStart = (e: React.TouchEvent) => {
    if (transitioning) return; // Prevent interaction during transition
    setIsDragging(true); // Indicate dragging started
    const touch = e.targetTouches[0];
    setTouchStart(touch.clientX); // Record start position
    setTouchEnd(touch.clientX); // Initialize end position
    dragStartX.current = touch.clientX; // Record initial drag position
    lastDragX.current = touch.clientX; // Record last drag position for velocity calculation
    velocityX.current = 0; // Reset velocity
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return; // Only process if dragging
    const touch = e.targetTouches[0];
    setTouchEnd(touch.clientX); // Update end position

    // Calculate velocity
    velocityX.current = touch.clientX - lastDragX.current;
    lastDragX.current = touch.clientX;

    // Calculate and apply damped swipe offset
    const delta = touch.clientX - dragStartX.current;
    const dampedDelta = delta * 0.8; // Apply damping
    setSwipeOffset(dampedDelta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return; // Only process if dragging
    setIsDragging(false); // Indicate dragging ended

    const swipeDistance = touchEnd - touchStart;
    const swipeVelocity = velocityX.current;
    const threshold = 50; // Distance threshold for swipe
    const velocityThreshold = 1; // Velocity threshold for swipe

    // Determine swipe direction based on distance or velocity
    if (
      Math.abs(swipeDistance) > threshold ||
      Math.abs(swipeVelocity) > velocityThreshold
    ) {
      if (swipeDistance < 0 || swipeVelocity < -velocityThreshold) {
        animateToNextSlide("next"); // Swipe left -> next slide
      } else if (swipeDistance > 0 || swipeVelocity > velocityThreshold) {
        animateToNextSlide("prev"); // Swipe right -> previous slide
      }
    } else {
      animateSwipeReset(); // If not a strong swipe, reset position
    }
    setSwipeOffset(0); // Reset swipe offset state (animation handles visual reset)
  };

  // Mouse event handlers mirror touch handlers for desktop dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (transitioning) return;
    setMouseDown(true);
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
    dragStartX.current = e.clientX;
    lastDragX.current = e.clientX;
    velocityX.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);

    velocityX.current = e.clientX - lastDragX.current;
    lastDragX.current = e.clientX;

    const delta = e.clientX - dragStartX.current;
    const dampedDelta = delta * 0.8;
    setSwipeOffset(dampedDelta);
  };

  const handleMouseUp = () => {
    if (mouseDown) {
      handleTouchEnd(); // Trigger touch end logic on mouse up
      setMouseDown(false);
    }
  };

  // Animation function to move to the next/previous slide
  const animateToNextSlide = (direction: "next" | "prev") => {
    if (!data?.popularMovies) return;
    setTransitioning(true); // Start transition

    const totalMovies = data.popularMovies.length;
    // Calculate the new index, wrapping around
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % totalMovies
        : (currentIndex - 1 + totalMovies) % totalMovies;

    // Briefly skip transition for immediate index change, then re-enable for animation
    setSkipTransition(true);
    setSwipeOffset(0); // Reset visual swipe offset immediately
    setTimeout(() => {
      setSkipTransition(false);
      setCurrentIndex(newIndex); // Update index
      setTransitioning(false); // End transition
    }, 50); // Short delay
  };

  // Animation function to reset swipe offset smoothly
  const animateSwipeReset = () => {
    const startOffset = swipeOffset;
    const startTime = performance.now();
    const duration = 300; // Animation duration

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Animation progress (0 to 1)

      // Use an easing function (easeOutCubic) for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      // Update swipe offset based on easing
      setSwipeOffset(startOffset * (1 - easeOutCubic));

      // Continue animation until progress is complete
      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    // Cancel any existing animation frame before starting a new one
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate); // Start animation loop
  };

  // Cleanup animation frame on component unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Function to transform raw movie data (add genreNames and calculated rating)
  const transformMovies = (movies: Movie[]) => {
    return movies.map((movie) => ({
      ...movie,
      genreNames: movie.genres?.map((g) => g.genre.name) || [],
      // Calculate a dummy rating based on DiaryEntry count (example logic)
      rating: movie._count?.DiaryEntry
        ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2)) // Scale count to 1-10
        : undefined,
    }));
  };

  // Function to get the movies currently visible in the carousel
  const getVisibleMovies = () => {
    if (!data?.popularMovies || data.popularMovies.length === 0) return [];
    const transformed = transformMovies(data.popularMovies);
    const totalMovies = transformed.length;
    const visible = [];
    // Calculate offset to center the current index
    const offset = Math.floor(visibleItemsCount / 2);

    // Get movies around the current index, including one extra on each side for smooth wrapping
    for (let i = -1; i < visibleItemsCount + 1; i++) {
      const index = (currentIndex + i - offset + totalMovies) % totalMovies;
      visible.push(transformed[index]);
    }
    return visible;
  };

  // Navigation handlers
  const handleViewAllGenres = () => {
    navigate("/genres");
  };

  const handleDiscoverMore = () => {
    navigate("/discover");
  };

  // Navigate to movie detail page
  const navigateToMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  // Handle errors for image loading by showing a placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src =
      "https://placehold.co/800x1200?text=No+Poster"; // Placeholder image URL
  };

  // --- Loading, Error, and No Data States ---
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
          className="stroke-current shrink-0 h-8 w-8"
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

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No movies available</p>
      </div>
    );
  }

  // Get movies to display in the carousel
  const visibleMovies = getVisibleMovies();

  // Determine grid columns based on screen size for movie cards
  const movieCardGridClasses =
    "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4";

  // --- Render the Component ---
  return (
    <div className="container max-w-7xl mx-auto px-4 space-y-16">
      {/* Welcome Section with Popular Movies Carousel */}
      <section className="relative overflow-hidden py-8 sm:py-12 flex flex-col space-y-10 items-center">
        <div className="text-center">
          {/* Responsive H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
            Welcome to Talarama!
          </h1>
          {/* Responsive subtitle */}
          <span className="text-sm sm:text-base md:text-lg">
            Dive into this week's hottest movies.
          </span>
        </div>
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex justify-center items-end -mx-2 sm:-mx-4 select-none"
          style={{
            transform: `translateX(${swipeOffset}px)`,
            cursor: isDragging ? "grabbing" : "grab",
            // Apply transition only when not dragging or skipping
            transition:
              skipTransition || transitioning
                ? "none"
                : "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
          // Add touch and mouse event listeners for dragging
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // End drag if mouse leaves the element
        >
          {/* Map over visible movies to display carousel items */}
          {visibleMovies.map((movie, index) => {
            // Calculate position relative to the center item
            const position = index - (Math.floor(visibleItemsCount / 2) + 1);
            let scaleClass = "";
            let opacityClass = "";
            let zIndexClass = "";
            let widthClass = "";
            let marginClass = "";

            // Apply dynamic classes based on position and visible items count
            if (visibleItemsCount === 5) {
              if (position === 0) {
                scaleClass = "scale-100";
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
                widthClass = "w-3/12";
                marginClass = "";
              } else if (position === -1 || position === 1) {
                scaleClass = "scale-95";
                opacityClass = "opacity-80";
                zIndexClass = "z-10";
                widthClass = "w-2/12";
                marginClass = "";
              } else if (position === -2 || position === 2) {
                scaleClass = "scale-90";
                opacityClass = "opacity-60";
                zIndexClass = "z-10";
                widthClass = "w-2/12";
                marginClass = "";
              } else {
                scaleClass = "scale-80";
                opacityClass = "opacity-40";
                zIndexClass = "z-0";
                widthClass = "w-1/12";
                marginClass = "mx-0.5 sm:mx-1";
              }
            } else if (visibleItemsCount === 3) {
              if (position === 0) {
                scaleClass = "scale-110";
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
                widthClass = "w-7/12";
                marginClass = "mx-2";
              } else {
                scaleClass = "scale-95";
                opacityClass = "opacity-80";
                zIndexClass = "z-10";
                widthClass = "w-5/12";
                marginClass = "mx-1";
              }
            }

            return (
              // Carousel Item Container
              <div
                key={`${movie.id}-${index}`}
                className={`flex-shrink-0 ${scaleClass} ${opacityClass} ${zIndexClass} ${widthClass} ${marginClass} will-change-transform`}
                style={{
                  height: "20rem", // Fixed height for carousel items
                  transition: "all 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)", // Smooth transition for scaling and opacity
                }}
              >
                {/* Movie Card within Carousel */}
                <div className="card bg-base-100 shadow-xl h-full group relative rounded-box overflow-hidden">
                  <figure className="relative h-full rounded-box overflow-hidden">
                    {/* Movie Poster Image */}
                    <img
                      src={movie.posterUrl}
                      alt={`Poster for ${movie.title}`}
                      className="w-full h-full object-cover rounded-box transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => handleImageError(e)} // Handle image load errors
                    />
                    {/* Gradient Overlays for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent opacity-100 rounded-box" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  </figure>
                  {/* Movie Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
                    {/* Genre Names */}
                    {movie.genreNames && movie.genreNames.length > 0 && (
                      <div className="mb-1.5">
                        <span className="bg-neutral text-neutral-content px-2 py-0.5 text-xs font-medium rounded">
                          {movie.genreNames.slice(0, 2).join(" ")}
                        </span>
                      </div>
                    )}
                    {/* Movie Title (text-xs) */}
                    <div className=" rounded mx-auto inline-block">
                      {/* Set text size to text-xs for carousel title */}
                      <h2 className="text-xs font-medium leading-tight">
                        {movie.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Dots */}
        {data.popularMovies.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2.5">
            {data.popularMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setTransitioning(false), 50);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-350 ease-out hover:opacity-75 ${
                  currentIndex === index
                    ? "bg-primary scale-125" // Active dot style
                    : "bg-gray-300 scale-100" // Inactive dot style
                } ${transitioning ? "opacity-50" : "opacity-100"}`}
                aria-label={`Go to movie ${index + 1}`}
                disabled={transitioning} // Disable clicks during transition
              />
            ))}
          </div>
        )}
      </section>

      {/* New Movies By Genre Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          {/* Responsive H2 */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            New Movies By Genre
          </h2>
          <button className="btn btn-ghost" onClick={handleViewAllGenres}>
            VIEW ALL
          </button>
        </div>
        {/* Grid for Genre Movies */}
        <div className={`${movieCardGridClasses}`}>
          {genreMovies.map((item) => (
            <div
              key={`${item.genreName}-${item.movie.id}`}
              className="aspect-[2/3] rounded-box overflow-hidden relative cursor-pointer shadow-md hover:shadow-lg transition-all"
              onClick={() => navigateToMovie(item.movie.id)} // Navigate on click
            >
              <figure className="relative h-full rounded-box overflow-hidden">
                {/* Movie Poster */}
                <img
                  src={item.movie.posterUrl}
                  alt={`${item.movie.title} - ${item.genreName}`}
                  className="w-full h-full object-cover rounded-box transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => handleImageError(e)}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent " />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </figure>

              {/* Rating Badge */}
              {item.movie.rating !== undefined && (
                <div className="absolute top-2 right-2">
                  <div className="badge badge-primary">
                    {item.movie.rating.toFixed(1)}
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 hover:opacity-100 transition-opacity"></div>

              {/* Movie Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
                {/* Display Genre Name */}
                <div className="mb-1.5">
                  <span className="bg-neutral text-neutral-content px-2 py-0.5 text-xs font-medium rounded">
                    {item.genreName}
                  </span>
                </div>
                {/* Movie Title and Year (text-xs) */}
                <div className=" rounded mx-auto inline-block">
                  {/* Set text size to text-xs for genre movie title */}
                  <h3 className="text-xs font-medium leading-tight">
                    {item.movie.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* You Might Like Section (Random Movies) */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          {/* Responsive H2 */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            You Might Like
          </h2>
          <button className="btn btn-ghost" onClick={handleDiscoverMore}>
            DISCOVER MORE
          </button>
        </div>
        {/* Grid for Random Movies */}
        <div className={`${movieCardGridClasses}`}>
          {limitedRandomMovies.map((movie) => (
            <div
              key={movie.id}
              className="aspect-[2/3] rounded-box overflow-hidden relative cursor-pointer shadow-md hover:shadow-lg transition-all"
              onClick={() => navigateToMovie(movie.id)} // Navigate on click
            >
              {/* Movie Poster */}
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => handleImageError(e)}
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral via-transparent to-transparent " />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Rating Badge */}
              {movie.rating !== undefined && (
                <div className="absolute top-2 right-2">
                  <div className="badge badge-primary">
                    {movie.rating.toFixed(1)}
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 hover:opacity-100 transition-opacity"></div>

              {/* Movie Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
                {/* Genre Names */}
                {movie.genreNames && movie.genreNames.length > 0 && (
                  <div className="mb-1.5">
                    <span className="bg-neutral text-neutral-content px-2 py-0.5 text-xs font-medium rounded">
                      {movie.genreNames.slice(0, 2).join(" ")}
                    </span>
                  </div>
                )}
                {/* Movie Title and Year (text-xs) */}
                <div className=" rounded mx-auto inline-block">
                  {/* Set text size to text-xs for random movie title */}
                  <h3 className="text-xs font-medium leading-tight">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIARY Section */}
      <section className="bg-base-200 rounded-lg p-8 text-center">
        {/* Responsive H2 */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          DIARY
        </h2>
        {/* Responsive Paragraph */}
        <p className="mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Discover stories on DIARY, a self-publishing platform for all movie
          enthusiast.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/diaries")}
        >
          GO TO DIARY
        </button>
      </section>
    </div>
  );
};

export default MovieCarousel;
