import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { toast, Toaster } from "react-hot-toast"; // For notifications
import {
  LuUsers,
  LuFileText,
  LuThumbsUp,
  LuUserPlus,
  LuActivity,
  LuTriangle,
  LuRefreshCw, // Import refresh icon
  LuChartBar, // Corrected: Icon for bar charts
  LuChartPie, // Corrected: Icon for pie chart
} from "react-icons/lu"; // Icons for cards and messages
import { format } from "date-fns"; // Import date-fns for date formatting

// Define the StatPoint type based on expected data structure
type StatPoint = {
  date: string; // Assuming date is a string like 'YYYY-MM-DD'
  totalWatchCount: number;
  entryCount: number; // Added entryCount based on query.js
  averageRating: number; // Added averageRating based on query.js
};

// Define the ActivityLog type based on expected data structure
type ActivityLogEntry = {
  id: string;
  type: string;
  details?: string; // Optional details
  createdAt: string;
  user: { username: string };
};

// Define the overall DashboardData type
type DashboardData = {
  stats: StatPoint[];
  totals: {
    users: number;
    entries: number;
    likes: number;
    newSignups: number;
  };
  activities: ActivityLogEntry[]; // Array of ActivityLogEntry
};

// Card component styled similarly to the reference image
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  // Updated card styling with base-200 background (darker), shadow, and rounded corners
  // Increased padding inside the card (p-6)
  <div
    className={`card bg-base-200 p-4 shadow-lg rounded-lg border border-base-300 ${
      className || ""
    }`}
  >
    {children}
  </div>
);

Card.Body = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  // Adjusted padding for card body (p-0) since padding is on the card itself
  <div className={`card-body p-0 ${className || ""}`}>{children}</div>
);

Card.Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  // Adjusted margin-bottom (mb-4) and font size (text-xl)
  <h3
    className={`text-xl font-semibold mb-4 text-base-content ${
      className || ""
    }`}
  >
    {children}
  </h3>
);

// Icon map for overview cards
const overviewIcons: { [key: string]: React.ElementType } = {
  users: LuUsers,
  entries: LuFileText,
  likes: LuThumbsUp,
  newSignups: LuUserPlus,
  // No direct icon for totalWatchCount here, it's in the chart
};

const PIE_CHART_COLORS = [
  "hsl(var(--p))", // Primary
  "hsl(var(--s))", // Secondary
  "hsl(var(--a))", // Accent
  "hsl(var(--nf))", // Neutral focus
  "hsl(var(--su))", // Success
  "hsl(var(--wa))", // Warning
  "hsl(var(--er))", // Error
];

// Skeleton Loader Components (Adjusted for new card styling)
const SkeletonCard: React.FC = () => (
  <Card>
    {" "}
    {/* Uses the updated Card styling */}
    <Card.Body className="flex flex-row items-center space-x-4">
      <div className="skeleton h-10 w-10 rounded-full bg-base-300"></div>{" "}
      {/* Added skeleton background */}
      <div>
        <div className="skeleton h-4 w-16 sm:w-24 mb-2 bg-base-300"></div>{" "}
        {/* Added skeleton background */}
        <div className="skeleton h-8 w-16 bg-base-300"></div>{" "}
        {/* Added skeleton background */}
      </div>
    </Card.Body>
  </Card>
);

const SkeletonChart: React.FC = () => (
  <Card>
    {" "}
    {/* Uses the updated Card styling */}
    <Card.Body>
      <div className="skeleton h-6 w-48 mb-4 bg-base-300"></div>{" "}
      {/* Added skeleton background */}
      <div className="skeleton h-64 w-full bg-base-300"></div>{" "}
      {/* Added skeleton background */}
    </Card.Body>
  </Card>
);

