import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

// --- Interfaces ---
interface Director {
  id?: string;
  firstName: string;
  lastName: string;
}

interface Genre {
  id?: string;
  name: string;
}

export interface EditableMovieData {
  id?: string; // Optional for adding
  title: string;
  year: number;
  duration: number;
  description: string;
  posterUrl: string;
  genres: Genre[];
  directors: Director[];
}

interface MovieFormProps {
  movieToEdit: EditableMovieData | null;
  onSuccess: (movieData: EditableMovieData) => Promise<void>;
  onCancel: () => void;
  availableGenres: Genre[];
  availableDirectors: Director[];
}

// --- MovieForm Component ---
const MovieForm: React.FC<MovieFormProps> = ({
  movieToEdit,
  onSuccess,
  onCancel,
  availableGenres,
  availableDirectors,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    register,
  } = useForm<EditableMovieData>({
    defaultValues: movieToEdit || {
      title: "",
      year: 0,
      duration: 0,
      description: "",
      posterUrl: "",
      genres: [],
      directors: [],
    },
  });

  const {
    fields: genreFields,
    append: appendGenre,
    remove: removeGenre,
  } = useFieldArray({
    control,
    name: "genres",
  });

  const {
    fields: directorFields,
    append: appendDirector,
    remove: removeDirector,
  } = useFieldArray({
    control,
    name: "directors",
  });

  useEffect(() => {
    reset(
      movieToEdit || {
        title: "",
        year: 0,
        duration: 0,
        description: "",
        posterUrl: "",
        genres: [],
        directors: [],
      }
    );
  }, [movieToEdit, reset]);

  const onSubmit = async (data: EditableMovieData) => {
    try {
      await onSuccess(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // State for new genre/director inputs
  const [newGenreName, setNewGenreName] = useState("");
  const [newDirectorFirstName, setNewDirectorFirstName] = useState("");
  const [newDirectorLastName, setNewDirectorLastName] = useState("");

  // Handle adding a genre (from input or select)
  const handleAddGenre = (genre: Genre) => {
    // Check if genre already exists in the form's genre list
    const genreExists = genreFields.some(
      (field) => field.name.toLowerCase() === genre.name.toLowerCase()
    );
    if (genreExists) {
      toast.error("Genre already added.");
      return;
    }
    appendGenre(genre);
  };

  // Handle adding a director (from input or select)
  const handleAddDirector = (director: Director) => {
    // Check if director already exists in the form's director list
    const directorExists = directorFields.some(
      (field) =>
        field.firstName.toLowerCase() === director.firstName.toLowerCase() &&
        field.lastName.toLowerCase() === director.lastName.toLowerCase()
    );
    if (directorExists) {
      toast.error("Director already added.");
      return;
    }
    appendDirector(director);
  };

  // Handle adding a new genre from the input field
  const handleAddNewGenreFromInput = () => {
    if (newGenreName.trim()) {
      handleAddGenre({ name: newGenreName.trim() }); // Add with just name, backend will create
      setNewGenreName(""); // Clear input
    }
  };

  // Handle adding a new director from the input fields
  const handleAddNewDirectorFromInput = () => {
    if (newDirectorFirstName.trim() && newDirectorLastName.trim()) {
      handleAddDirector({
        firstName: newDirectorFirstName.trim(),
        lastName: newDirectorLastName.trim(),
      }); // Add with just names, backend will create
      setNewDirectorFirstName(""); // Clear input
      setNewDirectorLastName(""); // Clear input
    }
  };

  // Handle selecting an existing genre from the dropdown
  const handleSelectExistingGenre = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const genreId = e.target.value;
    if (genreId) {
      // Check if a valid option (not the placeholder) is selected
      const selectedGenre = availableGenres.find(
        (genre) => genre.id === genreId
      );
      if (selectedGenre) {
        handleAddGenre(selectedGenre);
      }
      e.target.value = ""; // Reset select value to placeholder
    }
  };

  // Handle selecting an existing director from the dropdown
  const handleSelectExistingDirector = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const directorId = e.target.value;
    if (directorId) {
      // Check if a valid option (not the placeholder) is selected
      const selectedDirector = availableDirectors.find(
        (director) => director.id === directorId
      );
      if (selectedDirector) {
        handleAddDirector(selectedDirector);
      }
      e.target.value = ""; // Reset select value to placeholder
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base-content">Title</span>
        </label>
        <input
          type="text"
          placeholder="Movie Title"
          className={`input input-bordered w-full ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title", { required: "Title is required" })}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p role="alert" className="text-error text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Year and Duration (side-by-side on larger screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Year */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base-content">Year</span>
          </label>
          <input
            type="number"
            placeholder="Year"
            className={`input input-bordered w-full ${
              errors.year ? "input-error" : ""
            }`}
            {...register("year", {
              required: "Year is required",
              min: { value: 1888, message: "Year must be valid" },
              max: {
                value: new Date().getFullYear(),
                message: "Year cannot be in the future",
              },
              valueAsNumber: true,
            })}
            aria-invalid={errors.year ? "true" : "false"}
          />
          {errors.year && (
            <p role="alert" className="text-error text-sm mt-1">
              {errors.year.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base-content">Duration (min)</span>
          </label>
          <input
            type="number"
            placeholder="Duration"
            className={`input input-bordered w-full ${
              errors.duration ? "input-error" : ""
            }`}
            {...register("duration", {
              required: "Duration is required",
              min: { value: 1, message: "Duration must be positive" },
              valueAsNumber: true,
            })}
            aria-invalid={errors.duration ? "true" : "false"}
          />
          {errors.duration && (
            <p role="alert" className="text-error text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base-content">Description</span>
        </label>
        <textarea
          placeholder="Movie Description"
          className={`textarea textarea-bordered w-full ${
            errors.description ? "textarea-error" : ""
          }`}
          {...register("description", { required: "Description is required" })}
          aria-invalid={errors.description ? "true" : "false"}
        ></textarea>
        {errors.description && (
          <p role="alert" className="text-error text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Poster URL */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base-content">Poster URL</span>
        </label>
        <input
          type="text"
          placeholder="https://example.com/poster.jpg"
          className={`input input-bordered w-full ${
            errors.posterUrl ? "input-error" : ""
          }`}
          {...register("posterUrl", {
            required: "Poster URL is required",
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, // Basic URL pattern
              message: "Please enter a valid URL",
            },
          })}
          aria-invalid={errors.posterUrl ? "true" : "false"}
        />
        {errors.posterUrl && (
          <p role="alert" className="text-error text-sm mt-1">
            {errors.posterUrl.message}
          </p>
        )}
      </div>

      {/* Genres */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base-content">Genres</span>
        </label>
        {/* Input for adding new genres */}
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <input
            type="text"
            placeholder="Add new genre"
            className="input input-bordered input-sm flex-grow text-base-content"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNewGenreFromInput();
              }
            }}
            aria-label="Add new genre"
          />
          <button
            type="button"
            className="btn btn-primary btn-sm md:w-auto"
            onClick={handleAddNewGenreFromInput}
            aria-label="Add genre"
          >
            <LuPlus className="h-4 w-4" />
          </button>
          {/* Select for existing genres */}
          <select
            className="select select-bordered select-sm flex-grow md:flex-none md:w-auto text-base-content"
            onChange={handleSelectExistingGenre}
            value="" // Reset value after selection
            aria-label="Select existing genre"
          >
            <option value="">Select existing genre</option>
            {availableGenres.map(
              (genre) =>
                // Only show genres not already added to the form
                !genreFields.some((field) => field.id === genre.id) && (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                )
            )}
          </select>
        </div>
        {/* Display selected genres with remove button */}
        {genreFields.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genreFields.map((field, index) => (
              <span
                key={field.id || field.name}
                className="badge badge-primary text-primary-content"
              >
                {field.name}
                <button
                  type="button"
                  onClick={() => removeGenre(index)}
                  className="ml-1 text-primary-content hover:text-white"
                  aria-label={`Remove genre ${field.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.genres && (
          <p role="alert" className="text-error text-sm mt-1">
            {errors.genres.message as string}
          </p>
        )}
      </div>

      {/* Directors */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base-content">Directors</span>
        </label>
        {/* Inputs for adding new directors */}
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered input-sm flex-grow text-base-content"
            value={newDirectorFirstName}
            onChange={(e) => setNewDirectorFirstName(e.target.value)}
            aria-label="Director first name"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered input-sm flex-grow text-base-content"
            value={newDirectorLastName}
            onChange={(e) => setNewDirectorLastName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNewDirectorFromInput();
              }
            }}
            aria-label="Director last name"
          />
          <button
            type="button"
            className="btn btn-primary btn-sm md:w-auto"
            onClick={handleAddNewDirectorFromInput}
            aria-label="Add director"
          >
            <LuPlus className="h-4 w-4" />
          </button>
          {/* Select for existing directors */}
          <select
            className="select select-bordered select-sm flex-grow md:flex-none md:w-auto text-base-content"
            onChange={handleSelectExistingDirector}
            value="" // Reset value after selection
            aria-label="Select existing director"
          >
            <option value="">Select existing director</option>
            {availableDirectors.map(
              (director) =>
                // Only show directors not already added to the form
                !directorFields.some((field) => field.id === director.id) && (
                  <option key={director.id} value={director.id}>
                    {director.firstName} {director.lastName}
                  </option>
                )
            )}
          </select>
        </div>
        {/* Display selected directors with remove button */}
        {directorFields.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {directorFields.map((field, index) => (
              <span
                key={field.id || `${field.firstName}-${field.lastName}`}
                className="badge badge-secondary text-secondary-content"
              >
                {field.firstName} {field.lastName}
                <button
                  type="button"
                  onClick={() => removeDirector(index)}
                  className="ml-1 text-secondary-content hover:text-white"
                  aria-label={`Remove director ${field.firstName} ${field.lastName}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.directors && (
          <p role="alert" className="text-error text-sm mt-1">
            {errors.directors.message as string}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="modal-action">
        {/* Cancel button */}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Cancel"
        >
          Cancel
        </button>
        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          aria-label={movieToEdit ? "Save Changes" : "Create Movie"}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : movieToEdit ? (
            "Save Changes"
          ) : (
            "Create Movie"
          )}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
