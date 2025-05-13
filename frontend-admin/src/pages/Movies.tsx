import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
// Corrected: Import EditableMovieData as a default import
import MovieForm, { type EditableMovieData } from "./MovieForm";
import { toast } from "react-hot-toast";
import {
  LuPencil,
  LuTrash,
  LuArrowUp,
  LuArrowDown,
  LuRefreshCw,
} from "react-icons/lu";
import Swal from "sweetalert2";

// --- Component Interfaces ---
interface Director {
  id?: string;
  firstName: string;
  lastName: string;
}

interface Genre {
  id?: string;
  name: string;
}

interface Movie {
  id: string;
  title: string;
  year: number;
  duration: number;
  description: string;
  posterUrl: string;
  createdAt: string;
  updatedAt: string;
  directors: Director[];
  genres: Genre[];
  entriesCount: number;
  averageRating: number;
}

// Define props interface for MovieFormModal
interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  movieToEdit: EditableMovieData | null;
  availableGenres: Genre[];
  availableDirectors: Director[];
  onAddMovie: (movieData: EditableMovieData) => Promise<void>;
  onUpdateMovie: (movieData: EditableMovieData) => Promise<void>;
}

// --- Helper Components (defined within this file for single immersive) ---

// Component for displaying total movies count
const TotalMoviesCard: React.FC<{ count: number; loading: boolean }> = ({
  count,
  loading,
}) => (
  <div className="card bg-base-100 p-4 shadow rounded-lg border border-base-300">
    <h2 className="text-xl font-semibold text-base-content">Total Movies</h2>
    <p className="text-3xl mt-2 text-primary">{loading ? "..." : count}</p>
  </div>
);

