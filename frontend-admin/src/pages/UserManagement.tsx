import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useDebounce } from "use-debounce";
import { format } from "date-fns";
import { toast, Toaster } from "react-hot-toast";
import { LuPencil, LuTrash, LuRefreshCw } from "react-icons/lu"; // Import desired icons

// --- Interfaces ---
interface User {
  id: string;
  username: string;
  email: string;
  photoUrl?: string;
  role: "USER" | "ADMIN";
  createdAt: string; // Assuming ISO string date
  entriesCount: number;
}

interface UsersResponse {
  users: User[];
  totalUsers: number;
}

interface ConfirmModalState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
  action: "updateRole" | "deleteUser" | null;
  currentRole?: "USER" | "ADMIN";
}

// --- Environment Variables ---
// Ensure these are correctly set in your .env file
const API_GET_USERS_URL = import.meta.env.VITE_GET_ADMIN_USERS;
const API_UPDATE_ROLE_URL = (userId: string) =>
  `${import.meta.env.VITE_GET_ADMIN_USERS}/${userId}`;
const API_DELETE_USER_URL = (userId: string) =>
  `${import.meta.env.VITE_GET_ADMIN_USERS}/${userId}`;

// --- Custom Hook for User Data Fetching and Management ---
const useUsers = (
  debouncedSearchQuery: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsersCount, setTotalUsersCount] = useState(0); // Added totalUsersCount state

  const fetchUsers = useCallback(
    async (forceApiFetch = false) => {
      // Added forceApiFetch parameter
      setLoading(true);
      setError(null);

      if (!API_GET_USERS_URL) {
        console.error("VITE_GET_ADMIN_USERS environment variable is not set.");
        setError("API endpoint not configured.");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in as admin.");
        setLoading(false);
        // Consider redirecting to the admin login page here
        // window.location.href = '/admin-login';
        return;
      }

      // Local Storage Key based on search, page, and items per page
      const localStorageKey = `cachedUsers_${debouncedSearchQuery}_${currentPage}_${itemsPerPage}`;

      if (!forceApiFetch) {
        // Try to load from local storage first
        const cachedData = localStorage.getItem(localStorageKey);
        if (cachedData) {
          try {
            const parsedData: UsersResponse = JSON.parse(cachedData);
            setUsers(parsedData.users);
            setTotalPages(Math.ceil(parsedData.totalUsers / itemsPerPage));
            setTotalUsersCount(parsedData.totalUsers); // Set total count from cache
            setLoading(false);
            console.log("Loaded users from local storage.");
            return; // Use cached data and exit
          } catch (e) {
            console.error("Error parsing cached user data:", e);
            // If parsing fails, proceed to fetch from API
          }
        }
      }

      try {
        const response = await axios.get<UsersResponse>(API_GET_USERS_URL, {
          params: {
            search: debouncedSearchQuery,
            page: currentPage,
            limit: itemsPerPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
          setTotalPages(Math.ceil(response.data.totalUsers / itemsPerPage));
          setTotalUsersCount(response.data.totalUsers); // Set total count from API
          // Store fetched data in local storage
          try {
            localStorage.setItem(
              localStorageKey,
              JSON.stringify(response.data)
            );
            console.log("Cached users in local storage.");
          } catch (e) {
            console.error("Error saving user data to local storage:", e);
            // Continue even if local storage fails
          }
        } else {
          console.error("API returned unexpected data format:", response.data);
          setError("Received unexpected data format from the server.");
          toast.error("Received unexpected data format from the server.");
          setUsers([]);
          setTotalPages(1);
          setTotalUsersCount(0);
        }
      } catch (err) {
        const axiosError = err as AxiosError<{ error?: string }>;
        console.error("Error fetching users:", err);
        setError(axiosError.response?.data?.error || "Failed to fetch users.");
        toast.error(
          axiosError.response?.data?.error || "Failed to fetch users."
        );
        setUsers([]);
        setTotalPages(1);
        setTotalUsersCount(0);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearchQuery, currentPage, itemsPerPage]
  ); // Dependencies for useCallback

  useEffect(() => {
    fetchUsers(); // Initial fetch
  }, [fetchUsers]); // Dependency for useEffect

  return { users, loading, error, totalPages, totalUsersCount, fetchUsers }; // Return totalUsersCount
};

// --- Confirmation Modal Component ---
const ConfirmationModal: React.FC<{
  modalState: ConfirmModalState;
  setModalState: React.Dispatch<React.SetStateAction<ConfirmModalState>>;
  onConfirm: (
    userId: string,
    action: "updateRole" | "deleteUser",
    currentRole?: "USER" | "ADMIN"
  ) => void;
}> = ({ modalState, setModalState, onConfirm }) => {
  const { isOpen, userId, userName, action, currentRole } = modalState;

  if (!isOpen || !userId || !action) return null;

  const handleConfirm = () => {
    onConfirm(userId, action, currentRole);
    setModalState({
      isOpen: false,
      userId: null,
      userName: null,
      action: null,
    });
  };

  const handleClose = () => {
    setModalState({
      isOpen: false,
      userId: null,
      userName: null,
      action: null,
    });
  };

  const getMessage = () => {
    if (action === "updateRole") {
      const newRole = currentRole === "USER" ? "ADMIN" : "USER";
      return `Are you sure you want to change the role of "${userName}" to ${newRole}?`;
    } else if (action === "deleteUser") {
      return `Are you sure you want to delete user "${userName}"? This action cannot be undone.`;
    }
    return ""; // Should not happen
  };

  return (
    <div className="modal modal-open">
      {/* Adjusted modal-box width for responsiveness */}
      <div className="modal-box bg-base-100 text-base-content w-11/12 max-w-sm">
        <h3 className="font-bold text-lg text-base-content">Confirm Action</h3>
        <p className="py-4 text-base-content">{getMessage()}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClose}>
            Cancel
          </button>
          <button
            className={`btn ${
              action === "deleteUser" ? "btn-error" : "btn-primary"
            }`}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={handleClose}>
        <button>close</button>
      </form>
    </div>
  );
};

// --- Main UserManagement Component ---
const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Use the custom hook for data fetching and state
  const { users, loading, error, totalPages, totalUsersCount, fetchUsers } =
    useUsers(
      // Get totalUsersCount
      debouncedSearchQuery,
      currentPage,
      itemsPerPage
    );

  // --- Assume you get the logged-in user's ID here ---
  // This would typically come from an authentication context,
  // decoding the token (less secure on frontend), or a separate API call.
  // For demonstration, we'll use a placeholder. Replace with your actual logic.
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // State to hold the logged-in user's ID

  // Example: Fetch current user ID on component mount (replace with your actual auth logic)
  useEffect(() => {
    // This is a placeholder. In a real app, you'd get the user ID from your auth system.
    // For example, if your login response includes the user ID and you store it:
    const loggedInUserId = localStorage.getItem("loggedInUserId"); // Assuming you store the ID
    if (loggedInUserId) {
      setCurrentUserId(loggedInUserId);
    } else {
      // Handle case where logged-in user ID is not available (e.g., redirect to login)
      console.warn("Logged-in user ID not found in localStorage.");
      // Consider redirecting to login or showing an error
    }
  }, []);
  // --- End of logged-in user ID assumption ---

  const [confirmModalState, setConfirmModalState] = useState<ConfirmModalState>(
    {
      isOpen: false,
      userId: null,
      userName: null,
      action: null,
    }
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    // Ensure page is within valid range
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Open confirmation modal for role update
  const handleOpenUpdateRoleConfirm = (user: User) => {
    // Prevent changing the role of the currently logged-in user
    if (user.id === currentUserId) {
      toast.error("You cannot change your own role.");
      return;
    }
    setConfirmModalState({
      isOpen: true,
      userId: user.id,
      userName: user.username,
      action: "updateRole",
      currentRole: user.role,
    });
  };

  // Open confirmation modal for user deletion
  const handleOpenDeleteUserConfirm = (user: User) => {
    // Prevent deleting the currently logged-in user
    if (user.id === currentUserId) {
      toast.error("You cannot delete your own account.");
      return;
    }
    setConfirmModalState({
      isOpen: true,
      userId: user.id,
      userName: user.username,
      action: "deleteUser",
    });
  };

  // Handle the actual confirmation action after modal confirmation
  const handleConfirmAction = async (
    userId: string,
    action: "updateRole" | "deleteUser",
    currentRole?: "USER" | "ADMIN"
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please log in as admin.");
      // Consider redirecting to the admin login page here
      // window.location.href = '/admin-login';
      return;
    }

    try {
      if (action === "updateRole" && currentRole !== undefined) {
        const newRole = currentRole === "USER" ? "ADMIN" : "USER";
        if (!API_UPDATE_ROLE_URL(userId)) {
          console.error("API endpoint for updating role is not configured.");
          toast.error("API endpoint not configured.");
          return;
        }
        await axios.patch(
          API_UPDATE_ROLE_URL(userId),
          { role: newRole },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(`User role updated to ${newRole}.`);
      } else if (action === "deleteUser") {
        if (!API_DELETE_USER_URL(userId)) {
          console.error("API endpoint for deleting user is not configured.");
          toast.error("API endpoint not configured.");
          return;
        }
        await axios.delete(API_DELETE_USER_URL(userId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`User deleted successfully.`);
      }
      // Refetch users to update the table after a successful action
      fetchUsers(true); // Force API fetch after action
    } catch (err) {
      const axiosError = err as AxiosError<{ error?: string }>;
      console.error(`Error performing ${action} action:`, err);
      toast.error(
        axiosError.response?.data?.error ||
          `Failed to perform ${action} action.`
      );
    }
  };

  // Handle explicit refresh button click
  const handleRefreshClick = () => {
    fetchUsers(true); // Force API fetch
    toast.success("Refreshing users...");
  };

  // --- Pagination Logic ---
  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxButtons = 5; // Maximum number of page buttons to display
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust startPage if endPage is limited by totalPages
    const adjustedStartPage = Math.max(1, endPage - maxButtons + 1);

    for (let i = adjustedStartPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item btn ${
            currentPage === i
              ? "btn-active btn-primary"
              : "btn-outline btn-primary"
          }`}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    // Use a container with responsive max-width and padding
    <div className="container max-w-7xl mx-auto p-4 md:p-6 bg-base-100 min-h-screen rounded-lg ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-primary pb-3 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-4xl font-bold text-base-content">
          {" "}
          {/* Adjusted font size responsively */}
          Admin User Dashboard
        </h1>
        {/* Refresh Button */}
        <button
          className="btn btn-outline btn-primary shadow-md mt-4 md:mt-0" // Added margin for spacing
          onClick={handleRefreshClick}
          aria-label="Refresh User List"
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
      </div>

      {/* Search and Pagination Controls (Top) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
        <div className="form-control w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by username or email..."
            className="input input-bordered input-primary w-full shadow-sm text-base-content"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search users"
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
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          {/* Updated Pagination Component */}
          <div className="join shadow-sm">
            <button
              className="join-item btn btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading} // Disable prev button if loading
              aria-label="Previous page"
            >
              «
            </button>
            {renderPaginationButtons()} {/* Render the numbered page buttons */}
            <button
              className="join-item btn btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === totalPages || totalUsersCount === 0 || loading
              } // Disable next button if loading
              aria-label="Next page"
            >
              »
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-4">
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
            ></path>
          </svg>
          <span className="text-error-content">{error}</span>
          {/* Retry button for error state */}
          <button
            className="btn btn-sm btn-error ml-4"
            onClick={() => fetchUsers(true)}
          >
            {" "}
            {/* Retry forces API fetch */}
            Retry
          </button>
        </div>
      )}

      {loading ? (
        // Skeleton Loader (Existing)
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md border border-base-300">
          {" "}
          {/* Added border */}
          <table className="table w-full">
            <thead>
              <tr className="bg-base-300 text-base-content">
                <th className="py-3 px-4 text-left">Avatar</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Entries</th>
                <th className="py-3 px-4 text-left">Date Joined</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(itemsPerPage)].map((_, index) => (
                <tr key={index} className="border-b border-base-300">
                  {" "}
                  {/* Added border */}
                  <td className="py-3 px-4">
                    <div className="skeleton mask mask-squircle w-12 h-12"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="skeleton h-4 w-32"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="skeleton h-4 w-48"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="skeleton h-4 w-16"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="skeleton h-4 w-10"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="skeleton h-4 w-24"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="skeleton h-8 w-16"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Actual Data Display
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md border border-base-300">
          {" "}
          {/* Added border */}
          {/* Table view for medium and larger screens */}
          <table className="table w-full hidden md:table">
            {/* head */}
            <thead>
              <tr className="bg-base-300 text-base-content">
                <th className="py-3 px-4 text-left">Avatar</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Entries</th>
                <th className="py-3 px-4 text-left">Date Joined</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Ensure users is an array before mapping */}
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-base-200 transition duration-150 ease-in-out border-b border-base-300" // Added border
                  >
                    <td className="py-3 px-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-base-300 flex items-center justify-center text-base-content text-xl font-bold overflow-hidden">
                          {/* Use a placeholder or default image if photoUrl is null */}
                          {user.photoUrl ? (
                            <img
                              src={user.photoUrl}
                              alt={`${user.username}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{user.username.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-base-content">
                      {user.username}
                    </td>
                    <td className="py-3 px-4 text-base-content">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`badge ${
                          user.role === "ADMIN"
                            ? "badge-secondary"
                            : "badge-neutral"
                        } badge-lg`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-base-content">
                      {user.entriesCount}
                    </td>
                    <td className="py-3 px-4 text-base-content">
                      {format(new Date(user.createdAt), "PPP")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {/* Update Role Button with Icon */}
                        <button
                          className={`btn btn-ghost btn-sm ${
                            user.role === "USER"
                              ? "text-primary"
                              : "text-warning"
                          }`}
                          onClick={() => handleOpenUpdateRoleConfirm(user)} // Open modal
                          aria-label={`Change role of ${user.username}`}
                          title={
                            user.id === currentUserId
                              ? "You cannot change your own role"
                              : user.role === "USER"
                              ? "Make Admin"
                              : "Make User"
                          } // Update tooltip for disabled state
                          disabled={user.id === currentUserId} // Disable if it's the logged-in user
                        >
                          <LuPencil className="h-4 w-4" />
                        </button>
                        {/* Delete Button with Icon */}
                        <button
                          className="btn btn-ghost btn-sm text-error"
                          onClick={() => handleOpenDeleteUserConfirm(user)} // Open modal
                          aria-label={`Delete ${user.username}`}
                          title={
                            user.id === currentUserId
                              ? "You cannot delete your own account"
                              : `Delete ${user.username}`
                          } // Update tooltip for disabled state
                          disabled={user.id === currentUserId} // Disable if it's the logged-in user
                        >
                          <LuTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-base-content"
                  >
                    {loading ? "Loading users..." : "No users found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        modalState={confirmModalState}
        setModalState={setConfirmModalState}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

export default UserManagement;
