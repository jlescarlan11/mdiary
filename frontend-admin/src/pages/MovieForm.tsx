import React, { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { LuSave, LuX } from "react-icons/lu";
import { toast } from "react-hot-toast";

export interface EditableMovieData {
  id?: string;
  title: string;
  year: number;
  duration: number;
  description: string;
  posterUrl: string;
  genres: { id?: string; name: string }[];
  directors: { id?: string; firstName: string; lastName: string }[];
}

interface MovieFormProps {
  movieToEdit: EditableMovieData | null;
  // onSuccess is called when the form submission is successful (after API call)
  // The modal parent component is responsible for refreshing data after onSuccess
  onSuccess: (data: EditableMovieData) => Promise<void>;
  // onCancel is called when the user cancels the form (e.g., clicks Cancel button)
  // The modal parent component is responsible for closing the modal after onCancel
  onCancel: () => void;
  availableGenres: { id?: string; name: string }[];
  availableDirectors: { id?: string; firstName: string; lastName: string }[];
}

interface SearchableInputProps<T> {
  label: string;
  placeholder: string;
  value: T | null;
  options: T[];
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  addNewLabel?: string;
  parseInput: (input: string) => T;
}

const SearchableInput = <T,>({
  label,
  placeholder,
  value,
  options,
  onChange,
  getOptionLabel,
  getOptionValue,
  addNewLabel = "Add new",
  parseInput,
}: SearchableInputProps<T>) => {
  const [inputValue, setInputValue] = useState(
    value ? getOptionLabel(value) : ""
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value ? getOptionLabel(value) : "");
  }, [value, getOptionLabel]);

  useEffect(() => {
    const lowerCaseInput = inputValue.toLowerCase();
    setFilteredOptions(
      options.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(lowerCaseInput)
      )
    );
  }, [inputValue, options, getOptionLabel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // If the input value changes and it no longer matches the current value's label, clear the value
    if (value && getOptionLabel(value) !== newValue) onChange(null);
    setShowSuggestions(true);
  };

  const handleOptionSelect = (option: T) => {
    setInputValue(getOptionLabel(option));
    onChange(option);
    setShowSuggestions(false);
    inputRef.current?.focus(); // Keep focus on input after selection
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Use a small timeout to allow click events on suggestions to register before closing
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        const input = inputValue.trim();
        if (input) {
          // Check if the trimmed input matches an existing option (case-insensitive)
          const existing = options.find(
            (o) => getOptionLabel(o).toLowerCase() === input.toLowerCase()
          );
          // If no existing option matches, parse the input as a new value
          if (!existing) {
            onChange(parseInput(input));
          } else if (
            !value ||
            getOptionValue(value) !== getOptionValue(existing)
          ) {
            // If an existing option matches, and it's different from the current value, select it
            onChange(existing);
          }
          // If an existing option matches and it's the same as the current value, do nothing
        } else {
          // If input is empty, clear the value
          onChange(null);
        }
        setShowSuggestions(false);
      }
    }, 100); // Small delay to allow click events
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="form-control w-full relative">
      <label className="label">
        <span className="label-text font-medium text-base-content">
          {label}
        </span>
      </label>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full input-primary focus:ring-2 focus:ring-primary"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
      />
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-2 w-full bg-base-100 border-2 border-primary rounded-lg shadow-xl max-h-48 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <button
              key={getOptionValue(option) || index}
              type="button"
              className="w-full text-left p-3 hover:bg-primary/10 text-base-content flex items-center gap-2"
              // Use onMouseDown to trigger before onBlur
              onMouseDown={() => handleOptionSelect(option)}
            >
              <span className="flex-1">{getOptionLabel(option)}</span>
            </button>
          ))}
          {/* Option to add new if input doesn't match existing and is not empty */}
          {inputValue.trim() &&
            !filteredOptions.some(
              (option) =>
                getOptionLabel(option).toLowerCase() ===
                inputValue.trim().toLowerCase()
            ) && (
              <button
                type="button"
                className="w-full text-left p-3 hover:bg-primary/10 text-base-content italic flex items-center gap-2"
                onMouseDown={() => {
                  // Use onMouseDown
                  onChange(parseInput(inputValue.trim()));
                  setInputValue(inputValue.trim()); // Keep the input value as is
                  setShowSuggestions(false);
                }}
              >
                <span className="flex-1">
                  {addNewLabel} "{inputValue.trim()}"
                </span>
                <span className="badge badge-primary badge-sm">New</span>
              </button>
            )}
          {/* If input is empty and no options, maybe show a message or nothing */}
          {!inputValue.trim() && options.length > 0 && (
            <div className="p-3 text-base-content italic">
              Start typing to see suggestions...
            </div>
          )}
          {!inputValue.trim() && options.length === 0 && (
            <div className="p-3 text-base-content italic">
              No existing options. Type to add a new one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MovieForm: React.FC<MovieFormProps> = ({
  movieToEdit,
  onSuccess, // This prop is onSubmitFromForm from MovieFormModal
  onCancel, // This prop is handleCloseProp from MovieFormModal
  availableGenres,
  availableDirectors,
}) => {
  const { control, handleSubmit, register, reset, formState } =
    useForm<EditableMovieData>({
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

  const {
    fields: genreFields,
    append: appendGenre,
    remove: removeGenre,
  } = useFieldArray({ control, name: "genres" });
  const {
    fields: directorFields,
    append: appendDirector,
    remove: removeDirector,
  } = useFieldArray({ control, name: "directors" });

  // Reset form when movieToEdit changes (for editing) or when modal is closed/opened
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

  // This onSubmit is called by react-hook-form's handleSubmit
  // It calls the onSuccess prop passed from MovieFormModal (which is onSubmitFromForm)
  const onSubmit: SubmitHandler<EditableMovieData> = async (data) => {
    try {
      await onSuccess(data); // Call the parent's submit handler (onSubmitFromForm)
      // The modal will be closed by the parent's handler after this promise settles
    } catch (error) {
      // Error handling and toast are handled in the parent (onSubmitFromForm)
      console.error("Error in MovieForm onSubmit:", error);
      // Re-throw the error so it's caught by the parent's try/catch
      throw error;
    }
  };

  const handleAddGenre = (genre: { id?: string; name: string } | null) => {
    if (genre?.name) {
      const exists = genreFields.some(
        (g) => g.name.toLowerCase() === genre.name.toLowerCase()
      );
      if (exists) {
        toast.error(`Genre "${genre.name}" already exists`);
      } else {
        // Append the new genre object
        appendGenre(genre);
      }
    }
  };

  const handleAddDirector = (
    director: { id?: string; firstName: string; lastName: string } | null
  ) => {
    // Ensure both first name or last name are present for a valid director entry
    if (director?.firstName || director?.lastName) {
      const fullName = `${director.firstName || ""} ${
        director.lastName || ""
      }`.trim();
      if (!fullName) {
        toast.error("Director name cannot be empty.");
        return;
      }

      const exists = directorFields.some(
        (d) =>
          `${d.firstName || ""} ${d.lastName || ""}`.trim().toLowerCase() ===
          fullName.toLowerCase()
      );
      if (exists) {
        toast.error(`Director "${fullName}" already exists`);
      } else {
        // Append the new director object
        appendDirector(director);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-base-100 rounded-xl shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-lg">Title</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter movie title"
            className="input input-primary input-bordered focus:ring-2 focus:ring-primary"
          />
          {formState.errors.title && (
            <span className="text-error text-sm mt-1">
              {formState.errors.title.message}
            </span>
          )}
        </div>

        {/* Year & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">Year</span>
            </label>
            <input
              {...register("year", {
                required: "Year is required",
                min: { value: 1888, message: "First movie was made in 1888" },
                max: {
                  value: new Date().getFullYear() + 2,
                  message: "Cannot be more than 2 years in future",
                },
                valueAsNumber: true, // Ensure year is treated as a number
              })}
              type="number"
              className="input input-primary input-bordered focus:ring-2 focus:ring-primary"
            />
            {formState.errors.year && (
              <span className="text-error text-sm mt-1">
                {formState.errors.year.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                Duration (min)
              </span>
            </label>
            <input
              {...register("duration", {
                required: "Duration is required",
                min: { value: 1, message: "Minimum 1 minute" },
                valueAsNumber: true, // Ensure duration is treated as a number
              })}
              type="number"
              className="input input-primary input-bordered focus:ring-2 focus:ring-primary"
            />
            {formState.errors.duration && (
              <span className="text-error text-sm mt-1">
                {formState.errors.duration.message}
              </span>
            )}
          </div>
        </div>

        {/* Poster URL */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-semibold text-lg">Poster URL</span>
          </label>
          <input
            {...register("posterUrl", {
              required: "Poster URL is required",
              pattern: {
                value: /^(https?):\/\/[^\s$.?#].[^\s]*$/i,
                message: "Invalid URL format",
              },
            })}
            type="url"
            placeholder="https://example.com/poster.jpg"
            className="input input-primary input-bordered focus:ring-2 focus:ring-primary"
          />
          {formState.errors.posterUrl && (
            <span className="text-error text-sm mt-1">
              {formState.errors.posterUrl.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text font-semibold text-lg">
              Description
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-primary textarea-bordered h-32 focus:ring-2 focus:ring-primary"
            placeholder="Enter movie description"
          />
          {formState.errors.description && (
            <span className="text-error text-sm mt-1">
              {formState.errors.description.message}
            </span>
          )}
        </div>

        {/* Genres */}
        <div className="form-control md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-base-content">Genres</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {genreFields.map((genre, index) => (
              <div
                key={genre.id || `genre-${index}`} // Use index as fallback key if id is missing
                className="badge badge-primary badge-lg gap-2 p-4"
              >
                <span>{genre.name}</span>
                <button
                  type="button"
                  className="btn btn-circle btn-xs btn-ghost text-base-content"
                  onClick={() => removeGenre(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {/* Removed Controller as it's not needed for this use case */}
          <SearchableInput
            label="Add Genre"
            placeholder="Search or add genre..."
            value={null} // SearchableInput manages its own input value
            options={availableGenres}
            onChange={handleAddGenre} // Call handleAddGenre when an option is selected or a new one is parsed
            getOptionLabel={(g) => g.name}
            getOptionValue={(g) => g.id || g.name}
            parseInput={(name) => ({ name })} // Function to create a new genre object from input string
          />
        </div>

        {/* Directors */}
        <div className="form-control md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-base-content">
              Directors
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {directorFields.map((director, index) => (
              <div
                key={director.id || `director-${index}`} // Use index as fallback key
                className="badge badge-secondary badge-lg gap-2 p-4"
              >
                <span>{`${director.firstName} ${director.lastName}`}</span>
                <button
                  type="button"
                  className="btn btn-circle btn-xs btn-ghost text-base-content"
                  onClick={() => removeDirector(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {/* Removed Controller as it's not needed for this use case */}
          <SearchableInput
            label="Add Director"
            placeholder="Search or add director..."
            value={null} // SearchableInput manages its own input value
            options={availableDirectors}
            onChange={handleAddDirector} // Call handleAddDirector
            getOptionLabel={(d) => `${d.firstName} ${d.lastName}`}
            getOptionValue={(d) => d.id || `${d.firstName}-${d.lastName}`}
            // Function to create a new director object from input string
            parseInput={(input) => {
              const parts = input.trim().split(" ");
              const firstName = parts[0] || "";
              const lastName = parts.slice(1).join(" ") || "";
              // Return object with firstName and lastName
              return { firstName, lastName };
            }}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="modal-action flex justify-end gap-4 mt-8">
        <button
          type="button"
          className="btn btn-outline btn-accent px-8"
          onClick={onCancel} // Call the onCancel prop from the parent
        >
          <LuX className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary px-8"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <span className="loading loading-spinner" />
          ) : (
            <>
              <LuSave className="mr-2" />
              {movieToEdit ? "Update Movie" : "Add Movie"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
