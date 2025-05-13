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
  onClose: () => void; // Function to call when the modal should close (e.g., on cancel or success/failure)
  onSuccess: () => void; // Function to call after a successful add/edit operation (for parent to refresh data)
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
          height={60} // Give more space for rotated labels
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
          height={60} // Give more space for rotated labels
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
  onClose, // This is the prop passed from AdminMovieDashboard (handleFormCancel)
  onSuccess, // This is the prop passed from AdminMovieDashboard (handleFormSuccess)
  movieToEdit,
  availableGenres,
  availableDirectors,
  onAddMovie,
  onUpdateMovie,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Effect to manage focus and escape key handling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Find the first focusable element and focus it
      const firstFocusableElement = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement | null;
      firstFocusableElement?.focus();

      // Add event listener for Escape key
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose(); // Call the onClose prop to close the modal
        }
      };
      document.addEventListener("keydown", handleEscape);

      // Cleanup function to remove event listener
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]); // Depend on isOpen and onClose prop

  // Handles the actual movie saving logic (add or update)
  // This function is passed as the onSuccess prop to the MovieForm component
  const onSubmitFromForm = async (movieData: EditableMovieData) => {
    try {
      if (movieToEdit && movieData.id) {
        await onUpdateMovie(movieData); // Call the parent's update function
      } else {
        await onAddMovie(movieData); // Call the parent's add function
      }
      // If the API call is successful, call the parent's onSuccess handler
      // This handler is responsible for refreshing data
      onSuccess();
    } catch (error) {
      // Error handling and toast are handled in the parent's add/update functions
      console.error("Form submission error in MovieFormModal:", error);
      // Re-throw the error so it can be handled by the caller if necessary
      throw error;
    } finally {
      // Always close the modal after the API call finishes (success or failure)
      onClose();
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    // Modal container with fixed positioning and backdrop
    <div
      className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      {/* Modal backdrop - clicking closes the modal */}
      <div
        className="modal-backdrop absolute inset-0"
        onClick={onClose} // Call the onClose prop
        aria-label="Close modal"
      ></div>
      {/* Modal content box */}
      <div className="modal-box bg-base-100 text-base-content w-11/12 max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg" id="modal-title">
          {movieToEdit ? "Edit Movie" : "Add New Movie"}
        </h3>
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
          onClick={onClose} // Call the onClose prop
          aria-label="Close modal"
        >
          ✕
        </button>
        {/* Movie Form component */}
        <div className="py-4">
          <MovieForm
            movieToEdit={movieToEdit}
            onSuccess={onSubmitFromForm} // Pass the internal submit handler
            onCancel={onClose} // Pass the onClose prop for the Cancel button
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

      // Construct a unique cache key based on state
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
            return; // Exit if cached data is used
          } catch (e) {
            console.error("Error parsing cached data:", e);
            // If parsing fails, proceed to fetch from API
          }
        }
      }

      // Fetch from API if no cached data or forceApiFetch is true
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle missing token - maybe redirect to login or show error
          console.error("Authentication token not found for fetching options.");
          setLoading(false); // Ensure loading is false on auth error
          return; // Stop execution if no token
        }
        const apiUrl = `${import.meta.env
          .VITE_GET_MOVIES_URL!}?search=${encodeURIComponent(
          searchTerm
        )}&page=${currentPage}&limit=${itemsPerPage}${
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

        // Cache the fetched data
        try {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ movies, totalMovies })
          );
          console.log("Cached movies in local storage.");
        } catch (e) {
          console.error("Error saving to local storage:", e);
          // Non-critical error, continue
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
        setLoading(false); // Ensure loading is false after fetch attempt
      }
    },
    // Dependencies for useCallback
    [searchTerm, currentPage, itemsPerPage, sortColumn, sortDirection]
  );

  // Effect to fetch initial data and options (genres/directors)
  useEffect(() => {
    // Fetch genres and directors for the form
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle missing token - maybe redirect to login or show error
          console.error("Authentication token not found for fetching options.");
          return;
        }
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

    // Initial fetch of movies
    fetchMovies(); // Fetch movies on component mount
  }, [fetchMovies]); // Depend on fetchMovies (which has its own dependencies)

  // Effect for debouncing search term changes
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      // Only fetch movies if the search term has changed
      // fetchMovies is already debounced via useCallback dependencies
      // This outer effect ensures that *typing* triggers the debounced fetch
      if (searchTerm !== undefined) {
        // Ensure searchTerm is not undefined on initial render
        fetchMovies();
      }
    }, 300); // Adjust debounce delay as needed (e.g., 300ms)

    // Cleanup function for the timeout
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm, fetchMovies]); // Depend on searchTerm and fetchMovies

  // Reset page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Function to compute analytics (genres and directors) from the current movie list
  const computeAnalytics = (data: Movie[]) => {
    const genreCount: Record<string, number> = {};
    data.forEach((m) => {
      m.genres.forEach((g: Genre) => {
        const name = g.name;
        genreCount[name] = (genreCount[name] || 0) + 1;
      });
    });
    const genresArray = Object.entries(genreCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Limit to top 5
    setTopGenresDisplayed(genresArray);

    const directorCount: Record<string, number> = {};
    data.forEach((m) => {
      m.directors.forEach((d: Director) => {
        const name = `${d.firstName} ${d.lastName}`;
        directorCount[name] = (directorCount[name] || 0) + 1;
      });
    });
    const directorsArray = Object.entries(directorCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Limit to top 5
    setTopDirectorsDisplayed(directorsArray);
  };

  // Handles sorting table columns
  const handleSort = (column: keyof Movie) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Handles pagination page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalMoviesCount / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Handles changes in items per page
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handles updating a movie via API
  const handleUpdateMovie = async (movieData: EditableMovieData) => {
    try {
      setLoading(true); // Show loading indicator
      const token = localStorage.getItem("token");
      if (!token) {
        const authError = "Authentication token not found. Please log in.";
        setError(authError);
        toast.error(authError);
        throw new Error(authError); // Throw to be caught by onSubmitFromForm
      }
      // Prepare data for the API call, mapping genres/directors to simple arrays/objects
      await axios.patch(
        `${import.meta.env.VITE_UPDATE_MOVIE_URL!}/${movieData.id}`,
        {
          ...movieData,
          genres: movieData.genres.map((g) => g.name), // Send only genre names
          directors: movieData.directors.map((d) => ({
            firstName: d.firstName,
            lastName: d.lastName,
          })), // Send first and last names
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch fresh data after successful update
      await fetchMovies(true);
      toast.success("Movie updated successfully!");
      // The modal will be closed by onSubmitFromForm's finally block
    } catch (err) {
      console.error("Error updating movie:", err);
      let errorMessage = "Failed to update movie.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || errorMessage;
      }
      setError(errorMessage); // Set component-level error state
      toast.error(errorMessage); // Show toast notification
      throw err; // Re-throw to be caught by onSubmitFromForm
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Handles adding a new movie via API
  const handleAddMovie = async (movieData: EditableMovieData) => {
    try {
      setLoading(true); // Show loading indicator
      const token = localStorage.getItem("token");
      if (!token) {
        const authError = "Authentication token not found. Please log in.";
        setError(authError);
        toast.error(authError);
        throw new Error(authError); // Throw to be caught by onSubmitFromForm
      }
      // Prepare data for the API call
      await axios.post(
        import.meta.env.VITE_CREATE_MOVIE_URL!,
        {
          ...movieData,
          genres: movieData.genres.map((g) => g.name), // Send only genre names
          directors: movieData.directors.map((d) => ({
            firstName: d.firstName,
            lastName: d.lastName,
          })), // Send first and last names
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch fresh data after successful addition
      await fetchMovies(true);
      toast.success("Movie added successfully!");
      // The modal will be closed by onSubmitFromForm's finally block
    } catch (err) {
      console.error("Error adding movie:", err);
      let errorMessage = "Failed to add movie.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || errorMessage;
      }
      setError(errorMessage); // Set component-level error state
      toast.error(errorMessage); // Show toast notification
      throw err; // Re-throw to be caught by onSubmitFromForm
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Handles deleting a movie with confirmation
  const handleDeleteMovie = async (movieId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Keep color option
      cancelButtonColor: "#3085d6", // Keep color option
      confirmButtonText: "Yes, delete it!",
      background: "hsl(var(--b1))", // Match DaisyUI background
      color: "hsl(var(--bc))", // Match DaisyUI text color
      // Corrected: Use customClass for button styling
      customClass: {
        confirmButton: "btn btn-error", // Apply DaisyUI button classes
        cancelButton: "btn btn-outline btn-accent ml-2", // Apply DaisyUI button classes
      },
      buttonsStyling: false, // Disable default styling to use custom classes
    });

    if (result.isConfirmed) {
      try {
        setLoading(true); // Show loading indicator
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          toast.error("Authentication token not found. Please log in.");
          return;
        }
        await axios.delete(
          `${import.meta.env.VITE_DELETE_MOVIE_URL!}/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Movie deleted successfully!");
        fetchMovies(true); // Refresh the movie list
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
        setLoading(false); // Hide loading indicator
      }
    }
  };

  // Function called by MovieFormModal upon successful add/edit
  const handleFormSuccess = () => {
    // This function is now primarily for the parent to know when a successful operation occurred
    // The modal closing logic is handled in MovieFormModal's finally block
    setEditingMovie(null); // Clear editing state
    // fetchMovies(true) is already called within handleAddMovie/handleUpdateMovie
  };

  // Function called by MovieFormModal when cancelled or after submission (success/failure)
  const handleFormCancel = () => {
    setIsFormModalOpen(false); // Close the modal
    setEditingMovie(null); // Clear editing state
  };

  // Handles the click on the refresh button
  const handleRefreshClick = () => {
    fetchMovies(true); // Force fetch from API
    toast.success("Refreshing movies...");
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 bg-base-100 min-h-screen rounded-lg relative">
      {/* Page Title and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-primary pb-3 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-4xl font-bold text-base-content">
          Admin Movie Dashboard
        </h1>
        <div className="flex space-x-4">
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
            <span className="ml-2 hidden md:inline">Refresh</span>
          </button>
          {/* Add New Movie Button */}
          <button
            className="btn btn-primary shadow-md"
            onClick={() => {
              setEditingMovie(null); // Clear any previous editing state
              setIsFormModalOpen(true); // Open the modal for adding
            }}
            aria-label="Add New Movie"
            disabled={isFormModalOpen} // Disable if modal is already open
          >
            Add New Movie
          </button>
        </div>
      </div>

      {/* Movie Form Modal (conditionally rendered) */}
      <MovieFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormCancel} // Pass the cancel handler (which now closes the modal)
        onSuccess={handleFormSuccess} // Pass the success handler (for parent data refresh)
        movieToEdit={editingMovie} // Pass the movie data if editing
        availableGenres={availableGenres}
        availableDirectors={availableDirectors}
        onAddMovie={handleAddMovie} // Pass the add movie API function
        onUpdateMovie={handleUpdateMovie} // Pass the update movie API function
      />

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="alert alert-error mb-4 text-error-content"
          aria-live="assertive" // Announce error to screen readers
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
          {/* Retry button */}
          <button
            className="btn btn-sm btn-error ml-4 shadow-md"
            onClick={() => fetchMovies(true)} // Retry fetching movies
          >
            Retry
          </button>
        </div>
      )}

      {/* Dashboard Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TotalMoviesCard count={totalMoviesCount} loading={loading} />
        {/* Render charts only if data is available */}
        {topGenresDisplayed.length > 0 && (
          <GenresChart data={topGenresDisplayed} />
        )}
        {topDirectorsDisplayed.length > 0 && (
          <DirectorsChart data={topDirectorsDisplayed} />
        )}
      </div>

      {/* Search, Pagination, and Items per Page Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
        {/* Search Input */}
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
          {/* Items per Page Select */}
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
          {/* Pagination Controls */}
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

      {/* Movie List Table */}
      <MovieListTable
        movies={movies}
        loading={loading}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onDelete={handleDeleteMovie}
        // Prepare movie data and open modal for editing
        onEditClick={(movie) => {
          const movieFormData: EditableMovieData = {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            duration: movie.duration,
            description: movie.description,
            posterUrl: movie.posterUrl,
            genres: movie.genres, // Pass existing genres
            directors: movie.directors, // Pass existing directors
          };
          setEditingMovie(movieFormData); // Set movie to edit
          setIsFormModalOpen(true); // Open the modal
        }}
      />
    </div>
  );
}
