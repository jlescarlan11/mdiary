// AdminMovieDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import MovieForm from "./MovieForm";

interface Director {
  movieId: string;
  directorId: string;
  director: { id: string; firstName: string; lastName: string };
}

interface Genre {
  movieId: string;
  genreId: string;
  genre: { id: string; name: string };
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
  _count: { DiaryEntry: number };
  averageRating: number;
}

export default function AdminMovieDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Analytics state
  const [totalMovies, setTotalMovies] = useState(0);
  const [topGenres, setTopGenres] = useState<{ name: string; count: number }[]>(
    []
  );
  const [topDirectors, setTopDirectors] = useState<
    { name: string; count: number }[]
  >([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<Movie[]>(
        import.meta.env.VITE_GET_MOVIES_URL!,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = res.data;
      setMovies(data);
      console.log(data);
      computeAnalytics(data);
    } catch (err) {
      console.error("Error loading movies", err);
    } finally {
      setLoading(false);
    }
  };

  const computeAnalytics = (data: Movie[]) => {
    setTotalMovies(data.length);

    // Compute genre frequencies
    const genreCount: Record<string, number> = {};
    data.forEach((m) => {
      m.genres.forEach((g) => {
        const name = g.genre.name;
        genreCount[name] = (genreCount[name] || 0) + 1;
      });
    });
    const genresArray = Object.entries(genreCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTopGenres(genresArray);

    // Compute director frequencies
    const directorCount: Record<string, number> = {};
    data.forEach((m) => {
      m.directors.forEach((d) => {
        const name = `${d.director.firstName} ${d.director.lastName}`;
        directorCount[name] = (directorCount[name] || 0) + 1;
      });
    });
    const directorsArray = Object.entries(directorCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTopDirectors(directorsArray);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Movie Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add New Movie"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          {/* Pass onSuccess callback to refresh list once a movie is created */}
          <MovieForm onSuccess={fetchMovies} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Movies</h2>
          <p className="text-3xl mt-2">{loading ? "..." : totalMovies}</p>
        </div>
        <div className="card bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Top Genres</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={topGenres}
              margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Top Directors</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={topDirectors}
              margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Movie List</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Genres</th>
                <th>Directors</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id}>
                  <td>{m.title}</td>
                  <td>{m.year}</td>
                  <td>{m.averageRating.toFixed(1)}</td>
                  <td>{m.genres.map((g) => g.genre.name).join(", ")}</td>
                  <td>
                    {m.directors
                      .map(
                        (d) => `${d.director.firstName} ${d.director.lastName}`
                      )
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
