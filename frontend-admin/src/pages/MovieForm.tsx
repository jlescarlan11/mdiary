import React, { useState, useEffect, useRef } from "react";
import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { LuSave, LuX } from "react-icons/lu";
import { toast } from "react-hot-toast"; // Import toast

// Define the structure for movie data that can be edited or added via the form
// This interface should match the EditableMovieData used in Movies.tsx
export interface EditableMovieData {
  id?: string; // Optional for adding a new movie
  title: string;
  year: number;
  duration: number;
  description: string;
  posterUrl: string;
  genres: { id?: string; name: string }[]; // Genres can be existing (with id) or new (no id)
  directors: { id?: string; firstName: string; lastName: string }[]; // Directors can be existing or new
}

// Define props for the MovieForm component
interface MovieFormProps {
  movieToEdit: EditableMovieData | null; // Data of the movie being edited, or null for adding
  onSuccess: (data: EditableMovieData) => Promise<void>; // Function to call on successful form submission
  onCancel: () => void; // Function to call when the form is cancelled
  availableGenres: { id?: string; name: string }[]; // List of genres available from the backend
  availableDirectors: { id?: string; firstName: string; lastName: string }[]; // List of directors available from the backend
}

// Helper component for searchable input with suggestions (for Genres and Directors)
interface SearchableInputProps<T> {
  label: string;
  placeholder: string;
  value: T | null;
  options: T[];
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T | null) => boolean;
  addNewLabel?: string;
  parseInput: (input: string) => T; // Function to parse input string into an object of type T
}