const SkeletonActivityItem: React.FC = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-base-300 rounded-md space-y-2 sm:space-y-0">
    {" "}
    {/* Adjusted background */}
    <div className="flex items-center space-x-4">
      <div className="skeleton h-4 w-4 rounded-full bg-base-content"></div>{" "}
      {/* Added skeleton background */}
      <div className="skeleton h-4 w-48 bg-base-content"></div>{" "}
      {/* Added skeleton background */}
    </div>
    <div className="skeleton h-4 w-24 self-end sm:self-center bg-base-content"></div>{" "}
    {/* Added skeleton background */}
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback for fetchDashboardData to make it stable
  const fetchDashboardData = useCallback(async (forceApiFetch = false) => {
    // Added forceApiFetch parameter
    setLoading(true);
    setError(null);
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30); // Last 30 days

    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_GET_ADMIN_DASHBOARD;

    if (!token) {
      const msg = "Authentication token not found. Please log in.";
      console.error(msg);
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    if (!apiUrl) {
      const msg = "VITE_GET_ADMIN_DASHBOARD environment variable is not set.";
      console.error(msg);
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    // Local Storage Key based on date range
    const localStorageKey = `cachedDashboardData_${start
      .toISOString()
      .slice(0, 10)}_${end.toISOString().slice(0, 10)}`;

    if (!forceApiFetch) {
      // Try to load from local storage first
      const cachedData = localStorage.getItem(localStorageKey);
      if (cachedData) {
        try {
          const parsedData: DashboardData = JSON.parse(cachedData);
          setData(parsedData);
          setLoading(false);
          console.log("Loaded dashboard data from local storage.");
          return; // Use cached data and exit
        } catch (e) {
          console.error("Error parsing cached dashboard data:", e);
          // If parsing fails, proceed to fetch from API
        }
      }
    }

    try {
      const fullUrl = `${apiUrl}?${new URLSearchParams({
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      })}`;

      const res = await fetch(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        const shortError = `HTTP error ${res.status}: Failed to fetch dashboard data.`;
        console.error(`HTTP error! status: ${res.status}`, errorText);
        setError(shortError);
        toast.error(shortError);
        // Try to parse as JSON if it's an API error, otherwise show generic
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson && errorJson.error) {
            toast.error(`Error: ${errorJson.error}`);
            setError(`API Error: ${errorJson.error}`);
          }
        } catch {
          // Not a JSON error response, stick with the short error
        }
        setData(null); // Clear any old data
      } else {
        const fetchedData: DashboardData = await res.json(); // Type assertion
        setData(fetchedData);
        toast.success("Dashboard data loaded!");

        // Store fetched data in local storage
        try {
          localStorage.setItem(localStorageKey, JSON.stringify(fetchedData));
          console.log("Cached dashboard data in local storage.");
        } catch (e) {
          console.error("Error saving dashboard data to local storage:", e);
          // Continue even if local storage fails
        }
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      const catchMsg = "An unexpected error occurred while fetching data.";
      setError(catchMsg);
      toast.error(catchMsg);
      setData(null); // Clear any old data
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies needed if date range is fixed or calculated within

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]); // Depend on fetchDashboardData

  // Function to format activity log details
  const formatActivityDetails = (activity: ActivityLogEntry) => {
    // Example formatting based on activity type
    switch (activity.type) {
      case "USER_LOGIN":
        return `logged in.`;
      case "MOVIE_CREATED":
        return `created a new movie entry.`;
      case "DIARY_ENTRY_ADDED":
        return `added a new diary entry.`;
      // Add more cases for other activity types
      default:
        return activity.details || "performed an action.";
    }
  };

  // Handle explicit refresh button click
  const handleRefreshClick = () => {
    fetchDashboardData(true); // Force API fetch
    toast.success("Refreshing dashboard data...");
  };

  return (
    // Use a container with responsive max-width and padding
    // Increased horizontal padding slightly on medium+ screens (px-4 md:px-8)
    // Added responsive padding-top to account for fixed navbar
    <div className="container max-w-7xl mx-auto p-4 md:p-8 bg-base-100 min-h-screen rounded-lg">
      {" "}
      {/* Added pt-20 */}
      <Toaster position="bottom-right" />
      {/* Page Title and Refresh Button - Adjusted margin-top to avoid overlapping with navbar */}
      {/* Increased bottom margin (mb-8) */}
      <div className="flex flex-col md:flex-row justify-between items-starzt mb-8 border-b-2 border-primary pb-3 space-y-0 mt-4">
        {" "}
        {/* Added mt-4, changed mb-6 to mb-8 */}
        <h1 className="text-lg md:text-4xl font-bold text-base-content">
          {" "}
          {/* Adjusted font size responsively */}
          Admin Dashboard Overview
        </h1>
        {/* Refresh Button */}
        <button
          className="btn btn-outline btn-primary shadow-md mt-4 md:mt-0" // Added margin for spacing
          onClick={handleRefreshClick}
          aria-label="Refresh Dashboard Data"
          disabled={loading} // Disable while loading
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <LuRefreshCw className="h-4 w-4" />
          )}
          <span className="ml-2">Refresh</span> {/* Text on larger screens */}
        </button>
      </div>
      {error && !data && (
        <div
          role="alert"
          className="alert alert-error mb-4 text-error-content shadow-md"
        >
          <LuTriangle className="h-6 w-6" />
          <div>
            <h3 className="font-bold">Error Loading Dashboard</h3>
            <div className="text-xs">{error}</div>
          </div>
        </div>
      )}
      {loading ? (
        // Skeleton Loading State
        <div className="space-y-4">
          {/* Overview Cards Skeleton */}
          {/* Adjusted grid to 2x2 on small screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>

          {/* Combined Charts Skeleton */}
          {/* Adjusted grid layout for charts and activity feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Charts column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-4">
              <SkeletonChart />
              <SkeletonChart />
            </div>
            {/* Recent Activity Feed column (1/3 width on large screens) */}
            <div className="lg:col-span-1">
              <SkeletonActivityItem /> {/* Use SkeletonActivityItem */}
              <SkeletonActivityItem />
              <SkeletonActivityItem />
              <SkeletonActivityItem />
              <SkeletonActivityItem />
            </div>
          </div>
        </div>
      ) : (
        data && (
          // Actual Data Display
          <div className="space-y-4">
            {/* Overview Cards */}
            {/* Adjusted grid to 2x2 on small screens */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(data.totals).map(([key, value]) => {
                const IconComponent = overviewIcons[key] || LuActivity;
                const title = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <Card key={key}>
                    <Card.Body className="flex flex-row items-center gap-4 ">
                      {" "}
                      {/* Changed to flex-col, added space-y */}
                      <IconComponent className="h-4 w-4 text-primary" />{" "}
                      <div className="flex justify-start flex-col items-start">
                        {/* Adjusted icon size */}
                        {/* Adjusted title text size and color, centered */}
                        {/* Reduced font size for mobile (text-xs sm:text-sm) */}
                        <Card.Title className="text-xs  text-base-content capitalize !mb-0 text-start">
                          {title}
                        </Card.Title>
                        {/* Adjusted value text size and color, centered */}
                        {/* Reduced font size for mobile (text-xl sm:text-2xl) */}
                        <p className="text-xs font-bold text-base-content text-center">
                          {typeof value === "number"
                            ? value.toLocaleString()
                            : value}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>

            {/* Combined Charts and Recent Activity */}
            {/* Adjusted grid layout to match reference image */}
            {/* Increased gap between the two main sections (gap-6) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Charts column (2/3 width on large screens) */}
              {/* Increased vertical space between charts (space-y-6) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Line Chart for Stats over time */}
                <Card>
                  <Card.Body>
                    <Card.Title className="flex items-center text-xs gap-2">
                      <LuChartBar className="h-4 w-4 text-accent" />{" "}
                      {/* Corrected: Icon */}
                      Activity Over Time (Last 30 Days)
                    </Card.Title>
                    {data.stats && data.stats.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                          data={data.stats}
                          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-base-300"
                          />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            className="fill-base-content"
                          />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            className="fill-base-content"
                          />
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
                          <Legend wrapperStyle={{ fontSize: "12px" }} />
                          <Line
                            type="monotone"
                            dataKey="entryCount" // Use entryCount for line chart
                            name="Diary Entries"
                            stroke="hsl(var(--p))"
                            strokeWidth={2}
                            dot={{
                              className: "fill-primary stroke-2 stroke-primary",
                              r: 4,
                            }}
                            activeDot={{
                              r: 6,
                              className:
                                "fill-primary stroke-base-100 stroke-2",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="averageRating" // Use averageRating for line chart
                            name="Average Rating"
                            stroke="hsl(var(--s))" // Use secondary color
                            strokeWidth={2}
                            dot={{
                              className:
                                "fill-secondary stroke-2 stroke-secondary",
                              r: 4,
                            }}
                            activeDot={{
                              r: 6,
                              className:
                                "fill-secondary stroke-base-100 stroke-2",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalWatchCount" // Use totalWatchCount for line chart
                            name="Total Watch Count"
                            stroke="hsl(var(--a))" // Use accent color
                            strokeWidth={2}
                            dot={{
                              className: "fill-accent stroke-2 stroke-accent",
                              r: 4,
                            }}
                            activeDot={{
                              r: 6,
                              className: "fill-accent stroke-base-100 stroke-2",
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-shadow-base-content">
                        No data available for the line chart.
                      </div>
                    )}
                  </Card.Body>
                </Card>

                {/* Pie Chart for Entries Distribution by Date (using entryCount) */}
                <Card>
                  <Card.Body>
                    <Card.Title className="flex items-center gap-4 text-xs">
                      <LuChartPie className="h-4 w-4 text-secondary " />{" "}
                      {/* Corrected: Icon */}
                      Entry Count Distribution (Last 30 Days)
                    </Card.Title>
                    {data.stats && data.stats.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.stats}
                            dataKey="entryCount" // Use entryCount for Pie Chart
                            nameKey="date"
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
                            labelLine={false}
                            label={({
                              cx,
                              cy,
                              midAngle,
                              innerRadius,
                              outerRadius,
                              percent,
                              payload,
                            }) => {
                              const RADIAN = Math.PI / 180;
                              const radius =
                                innerRadius + (outerRadius - innerRadius) * 0.5;
                              const x =
                                cx + radius * Math.cos(-midAngle * RADIAN);
                              const y =
                                cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="hsl(var(--bc))"
                                  textAnchor={x > cx ? "start" : "end"}
                                  dominantBaseline="central"
                                  fontSize="12px"
                                >
                                  {`${payload.date.substring(5)} (${(
                                    percent * 100
                                  ).toFixed(0)}%)`}
                                </text>
                              );
                            }}
                          >
                            {data.stats.map((_entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  PIE_CHART_COLORS[
                                    index % PIE_CHART_COLORS.length
                                  ]
                                }
                                stroke="hsl(var(--b1))"
                                strokeWidth={2}
                              />
                            ))}
                          </Pie>
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
                          <Legend
                            wrapperStyle={{ fontSize: "12px" }}
                            formatter={(value) => (
                              <span style={{ color: "hsl(var(--bc))" }}>
                                {value}
                              </span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-content">
                        No data available for pie chart.
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Recent Activity Feed column (1/3 width on large screens) */}
              <div className="lg:col-span-1">
                <Card>
                  {" "}
                  {/* Wrap activity feed in a Card */}
                  <Card.Body>
                    {/* Adjusted title size and bottom margin */}
                    <Card.Title className="flex items-center justify-between text-xs mb-4">
                      {" "}
                      {/* Adjusted text size and mb */}
                      Recent Activity
                      {/* Optional: Add a "View All" link here if you have a dedicated activity log page */}
                      {/* <Link to="/activity-log" className="text-sm text-primary hover:underline">View All</Link> */}
                    </Card.Title>
                    {data.activities && data.activities.length > 0 ? (
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {data.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-base-200 rounded-md hover:bg-base-content hover:text-base-100 transition-colors duration-150" // Adjusted hover styles
                          >
                            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                              <LuActivity className="h-4 w-4 text-accent flex-shrink-0" />
                              <span className="text-sm">
                                {" "}
                                {/* Removed text-base-content here to allow hover color */}
                                <span className="font-semibold text-primary">
                                  {activity.user.username}
                                </span>{" "}
                                {formatActivityDetails(activity)}{" "}
                                {/* Use formatted details */}
                              </span>
                            </div>
                            <span className="text-xs text-neutral-content self-end sm:self-center">
                              {format(new Date(activity.createdAt), "PPP p")}{" "}
                              {/* Format date and time */}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-20 text-base-content">
                        No recent activity to display.
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
