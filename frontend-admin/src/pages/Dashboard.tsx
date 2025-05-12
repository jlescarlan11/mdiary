import React, { useEffect, useState } from "react";
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
} from "recharts";

// Define the StatPoint type based on expected data structure
type StatPoint = {
  date: string; // Assuming date is a string like 'YYYY-MM-DD'
  totalWatchCount: number; // Assuming this is the metric for the LineChart and PieChart
  // Add other potential stats here if your API returns them
  users?: number;
  entries?: number;
  likes?: number;
  newSignups?: number;
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
  activities: Array<{
    id: string;
    type: string;
    details: string;
    createdAt: string;
    user: { username: string };
  }>;
};

// Placeholder Card component - replace with your actual Card component if it exists elsewhere
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`bg-white p-4 rounded-lg ${className}`}>{children}</div>;
Card.Body = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
Card.Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h3 className={`text-lg font-semibold mb-2 ${className}`}>{children}</h3>;

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6"];

export default function Dashboard() {
  // Use a single state variable for all dashboard data
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Use async function for better error handling
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Get the API URL from the environment variable
      const apiUrl = import.meta.env.VITE_GET_ADMIN_DASHBOARD;

      // If no token or API URL is found, we can't make the request
      if (!token) {
        console.error(
          "No authentication token found in localStorage. Please log in."
        );
        // Optionally, redirect to login page or show an error message
        return;
      }

      if (!apiUrl) {
        console.error(
          "VITE_GET_ADMIN_DASHBOARD environment variable is not set."
        );
        // Optionally, show an error message to the user
        return;
      }

      try {
        // Construct the full URL with query parameters
        const fullUrl = `${apiUrl}?${new URLSearchParams({
          startDate: start.toISOString().slice(0, 10),
          endDate: end.toISOString().slice(0, 10),
        })}`;

        // Fetch data from the API, including the Authorization header
        const res = await fetch(
          fullUrl, // Use the full URL from the environment variable
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the Authorization header
              "Content-Type": "application/json", // Often good practice to include
            },
          }
        );

        if (!res.ok) {
          // Handle non-2xx responses
          console.error(`HTTP error! status: ${res.status}`);
          const errorText = await res.text(); // Get error response body (likely HTML)
          console.error("Response body:", errorText); // Log the HTML response
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${errorText.substring(
              0,
              100
            )}...`
          ); // Include part of body in error
        }

        const data = await res.json();
        // Update the entire data state object
        setData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Optionally set data to a default empty state or show an error message
        // setData({ stats: [], totals: { users: 0, entries: 0, likes: 0, newSignups: 0 }, activities: [] });
      }
    };

    fetchDashboardData(); // Call the async function
  }, []); // Empty dependency array means this effect runs once on mount

  // Show loading state while data is being fetched
  if (!data) {
    return <div className="p-6 text-center">Loading dashboard data...</div>;
  }

  // Render the dashboard once data is available
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Use Object.entries to iterate over totals */}
        {Object.entries(data.totals).map(([key, val]) => (
          <Card key={key} className="shadow-lg border border-gray-200">
            <Card.Body>
              {/* Format the key for display */}
              <Card.Title className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </Card.Title>
              <p className="text-4xl font-bold text-gray-800 mt-1">{val}</p>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Combined Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart for Stats over time */}
        <Card className="shadow-lg border border-gray-200">
          <Card.Body>
            <Card.Title>Activity Over Time</Card.Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data.stats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* XAxis for date */}
                <XAxis dataKey="date" />
                {/* YAxis for the metric (e.g., totalWatchCount) */}
                <YAxis />
                {/* Tooltip to show details on hover */}
                <Tooltip />
                {/* Legend to identify lines */}
                <Legend />
                {/* Line for totalWatchCount */}
                <Line
                  type="monotone"
                  dataKey="totalWatchCount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                {/* Add other lines here if needed, e.g., users, entries, likes */}
                {/* <Line type="monotone" dataKey="users" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>

        {/* Pie Chart for Likes Distribution (using totalWatchCount as an example metric) */}
        <Card className="shadow-lg border border-gray-200">
          <Card.Body>
            <Card.Title>Likes Distribution (Sample)</Card.Title>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.stats}
                  dataKey="totalWatchCount" // Using totalWatchCount as a sample metric for pie slices
                  nameKey="date" // Using date as the name for slices
                  cx="50%" // Center X position
                  cy="50%" // Center Y position
                  outerRadius={100} // Outer radius of the pie
                  fill="#8884d8" // Default fill color
                  label // Show labels on slices
                >
                  {/* Map over data to assign colors to slices */}
                  {data.stats.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                {/* Tooltip to show details on hover */}
                <Tooltip />
                {/* Legend to identify slices by date */}
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card className="shadow-lg border border-gray-200">
        <Card.Body>
          <Card.Title>Recent Activity</Card.Title>
          <div className="space-y-3">
            {/* Map over activities to display them */}
            {data.activities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
              >
                <span className="text-gray-700 text-sm">
                  <span className="font-semibold">
                    {activity.user.username}
                  </span>{" "}
                  {activity.type} - {activity.details}
                </span>
                <span className="text-xs text-gray-500">
                  {/* Format the date */}
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
