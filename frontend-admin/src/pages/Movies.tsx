import { useEffect, useState, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import MovieForm from "./MovieForm"; // Use MovieForm for modal usage
import { toast } from "react-hot-toast"; // Import toast and Toaster
import {
  LuPencil,
  LuTrash,
  LuArrowUp,
  LuArrowDown,
  LuRefreshCw,
} from "react-icons/lu"; // Import icons for actions, sorting, and refresh
import Swal from "sweetalert2"; // Import SweetAlert2 for confirmation dialogs

// --- Component Interfaces ---
// Simplified Director and Genre interfaces to match the data returned by the updated query.movie.getMovies
interface Director {
  id?: string; // id is optional as it might not exist for new directors
  firstName: string;
  lastName: string;
}

interface Genre {
  id?: string; // id is optional as it might not exist for new genres
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
  directors: Director[]; // Simplified structure
  genres: Genre[]; // Simplified structure
  entriesCount: number; // From _count.DiaryEntry
  averageRating: number;
}

// Define the structure for movie data when adding/editing
interface EditableMovieData {
  id?: string; // Optional for adding
  title: string;
  year: number;
  duration: number;
  description: string;
  posterUrl: string;
  genres: Genre[];
  directors: Director[];
}

// Define props interface for MovieFormModal
interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // This will be called after successful form submission
  movieToEdit: EditableMovieData | null; // Pass movie data for editing (or null for add)
  availableGenres: Genre[]; // Pass available genres to modal
  availableDirectors: Director[]; // Pass available directors to modal
  onAddMovie: (movieData: EditableMovieData) => Promise<void>;
  onUpdateMovie: (movieData: EditableMovieData) => Promise<void>;
}

// --- Helper Components (defined within this file for single immersive) ---