const SearchableInput = <T,>({
  label,
  placeholder,
  value,
  options,
  onChange,
  getOptionLabel,
  getOptionValue,
  isOptionEqualToValue,
  addNewLabel = "Add new",
  parseInput, // Destructure parseInput prop
}: SearchableInputProps<T>) => {
  const [inputValue, setInputValue] = useState(
    value ? getOptionLabel(value) : ""
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update input value when the 'value' prop changes (e.g., when editing a movie)
  useEffect(() => {
    setInputValue(value ? getOptionLabel(value) : "");
  }, [value, getOptionLabel]);

  // Filter options based on input value
  useEffect(() => {
    if (inputValue) {
      const lowerCaseInput = inputValue.toLowerCase();
      const filtered = options.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(lowerCaseInput)
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options); // Show all options when input is empty
    }
  }, [inputValue, options, getOptionLabel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // If the input value no longer matches the current selected value, clear the selected value
    if (value && getOptionLabel(value) !== newValue) {
      onChange(null);
    }

    setShowSuggestions(true); // Show suggestions as user types
  };

  const handleOptionClick = (option: T) => {
    setInputValue(getOptionLabel(option));
    onChange(option); // Pass the selected option object
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleBlur = () => {
    // ESLint might report '_e' as unused here, but it's implicitly used by the event handler context.
    // The timeout is crucial to allow click events on suggestions to register before hiding.
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        const matchedOption = options.find(
          (option) =>
            // Using getOptionValue for comparison where possible, fallback to label
            (isOptionEqualToValue
              ? isOptionEqualToValue(option, value)
              : getOptionValue(option) === inputValue) ||
            getOptionLabel(option) === inputValue
        );

        if (!matchedOption && inputValue.trim() !== "") {
          // Use the parseInput prop to create the new value object
          // Using 'any' here because the exact structure of T (Genre or Director) is generic.
          // A more type-safe approach would involve conditional types or separate components.
          const newValueObject = parseInput(inputValue.trim());
          onChange(newValueObject);
        } else if (matchedOption) {
          // If it matches an existing option, ensure that option is set as the value
          onChange(matchedOption);
        } else if (inputValue.trim() === "") {
          // If input is cleared, set value to null
          onChange(null);
        }
      }
    }, 100); // Small delay to allow click event on suggestion
  };

  const handleFocus = () => {
    setShowSuggestions(true); // Show suggestions when input is focused
  };

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, suggestionsRef]);

  return (
    <div className="form-control w-full relative">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
      />
      {showSuggestions && (
        <div
          // Increased z-index to z-20 (Tailwind class) to try and fix clickability issues on desktop
          className="absolute z-20 bg-base-100 border border-base-300 rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-lg"
          style={{ top: "100%" }} // Position below the input
          ref={suggestionsRef}
        >
          {filteredOptions.length > 0
            ? filteredOptions.map((option, index) => (
                <div
                  key={getOptionValue(option) || index} // Use value or index for key
                  className="p-2 cursor-pointer hover:bg-base-200 text-base-content"
                  onClick={() => handleOptionClick(option)} // Click handler is here
                >
                  {getOptionLabel(option)}
                </div>
              ))
            : // Option to add a new value if no suggestions match
              inputValue.trim() !== "" && (
                <div
                  className="p-2 cursor-pointer hover:bg-base-200 text-base-content italic"
                  onClick={() => {
                    // Use the parseInput prop to create the new value object
                    // Using 'any' here because the exact structure of T (Genre or Director) is generic.
                    const newValueObject = parseInput(inputValue.trim());
                    onChange(newValueObject);
                    setShowSuggestions(false);
                  }}
                >
                  {addNewLabel} "{inputValue.trim()}"
                </div>
              )}
        </div>
      )}
    </div>
  );
};

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
    register,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<EditableMovieData>({
    defaultValues: movieToEdit || {
      title: "",
      year: new Date().getFullYear(),
      duration: 0,
      description: "",
      posterUrl: "",
      genres: [],
      directors: [],
    },
  });

  // Use useFieldArray for managing dynamic lists of genres and directors
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

  // Reset form when movieToEdit changes (e.g., when switching from add to edit)
  useEffect(() => {
    reset(
      movieToEdit || {
        title: "",
        year: new Date().getFullYear(),
        duration: 0,
        description: "",
        posterUrl: "",
        genres: [],
        directors: [],
      }
    );
  }, [movieToEdit, reset]);

  const onSubmit: SubmitHandler<EditableMovieData> = async (data) => {
    await onSuccess(data);
  };

  // Handlers for managing multiple genres and directors
  const handleAddGenre = (genre: { id?: string; name: string } | null) => {
    if (genre?.name.trim()) {
      const currentGenres = getValues("genres") || [];
      // Explicitly type 'g' to avoid implicit any
      if (
        !currentGenres.some(
          (g: { id?: string; name: string }) =>
            g.name.toLowerCase() === genre.name.toLowerCase()
        )
      ) {
        appendGenre(genre); // Use append from useFieldArray
      } else {
        // Use the genre name from the input for the toast message
        toast.error(`Genre "${genre.name.trim()}" already added.`);
      }
    }
  };

  const handleRemoveGenre = (index: number) => {
    removeGenre(index); // Use remove from useFieldArray
  };

  const handleAddDirector = (
    director: { id?: string; firstName: string; lastName: string } | null
  ) => {
    if (director?.firstName.trim() || director?.lastName.trim()) {
      // Use getValues to get the current state of the directors array
      const currentDirectors = getValues("directors") || [];
      // Prevent adding duplicates based on full name
      const newDirectorFullName =
        `${director.firstName} ${director.lastName}`.toLowerCase();
      // Explicitly type 'd' to avoid implicit any
      if (
        !currentDirectors.some(
          (d: { id?: string; firstName: string; lastName: string }) =>
            `${d.firstName} ${d.lastName}`.toLowerCase() === newDirectorFullName
        )
      ) {
        appendDirector(director); // Use append from useFieldArray
      } else {
        // Use the director name from the input for the toast message
        toast.error(`Director "${newDirectorFullName}" already added.`);
      }
    }
  };

  const handleRemoveDirector = (index: number) => {
    removeDirector(index); // Use remove from useFieldArray
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Movie Title"
          className={`input input-bordered w-full ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.title.message}
            </span>
          </label>
        )}
      </div>

      {/* Year */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Year</span>
        </label>
        <input
          type="number"
          placeholder="Release Year"
          className={`input input-bordered w-full ${
            errors.year ? "input-error" : ""
          }`}
          {...register("year", {
            required: "Year is required",
            valueAsNumber: true,
            min: { value: 1800, message: "Year must be after 1800" },
            max: {
              value: new Date().getFullYear() + 5, // Allow future movies slightly
              message: `Year cannot be in the far future`,
            },
          })}
        />
        {errors.year && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.year.message}
            </span>
          </label>
        )}
      </div>

      {/* Duration */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Duration (minutes)</span>
        </label>
        <input
          type="number"
          placeholder="Duration in minutes"
          className={`input input-bordered w-full ${
            errors.duration ? "input-error" : ""
          }`}
          {...register("duration", {
            required: "Duration is required",
            valueAsNumber: true,
            min: { value: 1, message: "Duration must be at least 1 minute" },
          })}
        />
        {errors.duration && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.duration.message}
            </span>
          </label>
        )}
      </div>

      {/* Description */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Movie Description"
          className={`textarea textarea-bordered w-full ${
            errors.description ? "textarea-error" : ""
          }`}
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.description.message}
            </span>
          </label>
        )}
      </div>

      {/* Poster URL */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Poster URL</span>
        </label>
        <input
          type="url"
          placeholder="https://example.com/poster.jpg"
          className={`input input-bordered w-full ${
            errors.posterUrl ? "input-error" : ""
          }`}
          {...register("posterUrl", {
            required: "Poster URL is required",
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
              message: "Invalid URL format",
            },
          })}
        />
        {errors.posterUrl && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.posterUrl.message}
            </span>
          </label>
        )}
      </div>

      {/* Genres (Searchable Input with Add/Remove) */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Genres</span>
        </label>
        {/* Use Controller for react-hook-form integration */}
        <Controller
          name="genres"
          control={control}
          render={() => (
            <div>
              {/* Display currently selected genres */}
              <div className="flex flex-wrap gap-2 mb-2">
                {genreFields.map((genre, index) => (
                  // Use genreFields from useFieldArray. Key can be genre.id or genre.name
                  <div
                    key={genre.id || genre.name}
                    className="badge badge-primary gap-2"
                  >
                    {genre.name}
                    <button
                      type="button"
                      className="btn btn-xs btn-circle btn-ghost"
                      onClick={() => handleRemoveGenre(index)}
                      aria-label={`Remove genre ${genre.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {/* Searchable input for adding new genres */}
              <SearchableInput
                label="" // Label is handled above
                placeholder="Search or add genre"
                value={null} // Always treat this input as for adding, not editing a single value
                options={availableGenres}
                onChange={(genre) => handleAddGenre(genre)} // Add selected/new genre to the list
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id || option.name} // Use id or name as value
                addNewLabel="Add new genre:" // Custom label for adding new
                // Function to parse the input string into a genre object
                parseInput={(input) => ({ name: input.trim() })}
              />
            </div>
          )}
        />
        {errors.genres && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.genres.message as string} {/* Cast to string if needed */}
            </span>
          </label>
        )}
      </div>

      {/* Directors (Searchable Input with Add/Remove) */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Directors</span>
        </label>
        {/* Use Controller for react-hook-form integration */}
        <Controller
          name="directors"
          control={control}
          render={() => (
            <div>
              {/* Display currently selected directors */}
              <div className="flex flex-wrap gap-2 mb-2">
                {directorFields.map((director, index) => (
                  // Use directorFields from useFieldArray. Key can be director.id or combined name
                  <div
                    key={
                      director.id ||
                      `${director.firstName}-${director.lastName}`
                    }
                    className="badge badge-secondary gap-2"
                  >
                    {`${director.firstName} ${director.lastName}`}
                    <button
                      type="button"
                      className="btn btn-xs btn-circle btn-ghost"
                      onClick={() => handleRemoveDirector(index)}
                      aria-label={`Remove director ${director.firstName} ${director.lastName}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {/* Searchable input for adding new directors */}
              <SearchableInput
                label="" // Label is handled above
                placeholder="Search or add director (First Last)"
                value={null} // Always treat this input as for adding
                options={availableDirectors}
                onChange={(director) => handleAddDirector(director)} // Add selected/new director
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                getOptionValue={(option) =>
                  option.id || `${option.firstName}-${option.lastName}`
                }
                addNewLabel="Add new director:" // Custom label for adding new
                // Function to parse the input string into a director object
                parseInput={(input) => {
                  const [firstName, ...lastNameParts] = input.trim().split(" ");
                  return {
                    firstName: firstName || "",
                    lastName: lastNameParts.join(" ") || "",
                  };
                }}
              />
            </div>
          )}
        />
        {errors.directors && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.directors.message as string}{" "}
              {/* Cast to string if needed */}
            </span>
          </label>
        )}
      </div>

      {/* Form Actions */}
      <div className="modal-action">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <LuSave className="h-5 w-5 mr-2" />
          )}
          {movieToEdit ? "Update Movie" : "Add Movie"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <LuX className="h-5 w-5 mr-2" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
