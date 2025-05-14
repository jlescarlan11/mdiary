import { useState, useEffect, useRef } from "react";
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

interface GenreMovie {
  genreName: string;
  movie: Movie;
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
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const lastDragX = useRef(0);
  const velocityX = useRef(0);
  const animationFrameId = useRef<number | undefined>(undefined);
  const [skipTransition, setSkipTransition] = useState(false);
  const [genreMovies, setGenreMovies] = useState<GenreMovie[]>([]);
  const [limitedRandomMovies, setLimitedRandomMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

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
    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);

    return () => window.removeEventListener("resize", updateVisibleItemsCount);
  }, []);

  useEffect(() => {
    if (data?.newestPerGenre) {
      const usedMovieIds = new Set<string>();
      const genreToMoviesMap = new Map<string, Movie[]>();

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

      const sortedGenres = Array.from(genreToMoviesMap.keys()).sort(
        (a, b) =>
          (genreToMoviesMap.get(b)?.length || 0) -
          (genreToMoviesMap.get(a)?.length || 0)
      );

      const topGenres = sortedGenres.slice(0, 10);

      const genreMoviesArray: GenreMovie[] = [];

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
        .slice(0, 10);

      setLimitedRandomMovies(pseudoRandomMovies);
    }
  }, [data]);

  const updateVisibleItemsCount = () => {
    if (window.innerWidth < 768) {
      setVisibleItemsCount(3);
    } else {
      setVisibleItemsCount(5);
    }
  };

  useEffect(() => {
    const popularMovies = data?.popularMovies;
    if (!popularMovies || popularMovies.length <= 1) return;

    const interval = setInterval(() => {
      if (mouseDown || swipeOffset !== 0) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % popularMovies.length);
        setTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [data?.popularMovies, currentIndex, mouseDown, swipeOffset]);

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

    velocityX.current = touch.clientX - lastDragX.current;
    lastDragX.current = touch.clientX;

    const delta = touch.clientX - dragStartX.current;
    const dampedDelta = delta * 0.8;
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
        animateToNextSlide("next");
      } else if (swipeDistance > 0 || swipeVelocity > velocityThreshold) {
        animateToNextSlide("prev");
      }
    } else {
      animateSwipeReset();
    }
  };

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
      handleTouchEnd();
      setMouseDown(false);
    }
  };

  const animateToNextSlide = (direction: "next" | "prev") => {
    if (!data?.popularMovies) return;
    setTransitioning(true);

    const totalMovies = data.popularMovies.length;
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % totalMovies
        : (currentIndex - 1 + totalMovies) % totalMovies;

    setSkipTransition(true);
    setSwipeOffset(0);
    setTimeout(() => {
      setSkipTransition(false);
      setCurrentIndex(newIndex);
      setTransitioning(false);
    }, 50);
  };

  const animateSwipeReset = () => {
    const startOffset = swipeOffset;
    const startTime = performance.now();
    const duration = 300;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

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

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

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

    for (let i = -1; i < visibleItemsCount + 1; i++) {
      const index = (currentIndex + i - offset + totalMovies) % totalMovies;
      visible.push(transformed[index]);
    }
    return visible;
  };

  const handleViewAllGenres = () => {
    navigate("/genres");
  };

  const handleDiscoverMore = () => {
    navigate("/discover");
  };

  // Navigate to specific genre
  const navigateToGenre = (genre: string) => {
    navigate(`/genres/${encodeURIComponent(genre)}`);
  };

  // Navigate to movie detail
  const navigateToMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
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

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No movies available</p>
      </div>
    );
  }

  const visibleMovies = getVisibleMovies();

  return (
    <div className="container max-w-7xl mx-auto px-4 space-y-16">
      <section className="relative overflow-hidden py-8 sm:py-12 flex flex-col space-y-10 items-center">
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

            if (visibleItemsCount === 5) {
              if (position === 0) {
                scaleClass = "scale-110";
                opacityClass = "opacity-100";
                zIndexClass = "z-20";
                widthClass = "w-4/12";
                marginClass = "mx-2 sm:mx-4";
              } else if (position === -1 || position === 1) {
                scaleClass = "scale-100";
                opacityClass = "opacity-85";
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
                scaleClass = "scale-95";
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

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">New Movies By Genre</h2>
          <button className="btn btn-ghost" onClick={handleViewAllGenres}>
            VIEW ALL
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {genreMovies.map((item) => (
            <div
              key={`${item.genreName}-${item.movie.id}`}
              className="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-neutral-800/90 to-transparent p-3 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToGenre(item.genreName);
                }}
              >
                <h3 className="text-md font-semibold text-white hover:underline">
                  {item.genreName}
                </h3>
              </div>

              <div
                className="h-80 overflow-hidden"
                onClick={() => navigateToMovie(item.movie.id)}
              >
                <img
                  src={item.movie.posterUrl}
                  alt={`${item.movie.title} - ${item.genreName}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/800x400?text=No+Poster";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 via-transparent to-transparent opacity-100" />
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-neutral-content text-center"
                onClick={() => navigateToMovie(item.movie.id)}
              >
                <div className="px-3 py-1 rounded mx-auto inline-block">
                  <h3 className="text-sm font-medium leading-tight">
                    {item.movie.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">You Might Like</h2>
          <button className="btn btn-ghost" onClick={handleDiscoverMore}>
            DISCOVER MORE
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {limitedRandomMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => navigateToMovie(movie.id)}
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
                      {movie.genreNames.slice(0, 2).join(" ")}
                    </span>
                  </div>
                )}
                <div className="px-3 py-1 rounded mx-auto inline-block">
                  <h3 className="text-sm font-medium leading-tight">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">DIARY</h2>
        <p className="mb-6 max-w-2xl mx-auto">
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