// GenresChart component with DaisyUI primary color
const GenresChart: React.FC<{ data: { name: string; count: number }[] }> = ({
  data,
}) => (
  <div className="card bg-base-100 p-4 shadow rounded-lg border border-base-300">
    <h2 className="text-xl font-semibold text-base-content">
      Top Genres (Current Page)
    </h2>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-base-content" />
        <XAxis
          dataKey="name"
          className="fill-base-content"
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 12 }}
        />
        <YAxis className="fill-base-content" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--b1) / 0.8)",
            borderColor: "hsl(var(--b3))",
            borderRadius: "var(--rounded-btn, 0.5rem)",
            color: "hsl(var(--bc))",
            backdropFilter: "blur(2px)",
          }}
          labelClassName="font-semibold text-base-content"
        />
        <Line
          type="monotone"
          dataKey="count"
          className="stroke-primary fill-primary stroke-2"
          dot={{
            className: "fill-primary stroke-2 stroke-primary",
            r: 5,
          }}
          activeDot={{
            r: 8,
            className: "fill-base-content stroke-base stroke-2",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// DirectorsChart component with DaisyUI secondary color
const DirectorsChart: React.FC<{ data: { name: string; count: number }[] }> = ({
  data,
}) => (
  <div className="card bg-base-100 p-4 shadow rounded-lg border border-base-300">
    <h2 className="text-xl font-semibold text-base-content">
      Top Directors (Current Page)
    </h2>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-base-content" />
        <XAxis
          dataKey="name"
          className="fill-base-content"
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 12 }}
        />
        <YAxis className="fill-base-content" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--b1) / 0.8)",
            borderColor: "hsl(var(--b3))",
            borderRadius: "var(--rounded-btn, 0.5rem)",
            color: "hsl(var(--bc))",
            backdropFilter: "blur(2px)",
          }}
          labelClassName="font-semibold text-base-content"
        />
        <Line
          type="monotone"
          dataKey="count"
          className="stroke-primary fill-primary stroke-2"
          dot={{
            className: "fill-primary stroke-2 stroke-primary",
            r: 5,
          }}
          activeDot={{
            r: 8,
            className: "fill-base-content stroke-base stroke-2",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Component for the Movie List Table (now uses modal for editing)
const MovieListTable: React.FC<{
  movies: Movie[];
  loading: boolean;
  sortColumn: keyof Movie | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (column: keyof Movie) => void;
  onDelete: (movieId: string) => void;
  onEditClick: (movie: Movie) => void;
}> = ({
  movies,
  loading,
  sortColumn,
  sortDirection,
  onSort,
  onDelete,
  onEditClick,
}) => {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md border border-base-300">
      <h2 className="text-2xl font-semibold mb-4 text-base-content">
        Movie List
      </h2>
      {loading && (
        <div className="flex justify-center items-center mb-4 text-base-content">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="ml-2">Loading movies...</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="sticky top-0 bg-base-300 text-base-content shadow-sm">
            <tr>
              <th
                className="cursor-pointer py-3 px-4 text-left"
                onClick={() => onSort("title")}
              >
                Title
                {sortColumn === "title" &&
                  (sortDirection === "asc" ? (
                    <LuArrowUp className="inline ml-1" />
                  ) : (
                    <LuArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th
                className="cursor-pointer py-3 px-4 text-left"
                onClick={() => onSort("year")}
              >
                Year
                {sortColumn === "year" &&
                  (sortDirection === "asc" ? (
                    <LuArrowUp className="inline ml-1" />
                  ) : (
                    <LuArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th
                className="cursor-pointer py-3 px-4 text-left"
                onClick={() => onSort("duration")}
              >
                Duration (min)
                {sortColumn === "duration" &&
                  (sortDirection === "asc" ? (
                    <LuArrowUp className="inline ml-1" />
                  ) : (
                    <LuArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th
                className="cursor-pointer py-3 px-4 text-left"
                onClick={() => onSort("averageRating")}
              >
                Rating
                {sortColumn === "averageRating" &&
                  (sortDirection === "asc" ? (
                    <LuArrowUp className="inline ml-1" />
                  ) : (
                    <LuArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th className="py-3 px-4 text-left">Genres</th>
              <th className="py-3 px-4 text-left">Directors</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-base-200 border-b border-base-300"
              >
                <td className="py-3 px-4 text-base-content">{m.title}</td>
                <td className="py-3 px-4 text-base-content">{m.year}</td>
                <td className="py-3 px-4 text-base-content">{m.duration}</td>
                <td className="py-3 px-4 text-base-content">
                  {m.averageRating.toFixed(1)}
                </td>
                <td className="py-3 px-4 text-base-content">
                  {m.genres.map((g) => g.name).join(", ")}
                </td>
                <td className="py-3 px-4 text-base-content">
                  {m.directors
                    .map((d) => `${d.firstName} ${d.lastName}`)
                    .join(", ")}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-ghost btn-sm text-primary"
                      aria-label={`Edit ${m.title}`}
                      title={`Edit ${m.title}`}
                      onClick={() => onEditClick(m)}
                    >
                      <LuPencil className="h-4 w-4" />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      aria-label={`Delete ${m.title}`}
                      title={`Delete ${m.title}`}
                      onClick={() => onDelete(m.id)}
                    >
                      <LuTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Component for the Movie Form Modal (handles both Create and Edit)
const MovieFormModal: React.FC<MovieFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  movieToEdit,
  availableGenres,
  availableDirectors,
  onAddMovie,
  onUpdateMovie,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const firstFocusableElement = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement | null;
      firstFocusableElement?.focus();

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const onSubmitFromForm = async (movieData: EditableMovieData) => {
    try {
      if (movieToEdit && movieData.id) {
        await onUpdateMovie(movieData);
      } else {
        await onAddMovie(movieData);
      }
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <form
        method="dialog"
        className="modal-backdrop fixed inset-0 z-0"
        onClick={onClose}
        aria-label="Close modal"
      >
        <button></button>
      </form>
      <div className="modal-box bg-base-100 text-base-content w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg" id="modal-title">
          {movieToEdit ? "Edit Movie" : "Add New Movie"}
        </h3>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="py-4">
          <MovieForm
            movieToEdit={movieToEdit}
            onSuccess={onSubmitFromForm}
            onCancel={onClose}
            availableGenres={availableGenres}
            availableDirectors={availableDirectors}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main AdminMovieDashboard Component ---
export default function AdminMovieDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<EditableMovieData | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Movie | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    "desc"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);

  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [availableDirectors, setAvailableDirectors] = useState<Director[]>([]);

  const [topGenresDisplayed, setTopGenresDisplayed] = useState<
    { name: string; count: number }[]
  >([]);
  const [topDirectorsDisplayed, setTopDirectorsDisplayed] = useState<
    { name: string; count: number }[]
  >([]);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMovies = useCallback(
    async (forceApiFetch = false) => {
      setLoading(true);
      setError(null);

      const localStorageKey = `cachedMovies_${searchTerm}_${currentPage}_${itemsPerPage}_${sortColumn}_${sortDirection}`;

      if (!forceApiFetch) {
        const cachedData = localStorage.getItem(localStorageKey);
        if (cachedData) {
          try {
            const { movies: cachedMovies, totalMovies: cachedTotalMovies } =
              JSON.parse(cachedData);
            setMovies(cachedMovies);
            setTotalMoviesCount(cachedTotalMovies);
            computeAnalytics(cachedMovies);
            setLoading(false);
            console.log("Loaded movies from local storage.");
            return;
          } catch (e) {
            console.error("Error parsing cached data:", e);
          }
        }
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          return;
        }
        const apiUrl = `${import.meta.env
          .VITE_GET_MOVIES_URL!}?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}${
          sortColumn
            ? `&sortColumn=${sortColumn}&sortDirection=${sortDirection}`
            : ""
        }`;

        const res = await axios.get<{ movies: Movie[]; totalMovies: number }>(
          apiUrl,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { movies, totalMovies } = res.data;
        setMovies(movies);
        setTotalMoviesCount(totalMovies);
        computeAnalytics(movies);

        try {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ movies, totalMovies })
          );
          console.log("Cached movies in local storage.");
        } catch (e) {
          console.error("Error saving to local storage:", e);
        }
      } catch (err) {
        console.error("Error loading movies", err);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.error ||
              "Failed to load movies. Please try again."
          );
          toast.error(err.response?.data?.error || "Failed to load movies.");
        } else {
          setError("Failed to load movies. Please try again.");
          toast.error("Failed to load movies.");
        }
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, currentPage, itemsPerPage, sortColumn, sortDirection]
  );

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const [genreRes, directorRes] = await Promise.all([
          axios.get<Genre[]>(import.meta.env.VITE_GET_GENRES_URL!, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Director[]>(import.meta.env.VITE_GET_DIRECTORS_URL!, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setAvailableGenres(Array.isArray(genreRes.data) ? genreRes.data : []);
        setAvailableDirectors(
          Array.isArray(directorRes.data) ? directorRes.data : []
        );
      } catch (err) {
        console.error("Error fetching genres/directors:", err);
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.error ||
              "Failed to load genres and directors for form."
          );
        } else {
          toast.error("Failed to load genres and directors for form.");
        }
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [fetchMovies, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const computeAnalytics = (data: Movie[]) => {
    const genreCount: Record<string, number> = {};
    data.forEach((m) => {
      m.genres.forEach((g: Genre) => {
        // Explicitly type 'g'
        const name = g.name;
        genreCount[name] = (genreCount[name] || 0) + 1;
      });
    });
    const genresArray = Object.entries(genreCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTopGenresDisplayed(genresArray);

    const directorCount: Record<string, number> = {};
    data.forEach((m) => {
      m.directors.forEach((d: Director) => {
        // Explicitly type 'd'
        const name = `${d.firstName} ${d.lastName}`;
        directorCount[name] = (directorCount[name] || 0) + 1;
      });
    });
    const directorsArray = Object.entries(directorCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTopDirectorsDisplayed(directorsArray);
  };

  const handleSort = (column: keyof Movie) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleUpdateMovie = async (movieData: EditableMovieData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        toast.error("Authentication token not found. Please log in.");
        throw new Error("Authentication token not found.");
      }
      await axios.patch(
        `${import.meta.env.VITE_UPDATE_MOVIE_URL!}/${movieData.id}`,
        {
          ...movieData,
          genres: movieData.genres.map((g) => g.name),
          directors: movieData.directors.map((d) => ({
            firstName: d.firstName,
            lastName: d.lastName,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchMovies(true);
      toast.success("Movie updated successfully!");
    } catch (err) {
      console.error("Error updating movie:", err);
      let errorMessage = "Failed to update movie.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || errorMessage;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movieData: EditableMovieData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        toast.error("Authentication token not found. Please log in.");
        throw new Error("Authentication token not found.");
      }
      await axios.post(
        import.meta.env.VITE_CREATE_MOVIE_URL!,
        {
          ...movieData,
          genres: movieData.genres.map((g) => g.name),
          directors: movieData.directors.map((d) => ({
            firstName: d.firstName,
            lastName: d.lastName,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchMovies(true);
      toast.success("Movie added successfully!");
    } catch (err) {
      console.error("Error adding movie:", err);
      let errorMessage = "Failed to add movie.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || errorMessage;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          return;
        }
        await axios.delete(
          `${import.meta.env.VITE_DELETE_MOVIE_URL!}/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Movie deleted successfully!");
        fetchMovies(true);
      } catch (err) {
        console.error("Error deleting movie", err);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.error ||
              "Failed to delete movie. Please try again."
          );
          toast.error(err.response?.data?.error || "Failed to delete movie.");
        } else {
          setError("Failed to delete movie. Please try again.");
          toast.error("Failed to delete movie.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    setEditingMovie(null);
  };

  const handleFormCancel = () => {
    setIsFormModalOpen(false);
    setEditingMovie(null);
  };

  const handleRefreshClick = () => {
    fetchMovies(true);
    toast.success("Refreshing movies...");
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 bg-base-100 min-h-screen rounded-lg relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-primary pb-3 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-4xl font-bold text-base-content">
          Admin Movie Dashboard
        </h1>
        <div className="flex space-x-4">
          <button
            className="btn btn-outline btn-primary shadow-md"
            onClick={handleRefreshClick}
            aria-label="Refresh Movie List"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <LuRefreshCw className="h-5 w-5" />
            )}
            <span className="ml-2 hidden md:inline">Refresh</span>
          </button>
          <button
            className="btn btn-primary shadow-md"
            onClick={() => {
              setEditingMovie(null);
              setIsFormModalOpen(true);
            }}
            aria-label="Add New Movie"
            disabled={isFormModalOpen}
          >
            Add New Movie
          </button>
        </div>
      </div>

      <MovieFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormCancel}
        onSuccess={handleFormSuccess}
        movieToEdit={editingMovie}
        availableGenres={availableGenres}
        availableDirectors={availableDirectors}
        onAddMovie={handleAddMovie}
        onUpdateMovie={handleUpdateMovie}
      />

      {error && (
        <div
          role="alert"
          className="alert alert-error mb-4 text-error-content"
          aria-live="assertive"
        >
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
          <button
            className="btn btn-sm btn-error ml-4 shadow-md"
            onClick={() => fetchMovies(true)}
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TotalMoviesCard count={totalMoviesCount} loading={loading} />
        <GenresChart data={topGenresDisplayed} />
        <DirectorsChart data={topDirectorsDisplayed} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
        <div className="form-control w-full md:w-auto">
          <input
            type="text"
            placeholder="Search movies, genres, or directors..."
            className="input input-bordered input-primary w-full shadow-sm text-base-content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search movies"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-base-content text-sm md:text-base">
              Items per page:
            </span>
            <select
              className="select select-bordered select-primary select-sm md:select-md shadow-sm text-base-content"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              aria-label="Items per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="join shadow-sm">
            <button
              className="join-item btn btn-outline btn-primary btn-sm md:btn-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              «
            </button>
            <button className="join-item btn btn-outline border-primary text-primary pointer-events-none btn-sm md:btn-md">
              Page {currentPage} of {Math.ceil(totalMoviesCount / itemsPerPage)}
            </button>
            <button
              className="join-item btn btn-outline btn-primary btn-sm md:btn-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(totalMoviesCount / itemsPerPage) ||
                totalMoviesCount === 0
              }
              aria-label="Next page"
            >
              »
            </button>
          </div>
        </div>
      </div>

      <MovieListTable
        movies={movies}
        loading={loading}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onDelete={handleDeleteMovie}
        onEditClick={(movie) => {
          const movieFormData: EditableMovieData = {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            duration: movie.duration,
            description: movie.description,
            posterUrl: movie.posterUrl,
            genres: movie.genres,
            directors: movie.directors,
          };
          setEditingMovie(movieFormData);
          setIsFormModalOpen(true);
        }}
      />
    </div>
  );
}
