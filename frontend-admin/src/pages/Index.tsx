import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
}

interface MovieCardProps {
  movie: Movie & {
    genreNames?: string[];
  };
}

interface ApiResponse {
  popularMovies: Movie[];
  randomMovies: Movie[];
  newestPerGenre: Movie[];
}

const MovieCarousel = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  // Removed unused transitionDirection state
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

  // Fetch all movie data from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          import.meta.env.VITE_GET_DASHBOARD
        );
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);

    return () => window.removeEventListener("resize", updateVisibleItemsCount);
  }, []);

  // Update visible items count based on screen size
  const updateVisibleItemsCount = () => {
    if (window.innerWidth < 768) {
      setVisibleItemsCount(3);
    } else {
      setVisibleItemsCount(5);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const popularMovies = data?.popularMovies;
    if (!popularMovies || popularMovies.length <= 1) return;

    const interval = setInterval(() => {
      if (mouseDown || swipeOffset !== 0) return; // Don't auto-slide while interacting
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % popularMovies.length);
        setTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [data?.popularMovies, currentIndex, mouseDown, swipeOffset]);

  // Enhanced touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (transitioning) return;
    setIsDragging(true);
    const touch = e.targetTouches[0];
    setTouchStart(touch.clientX);
    setTouchEnd(touch.clientX);
    dragStartX.current = touch.clientX;
    lastDragX.current = touch.clientX;
    velocityX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.targetTouches[0];
    setTouchEnd(touch.clientX);

    // Calculate velocity
    velocityX.current = touch.clientX - lastDragX.current;
    lastDragX.current = touch.clientX;

    // Update swipe offset with smooth damping
    const delta = touch.clientX - dragStartX.current;
    const dampedDelta = delta * 0.8; // Add resistance to the swipe
    setSwipeOffset(dampedDelta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeDistance = touchEnd - touchStart;
    const swipeVelocity = velocityX.current;
    const threshold = 50;
    const velocityThreshold = 1;

    if (
      Math.abs(swipeDistance) > threshold ||
      Math.abs(swipeVelocity) > velocityThreshold
    ) {
      if (swipeDistance < 0 || swipeVelocity < -velocityThreshold) {
        // Direct transition to next without resetting first
        // Removed setting transitionDirection as it's unused
        animateToNextSlide("next");
      } else if (swipeDistance > 0 || swipeVelocity > velocityThreshold) {
        // Direct transition to prev without resetting first
        // Removed setting transitionDirection as it's unused
        animateToNextSlide("prev");
      }
    } else {
      // Only reset if we're not transitioning to a new slide
      animateSwipeReset();
    }
  };

  // Enhanced mouse event handlers
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

    // Calculate velocity
    velocityX.current = e.clientX - lastDragX.current;
    lastDragX.current = e.clientX;

    // Update swipe offset with smooth damping
    const delta = e.clientX - dragStartX.current;
    const dampedDelta = delta * 0.8; // Add resistance to the swipe
    setSwipeOffset(dampedDelta);
  };

  const handleMouseUp = () => {
    if (mouseDown) {
      handleTouchEnd();
      setMouseDown(false);
    }
  };

  // Smooth animation for transitioning directly to next/prev slide
  const animateToNextSlide = (direction: "next" | "prev") => {
    if (!data?.popularMovies) return;
    setTransitioning(true);

    const totalMovies = data.popularMovies.length;
    const startOffset = swipeOffset;
    const startTime = performance.now();
    const duration = 350; // Slightly adjusted for a balanced feel

    const cardWidth =
      carouselRef.current?.querySelector('div[style*="height: 24rem"]')
        ?.clientWidth || 200;
    const slideDistance = cardWidth * 1.5;

    const targetOffset = direction === "next" ? -slideDistance : slideDistance;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Changed let to const

      // Refined ease-out cubic for a natural deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentOffset =
        startOffset + (targetOffset - startOffset) * easeOutCubic;
      setSwipeOffset(currentOffset);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setSkipTransition(true);
        setTimeout(() => {
          if (direction === "next") {
            setCurrentIndex((prev) => (prev + 1) % totalMovies);
          } else {
            setCurrentIndex((prev) =>
              prev === 0 ? totalMovies - 1 : prev - 1
            );
          }
          setSwipeOffset(0);
          setTimeout(() => {
            setSkipTransition(false);
            setTransitioning(false);
          }, 30); // Short delay to ensure styles apply
        }, 0);
      }
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Smooth animation for resetting swipe offset
  const animateSwipeReset = () => {
    const startOffset = swipeOffset;
    const startTime = performance.now();
    const duration = 300;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Changed let to const

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setSwipeOffset(startOffset * (1 - easeOutCubic));

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Enhanced navigation functions using the animation system

  // Helper functions
  const transformMovies = (movies: Movie[]) => {
    return movies.map((movie) => ({
      ...movie,
      genreNames: movie.genres?.map((g) => g.genre.name) || [],
      rating: movie._count?.DiaryEntry
        ? Math.min(10, Math.max(1, movie._count.DiaryEntry / 2))
        : undefined,
    }));
  };

  const getVisibleMovies = () => {
    if (!data?.popularMovies || data.popularMovies.length === 0) return [];
    const transformed = transformMovies(data.popularMovies);
    const totalMovies = transformed.length;
    const visible = [];
    const offset = Math.floor(visibleItemsCount / 2);

    // Focus on showing just enough movies for a smooth transition
    for (let i = -1; i < visibleItemsCount + 1; i++) {
      const index = (currentIndex + i - offset + totalMovies) % totalMovies;
      visible.push(transformed[index]);
    }
    return visible;
  };

  // Render states
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

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No movies available</p>
      </div>
    );
  }

  const visibleMovies = getVisibleMovies();
  const randomMovies = transformMovies(data.randomMovies);
  const newestPerGenre = transformMovies(data.newestPerGenre);

  return (
    <div className="container max-w-7xl mx-auto px-4 space-y-12">
      {/* Header Carousel - Popular Movies */}
      <section className="relative overflow-hidden py-4 sm:py-8 flex flex-col space-y-8 sm:space-y-12 items-center">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl text-center font-bold">
            Welcome to SineMemoria!
          </h1>
          <span>Dive into this week's hottest movies.</span>
        </div>
        <div
          ref={carouselRef}
          className="flex justify-center items-end -mx-2 sm:-mx-4 select-none"
          style={{
            transform: `translateX(${swipeOffset}px)`,
            cursor: isDragging ? "grabbing" : "grab",
            transition:
              skipTransition || transitioning
                ? "none"
                : "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {visibleMovies.map((movie, index) => {
            const position = index - (Math.floor(visibleItemsCount / 2) + 1);
            let scaleClass = "";
            let opacityClass = "";
            let zIndexClass = "";
            let widthClass = "";
            let marginClass = "";

            // Adjusted scaling for a more perceptible difference
            if (visibleItemsCount === 5) {
              if (position === 0) {
                scaleClass = "scale-110"; // Center card
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
                widthClass = "w-4/12";
                marginClass = "mx-2 sm:mx-4";
              } else if (position === -1 || position === 1) {
                scaleClass = "scale-100"; // Immediate neighbors
                opacityClass = "opacity-85";
                zIndexClass = "z-10";
                widthClass = "w-3/12";
                marginClass = "mx-1 sm:mx-2";
              } else {
                scaleClass = "scale-90"; // Outer cards
                opacityClass = "opacity-70";
                zIndexClass = "z-0";
                widthClass = "w-2/12";
                marginClass = "mx-0.5 sm:mx-1";
              }
            } else if (visibleItemsCount === 3) {
              if (position === 0) {
                scaleClass = "scale-110"; // Center card
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
                widthClass = "w-7/12";
                marginClass = "mx-2";
              } else {
                scaleClass = "scale-95"; // Side cards slightly smaller for 3-item view
                opacityClass = "opacity-80";
                zIndexClass = "z-10";
                widthClass = "w-5/12";
                marginClass = "mx-1";
              }
            }

            return (
              <div
                key={`${movie.id}-${index}`}
                className={`flex-shrink-0 px-1 sm:px-2 ${scaleClass} ${opacityClass} ${zIndexClass} ${widthClass} ${marginClass} will-change-transform`}
                style={{
                  height: "24rem",
                  transition: "all 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <div className="card bg-base-100 shadow-xl h-full group relative rounded-box overflow-hidden">
                  <figure className="relative h-full rounded-box overflow-hidden">
                    <img
                      src={movie.posterUrl}
                      alt={`Poster for ${movie.title}`}
                      className="w-full h-full object-cover rounded-box transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/800x400?text=No+Poster";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 via-transparent to-transparent opacity-100 rounded-box" />
                  </figure>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
                    {movie.genreNames && movie.genreNames.length > 0 && (
                      <div className="mb-1.5">
                        <span className="bg-neutral text-neutral-content px-2 py-0.5 text-xs font-medium rounded">
                          {movie.genreNames.slice(0, 2).join(" ")}
                        </span>
                      </div>
                    )}
                    <div className="px-3 py-1 rounded mx-auto inline-block">
                      <h2 className="text-sm font-medium leading-tight">
                        {movie.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots - Transitions refined */}
        {data.popularMovies.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2.5">
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
                    ? "bg-primary scale-125"
                    : "bg-gray-300 scale-100"
                } ${transitioning ? "opacity-50" : "opacity-100"}`}
                aria-label={`Go to movie ${index + 1}`}
                disabled={transitioning}
              />
            ))}
          </div>
        )}
      </section>

      {/* Originals by Genre Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">New Movies By Genre</h2>
          <button className="btn btn-ghost">ALL</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {newestPerGenre.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Random Recommendations Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">You Might Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {randomMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary">Discover More</button>
        </div>
      </section>

      {/* Canvas Section */}
      <section className="bg-base-200 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">CANVAS</h2>
        <p className="mb-4">
          Discover stories on CANVAS, a self-publishing platform for indie
          creators
        </p>
        <button className="btn btn-primary">Go to CANVAS</button>
      </section>
    </div>
  );
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div
      className="card bg-base-100 shadow-lg h-full group relative rounded-box overflow-hidden will-change-transform"
      style={{
        transition: "all 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <div className="w-full h-full transform transition-transform duration-450 ease-out group-hover:scale-[1.03]">
        <figure className="relative h-64 rounded-box overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            className="w-full h-full object-cover rounded-box transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/800x400?text=No+Poster";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 via-transparent to-transparent opacity-100 rounded-box" />
        </figure>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center">
          {movie.genreNames && movie.genreNames.length > 0 && (
            <div className="mb-1.5 transition-opacity duration-300 ease-out opacity-90 group-hover:opacity-100">
              <span className="bg-neutral text-neutral-content px-2 py-0.5 text-xs font-medium rounded">
                {movie.genreNames.slice(0, 2).join(" ")}
              </span>
            </div>
          )}
          <div className="px-3 py-1 rounded mx-auto inline-block transform transition-all duration-300 ease-out group-hover:translate-y-[-2px]">
            <h3 className="text-sm font-medium leading-tight">{movie.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
