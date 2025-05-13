import React, { useState, useEffect, useRef } from "react";
import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray,
} from "react-hook-form";
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
  onSuccess: (data: EditableMovieData) => Promise<void>;
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
    if (value && getOptionLabel(value) !== newValue) onChange(null);
    setShowSuggestions(true);
  };

  const handleOptionSelect = (option: T) => {
    setInputValue(getOptionLabel(option));
    onChange(option);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
      const input = inputValue.trim();
      if (input) {
        const existing = options.find(
          (o) => getOptionLabel(o).toLowerCase() === input.toLowerCase()
        );
        onChange(existing || parseInput(input));
      }
      setShowSuggestions(false);
    }
  };

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
              onMouseDown={() => handleOptionSelect(option)}
            >
              <span className="flex-1">{getOptionLabel(option)}</span>
            </button>
          ))}
          {inputValue.trim() && !filteredOptions.length && (
            <button
              type="button"
              className="w-full text-left p-3 hover:bg-primary/10 text-base-content italic flex items-center gap-2"
              onMouseDown={() => {
                onChange(parseInput(inputValue.trim()));
                setInputValue(inputValue.trim());
                setShowSuggestions(false);
              }}
            >
              <span className="flex-1">
                {addNewLabel} "{inputValue.trim()}"
              </span>
              <span className="badge badge-primary badge-sm">New</span>
            </button>
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
    try {
      await onSuccess(data);
    } catch {
      toast.error("Failed to save movie");
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
        appendGenre(genre);
      }
    }
  };

  const handleAddDirector = (
    director: { id?: string; firstName: string; lastName: string } | null
  ) => {
    if (director?.firstName || director?.lastName) {
      const exists = directorFields.some(
        (d) =>
          `${d.firstName} ${d.lastName}`.toLowerCase() ===
          `${director.firstName} ${director.lastName}`.toLowerCase()
      );
      if (exists) {
        toast.error(
          `Director "${director.firstName} ${director.lastName}" exists`
        );
      } else {
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
            <h3 className="text-lg font-semibold">Genres</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {genreFields.map((genre, index) => (
              <div
                key={genre.id}
                className="badge badge-primary badge-lg gap-2 p-4"
              >
                <span>{genre.name}</span>
                <button
                  type="button"
                  className="btn btn-circle btn-xs btn-ghost"
                  onClick={() => removeGenre(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <Controller
            name="genres"
            control={control}
            render={() => (
              <SearchableInput
                label="Add Genre"
                placeholder="Search or add genre..."
                value={null}
                options={availableGenres}
                onChange={handleAddGenre}
                getOptionLabel={(g) => g.name}
                getOptionValue={(g) => g.id || g.name}
                parseInput={(name) => ({ name })}
              />
            )}
          />
        </div>

        {/* Directors */}
        <div className="form-control md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Directors</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {directorFields.map((director, index) => (
              <div
                key={director.id}
                className="badge badge-secondary badge-lg gap-2 p-4"
              >
                <span>{`${director.firstName} ${director.lastName}`}</span>
                <button
                  type="button"
                  className="btn btn-circle btn-xs btn-ghost"
                  onClick={() => removeDirector(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <Controller
            name="directors"
            control={control}
            render={() => (
              <SearchableInput
                label="Add Director"
                placeholder="Search or add director..."
                value={null}
                options={availableDirectors}
                onChange={handleAddDirector}
                getOptionLabel={(d) => `${d.firstName} ${d.lastName}`}
                getOptionValue={(d) => d.id || `${d.firstName}-${d.lastName}`}
                parseInput={(input) => {
                  const [firstName, ...lastName] = input.split(" ");
                  return { firstName, lastName: lastName.join(" ") };
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="modal-action flex justify-end gap-4 mt-8">
        <button
          type="button"
          className="btn btn-outline btn-accent px-8"
          onClick={onCancel}
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
