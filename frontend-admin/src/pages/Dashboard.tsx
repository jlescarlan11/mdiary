// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatPoint = {
  date: string;
  entryCount: number;
  avgRating: number;
  totalWatchCount: number;
};

export default function Dashboard() {
  const [data, setData] = useState<StatPoint[]>([]);

  useEffect(() => {
    // For example, last 30 days
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    const qs = new URLSearchParams({
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    });

    fetch(`/api/admin/diary-stats?${qs}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Diary Entry Analytics (Last 30 days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="count" orientation="left" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="rating"
            orientation="right"
            domain={[0, 5]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          {/* Number of entries */}
          <Line
            yAxisId="count"
            type="monotone"
            dataKey="entryCount"
            name="Entries"
            stroke="#34D399"
            dot={false}
            strokeWidth={2}
          />
          {/* Average rating */}
          <Line
            yAxisId="rating"
            type="monotone"
            dataKey="avgRating"
            name="Avg Rating"
            stroke="#60A5FA"
            dot={false}
            strokeWidth={2}
          />
          {/* Total watch count */}
          <Line
            yAxisId="count"
            type="monotone"
            dataKey="totalWatchCount"
            name="Total Watches"
            stroke="#FBBF24"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