// Component for displaying total movies count
const TotalMoviesCard: React.FC<{ count: number; loading: boolean }> = ({
  count,
  loading,
}) => (
  // Updated card styling with base-100 background and shadow
  <div className="card bg-base-100 p-4 shadow rounded-lg border border-base-300">
    <h2 className="text-xl font-semibold text-base-content">Total Movies</h2>
    <p className="text-3xl mt-2 text-primary">{loading ? "..." : count}</p>{" "}
    {/* Use primary color for count */}
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
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-neutral-content"
        />
        <XAxis
          dataKey="name"
          className="stroke-neutral"
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 12 }}
        />
        <YAxis className="stroke-neutral" />
        <Tooltip
          // className="bg-accent"
          labelClassName="bg-base-100"
          contentStyle={{
            backgroundColor: "",
            borderColor: "",
            color: "",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          className="stroke-base stroke-3"
          dot={{
            className: "fill-base-content stroke-2",
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
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-neutral-content"
        />
        <XAxis
          dataKey="name"
          className="stroke-neutral"
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 12 }}
        />
        <YAxis className="stroke-neutral" />
        <Tooltip
          // className="bg-accent"
          labelClassName="bg-base-100"
          contentStyle={{
            backgroundColor: "",
            borderColor: "",
            color: "",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          className="stroke-base stroke-3"
          dot={{
            className: "fill-base-content stroke-2",
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
  onEditClick: (movie: Movie) => void; // Handler to signal edit click
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

      {/* Table view for medium and larger screens */}
      <div className="overflow-x-auto hidden md:block">
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

      {/* Card view for small screens */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {movies.map((m) => (
          <div
            key={m.id}
            className="card bg-base-100 p-4 shadow rounded-lg border border-base-300"
          >
            <h3 className="text-lg font-semibold text-base-content">
              {m.title} ({m.year})
            </h3>
            <p className="text-base-content text-sm">
              Duration: {m.duration} min
            </p>
            <p className="text-base-content text-sm">
              Rating: {m.averageRating.toFixed(1)}
            </p>
            <p className="text-base-content text-sm">
              Genres: {m.genres.map((g) => g.name).join(", ")}
            </p>
            <p className="text-base-content text-sm">
              Directors:{" "}
              {m.directors
                .map((d) => `${d.firstName} ${d.lastName}`)
                .join(", ")}
            </p>
            <div className="mt-4 card-actions justify-end">
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
          </div>
        ))}
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
  // Basic focus trap implementation (could be enhanced with a library)
  const modalRef = useRef<HTMLDivElement>(null);

  // Move useEffect for Escape key and focus trap outside the conditional render
  useEffect(() => {
    if (isOpen) {
      // Focus the first focusable element in the modal when it opens
      const firstFocusableElement = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement | null;
      firstFocusableElement?.focus();

      // Add event listener for Escape key to close modal
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);

      // Clean up event listener on close
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Determine which handler to use based on whether movieToEdit is provided
  const handleSubmit = async (movieData: EditableMovieData) => {
    if (movieToEdit && movieData.id) {
      // Ensure id exists for update
      await onUpdateMovie(movieData);
    } else {
      await onAddMovie(movieData);
    }
    // onSuccess is called after the API calls complete in the parent handlers
  };

  // Only render the modal if it's open
  if (!isOpen) return null;

  return (
    // DaisyUI Modal structure with updated backdrop and ref for focus trap
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <form
        method="dialog"
        className="modal-backdrop fixed inset-0 z-0" // Removed bg-base-content bg-opacity-30
        onClick={onClose}
        aria-label="Close modal"
      >
        <button></button> {/* Empty button for dialog closing */}
      </form>
      <div className="modal-box bg-base-100 text-base-content max-w-2xl">
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
            onSuccess={handleSubmit} // Pass the combined submit handler
            onCancel={onClose}
            availableGenres={availableGenres}
            availableDirectors={availableDirectors}
          />
        </div>
      </div>
      {/* Close modal on clicking outside - Removed dimming classes */}
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
  // Corrected: Declared topDirectorsDisplayed as state with its setter
  const [topDirectorsDisplayed, setTopDirectorsDisplayed] = useState<
    { name: string; count: number }[]
  >([]);

  // Ref for debouncing search input
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use useCallback for fetchMovies to make it stable
  const fetchMovies = useCallback(
    async (forceApiFetch = false) => {
      // Added forceApiFetch parameter
      setLoading(true);
      setError(null);

      const localStorageKey = `cachedMovies_${searchTerm}_${currentPage}_${itemsPerPage}_${sortColumn}_${sortDirection}`;

      if (!forceApiFetch) {
        // Try to load from local storage first
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
            return; // Use cached data and exit
          } catch (e) {
            console.error("Error parsing cached data:", e);
            // If parsing fails, proceed to fetch from API
          }
        }
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          return;
        }
        // Construct the API URL with search, pagination, and sorting parameters
        // This uses import.meta.env which is the correct way in Vite
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

        // Store fetched data in local storage
        try {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ movies, totalMovies })
          );
          console.log("Cached movies in local storage.");
        } catch (e) {
          console.error("Error saving to local storage:", e);
          // Continue even if local storage fails
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
  ); // Add dependencies

  // Fetch available genres and directors once on mount
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
        // Type assertion for err to be more specific with AxiosError
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

  // Effect to fetch movies when dependencies change (including debounced search)
  useEffect(() => {
    // Clear previous debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new debounce timeout
    debounceTimeoutRef.current = setTimeout(() => {
      fetchMovies(); // Call fetchMovies with default forceApiFetch = false
    }, 500); // 500ms debounce delay

    // Cleanup function to clear timeout on unmount or dependency change
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [fetchMovies, searchTerm]); // Depend on fetchMovies and searchTerm

  // Effect to reset page to 1 when search term changes (immediately, not debounced)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const computeAnalytics = (data: Movie[]) => {
    const genreCount: Record<string, number> = {};
    data.forEach((m) => {
      m.genres.forEach((g) => {
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
      m.directors.forEach((d) => {
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

  // Handler for sorting table columns
  const handleSort = (column: keyof Movie) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page on sorting
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Handle updating a movie (called from MovieForm)
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
      // Force API fetch after successful update to ensure fresh data
      await fetchMovies(true);
      toast.success("Movie updated successfully!");
      handleFormSuccess(); // Close modal
    } catch (err) {
      console.error("Error updating movie:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to update movie.");
        toast.error(err.response?.data?.error || "Failed to update movie.");
      } else {
        setError("Failed to update movie. Please try again.");
        toast.error("Failed to update movie.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new movie (called from MovieForm)
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
      // Force API fetch after successful add to ensure fresh data
      await fetchMovies(true);
      toast.success("Movie added successfully!");
      handleFormSuccess(); // Close modal
    } catch (err) {
      console.error("Error adding movie:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to add movie.");
        toast.error(err.response?.data?.error || "Failed to add movie.");
      } else {
        setError("Failed to add movie. Please try again.");
        toast.error("Failed to add movie.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a movie
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
        // Force API fetch after successful delete to ensure fresh data
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

  // Handle successful movie addition/update from the modal form
  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    setEditingMovie(null);
  };

  // Handle canceling movie addition/update from the modal form
  const handleFormCancel = () => {
    setIsFormModalOpen(false);
    setEditingMovie(null);
  };

  // Handle explicit refresh button click
  const handleRefreshClick = () => {
    fetchMovies(true); // Force API fetch
    toast.success("Refreshing movies...");
  };

  return (
    <div className="container mx-auto p-6 bg-base-100 min-h-screen rounded-lg shadow-xl relative">
      {/* Toaster for notifications - ideally placed at the root of your app */}
      {/* <Toaster position="bottom-right" /> */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-primary pb-3 space-y-4 md:space-y-0">
        <h1 className="text-4xl font-bold text-base-content">
          Admin Movie Dashboard
        </h1>
        <div className="flex space-x-4">
          {" "}
          {/* Container for buttons */}
          {/* Refresh Button */}
          <button
            className="btn btn-outline btn-primary shadow-md"
            onClick={handleRefreshClick}
            aria-label="Refresh Movie List"
            disabled={loading} // Disable while loading
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <LuRefreshCw className="h-5 w-5" />
            )}
            <span className="ml-2 hidden md:inline">Refresh</span>{" "}
            {/* Text on larger screens */}
          </button>
          {/* Add New Movie Button */}
          <button
            className="btn btn-primary shadow-md"
            onClick={() => {
              setEditingMovie(null); // Clear editing movie state for add
              setIsFormModalOpen(true);
            }}
            aria-label="Add New Movie"
            disabled={isFormModalOpen}
          >
            Add New Movie
          </button>
        </div>
      </div>

      {/* Movie Form Modal (handles both Create and Edit) */}
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
            onClick={() => fetchMovies(true)} // Retry also forces API fetch
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
            <span className="text-base-content">Items per page:</span>
            <select
              className="select select-bordered select-primary shadow-sm text-base-content"
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
              className="join-item btn btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              «
            </button>
            <button className="join-item btn btn-outline border-primary text-primary pointer-events-none">
              Page {currentPage} of {Math.ceil(totalMoviesCount / itemsPerPage)}
            </button>
            <button
              className="join-item btn btn-outline btn-primary"
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
