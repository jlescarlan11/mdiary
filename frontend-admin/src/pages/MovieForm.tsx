// MovieForm.tsx
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface MovieFormData {
  title: string;
  year: string;
  duration: string;
  description: string;
  posterUrl: string;
}

interface Director {
  id?: string;
  firstName: string;
  lastName: string;
}

// Add onSuccess prop to notify parent when creation succeeds
interface MovieFormProps {
  onSuccess?: () => void;
}

export default function MovieForm({ onSuccess }: MovieFormProps) {
  // --- Form state ---
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    year: "",
    duration: "",
    description: "",
    posterUrl: "",
  });

  // --- Genre & Director lists ---
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableDirectors, setAvailableDirectors] = useState<Director[]>([]);

  // --- Selected & new items ---
  const [genres, setGenres] = useState<string[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [newGenre, setNewGenre] = useState("");
  const [newDirector, setNewDirector] = useState<Director>({
    firstName: "",
    lastName: "",
  });

  // --- UI toggles & status ---
  const [showGenreInput, setShowGenreInput] = useState(false);
  const [showDirectorInput, setShowDirectorInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing genres & directors on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const [genreRes, directorRes] = await Promise.all([
          axios.get<{ name: string }[]>(import.meta.env.VITE_GET_GENRES_URL!, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Director[]>(import.meta.env.VITE_GET_DIRECTORS_URL!, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAvailableGenres(
          Array.isArray(genreRes.data) ? genreRes.data.map((g) => g.name) : []
        );
        setAvailableDirectors(
          Array.isArray(directorRes.data) ? directorRes.data : []
        );
      } catch (err) {
        console.error("Error fetching genres/directors:", err);
      }
    };
    fetchOptions();
  }, []);

  // Handle typed input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  // --- Genre handlers ---
  const handleGenreSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setShowGenreInput(true);
    } else if (val && !genres.includes(val)) {
      setGenres((g) => [...g, val]);
    }
    e.target.value = "";
  };

  const addNewGenre = () => {
    const trimmed = newGenre.trim();
    if (trimmed && !genres.includes(trimmed)) {
      setGenres((g) => [...g, trimmed]);
      if (!availableGenres.includes(trimmed)) {
        setAvailableGenres((ag) => [...ag, trimmed]);
      }
      setNewGenre("");
      setShowGenreInput(false);
    }
  };

  const removeGenre = (idx: number) =>
    setGenres((g) => g.filter((_, i) => i !== idx));

  // --- Director handlers ---
  const handleDirectorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setShowDirectorInput(true);
    } else if (val !== "") {
      const idx = parseInt(val, 10);
      const sel = availableDirectors[idx];
      if (
        sel &&
        !directors.some(
          (d) => d.firstName === sel.firstName && d.lastName === sel.lastName
        )
      ) {
        setDirectors((d) => [...d, sel]);
      }
    }
    e.target.value = "";
  };

  const addNewDirector = () => {
    const { firstName, lastName } = newDirector;
    if (firstName.trim() && lastName.trim()) {
      setDirectors((d) => [...d, { ...newDirector }]);
      setAvailableDirectors((ad) => [...ad, { ...newDirector }]);
      setNewDirector({ firstName: "", lastName: "" });
      setShowDirectorInput(false);
    }
  };

  const removeDirector = (idx: number) =>
    setDirectors((d) => d.filter((_, i) => i !== idx));

  // --- Form submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        year: parseInt(formData.year, 10),
        duration: parseInt(formData.duration, 10),
        genres,
        directors,
      };
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_CREATE_MOVIE_URL!,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        // reset
        setFormData({
          title: "",
          year: "",
          duration: "",
          description: "",
          posterUrl: "",
        });
        setGenres([]);
        setDirectors([]);
        setNewGenre("");
        setNewDirector({ firstName: "", lastName: "" });
        setShowGenreInput(false);
        setShowDirectorInput(false);
        alert("Movie created successfully!");
        // call parent callback to re-fetch
        onSuccess?.();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || "Failed to create movie");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-semibold mb-6">Create New Movie</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full input mt-1"
            required
          />
        </div>

        {/* Year & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Year</label>
            <input
              name="year"
              type="number"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full input mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Duration (min)</label>
            <input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full input mt-1"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full textarea mt-1"
            required
          />
        </div>

        {/* Poster URL */}
        <div>
          <label className="block font-medium">Poster URL</label>
          <input
            name="posterUrl"
            type="url"
            value={formData.posterUrl}
            onChange={handleInputChange}
            className="w-full input mt-1"
            required
          />
        </div>

        {/* Genres */}
        <div>
          <label className="block font-medium">Genres</label>
          <select onChange={handleGenreSelect} className="select w-full mt-1">
            <option value="">Select genre</option>
            {availableGenres.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
            <option value="__add_new__">+ Add New Genre</option>
          </select>

          {showGenreInput && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="input flex-1"
                placeholder="New genre"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
              />
              <button type="button" className="btn" onClick={addNewGenre}>
                Add
              </button>
            </div>
          )}

          {genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {genres.map((g, i) => (
                <span key={i} className="badge">
                  {g}{" "}
                  <button
                    type="button"
                    onClick={() => removeGenre(i)}
                    className="ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Directors */}
        <div>
          <label className="block font-medium">Directors</label>
          <select
            onChange={handleDirectorSelect}
            className="select w-full mt-1"
          >
            <option value="">Select director</option>
            {availableDirectors.map((d, i) => (
              <option key={i} value={i}>
                {d.firstName} {d.lastName}
              </option>
            ))}
            <option value="__add_new__">+ Add New Director</option>
          </select>

          {showDirectorInput && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                className="input"
                placeholder="First name"
                value={newDirector.firstName}
                onChange={(e) =>
                  setNewDirector((nd) => ({
                    ...nd,
                    firstName: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                className="input"
                placeholder="Last name"
                value={newDirector.lastName}
                onChange={(e) =>
                  setNewDirector((nd) => ({
                    ...nd,
                    lastName: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                className="btn col-span-2"
                onClick={addNewDirector}
              >
                Add Director
              </button>
            </div>
          )}

          {directors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {directors.map((d, i) => (
                <span key={i} className="badge">
                  {d.firstName} {d.lastName}{" "}
                  <button
                    type="button"
                    onClick={() => removeDirector(i)}
                    className="ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-4"
        >
          {loading ? "Submitting..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
}
