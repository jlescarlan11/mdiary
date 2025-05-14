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
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    setSwipeOffset(e.targetTouches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const threshold = 50;
    const popularMovies = data?.popularMovies;

    if (touchStart - touchEnd > threshold && popularMovies) {
      goToNext();
    }

    if (touchEnd - touchStart > threshold && popularMovies) {
      goToPrev();
    }

    setSwipeOffset(0);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return;
    setTouchEnd(e.clientX);
    setSwipeOffset(e.clientX - touchStart);
  };

  const handleMouseUp = () => {
    if (mouseDown) {
      handleTouchEnd();
      setMouseDown(false);
    }
  };

  // Navigation functions
  const goToNext = () => {
    if (!data?.popularMovies) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.popularMovies.length);
      setTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    if (!data?.popularMovies) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? data.popularMovies.length - 1 : prev - 1
      );
      setTransitioning(false);
    }, 300);
  };

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

    for (let i = 0; i < visibleItemsCount; i++) {
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
          className={`flex justify-center items-end -mx-2 sm:-mx-4 ${
            transitioning ? "opacity-50" : "opacity-100"
          } transition-opacity duration-1000 ease-in-out`}
          style={{ transform: `translateX(${swipeOffset}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {visibleMovies.map((movie, index) => {
            const position = index - Math.floor(visibleItemsCount / 2);
            let scaleClass = "";
            let opacityClass = "";
            let zIndexClass = "";
            let widthClass = "";
            let marginClass = "";

            if (visibleItemsCount === 5) {
              if (position === 0) {
                scaleClass = "scale-110";
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
                widthClass = "w-4/12";
                marginClass = "mx-2 sm:mx-4";
              } else if (position === -1 || position === 1) {
                scaleClass = "scale-100";
                opacityClass = "opacity-90";
                zIndexClass = "z-10";
                widthClass = "w-3/12";
                marginClass = "mx-1 sm:mx-2";
              } else {
                scaleClass = "scale-90";
                opacityClass = "opacity-70";
                zIndexClass = "z-0";
                widthClass = "w-2/12";
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
                scaleClass = "scale-90";
                opacityClass = "opacity-80";
                zIndexClass = "z-10";
                widthClass = "w-5/12";
                marginClass = "mx-1";
              }
            }

            return (
              <div
                key={`${movie.id}-${index}`}
                className={`flex-shrink-0 px-1 sm:px-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${scaleClass} ${opacityClass} ${zIndexClass} ${widthClass} ${marginClass}`}
                style={{ height: "24rem" }}
              >
                <div className="card bg-base-100 shadow-xl h-full group relative rounded-box">
                  <figure className="relative h-full rounded-box">
                    <img
                      src={movie.posterUrl}
                      alt={`Poster for ${movie.title}`}
                      className="w-full h-full object-cover rounded-box transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/800x400?text=No+Poster";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-box" />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-box"></div>
                  </figure>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      <h2 className="card-title text-lg sm:text-xl font-bold line-clamp-1">
                        {movie.title}
                      </h2>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm sm:text-base">{movie.year}</p>
                        {movie.rating !== undefined && (
                          <div className="badge badge-primary">
                            {movie.rating.toFixed(1)}
                          </div>
                        )}
                      </div>
                      {movie.genreNames && movie.genreNames.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {movie.genreNames.map((g) => (
                            <span
                              key={g}
                              className="badge badge-outline badge-sm"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {data.popularMovies.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {data.popularMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setTransitioning(false);
                  }, 300);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  currentIndex === index ? "bg-primary w-6" : "bg-gray-300"
                } ${transitioning ? "opacity-70" : "opacity-100"}`}
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
    <div className="card bg-base-100 shadow-xl h-full group relative rounded-box">
      <figure className="relative h-64 rounded-box">
        <img
          src={movie.posterUrl}
          alt={`Poster for ${movie.title}`}
          className="w-full h-full object-cover rounded-box"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/800x400?text=No+Poster";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 rounded-box" />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-box"></div>
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-sm line-clamp-1">{movie.title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-xs">{movie.year}</p>
          {movie.rating !== undefined && (
            <div className="badge badge-primary badge-sm">
              {movie.rating.toFixed(1)}
            </div>
          )}
        </div>
        {movie.genreNames && movie.genreNames.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genreNames.map((g) => (
              <span key={g} className="badge badge-outline badge-sm">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;
