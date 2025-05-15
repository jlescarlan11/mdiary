import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { login } from "../auth"; // Assuming this exists and handles token storage
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuKeyRound, LuMail, LuUser } from "react-icons/lu";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void; // New prop to open the login modal from here
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  const [search] = useSearchParams();
  const inviteCodeParam = search.get("invite") || ""; // Get invite code from URL params

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: inviteCodeParam, // Initialize inviteCode from URL params
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null); // Ref for the modal element

  // Effect to show/hide the modal using the dialog element's methods
  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }
  }, [isOpen]);

  // Handle closing the modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Add a slight delay before adding the click outside listener
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // Adjust delay if needed

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      const signupUrl = import.meta.env.VITE_SIGNUP_URL;

      if (!signupUrl) {
        throw new Error("Missing SIGNUP_URL");
      }

      const res = await axios.post(signupUrl, formData);
      login(res.data.token);
      onClose(); // Close modal on successful signup
      navigate("/"); // Navigate to home page
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // DaisyUI modal structure
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box relative">
        {" "}
        {/* Added relative for close button positioning */}
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col flex-1 items-center bg-base-100 py-8 px-4">
          <form
            onSubmit={handleSubmit}
            className="card w-full max-w-md bg-base-100"
          >
            {" "}
            {/* Removed shadow and bg-base-200 from card as it's inside modal-box */}
            <div className="card-body px-0">
              {" "}
              {/* Adjusted padding */}
              <div className="flex flex-col justify-center mb-4 items-center">
                <h2 className="card-title font-semibold text-2xl">
                  Create New Account
                </h2>
                <p className="text-xs font-medium">It's quick and easy</p>
              </div>
              {error && (
                <div className="alert alert-error">
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
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              <div className="flex flex-col mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  {" "}
                  {/* Added DaisyUI classes */}
                  <LuUser className="opacity-50" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    required
                    pattern="[A-Za-z][A-Za-z ]*"
                    minLength={3}
                    maxLength={30}
                    className="grow" // Added grow
                  />
                </label>
                {/* Consider showing validator hints dynamically based on input validity */}
                <p className="text-xs text-gray-500 mt-1">
                  Must be 3 to 30 characters containing only letters or spaces
                </p>
              </div>
              <label className="input input-bordered flex items-center gap-2 mb-4 w-full">
                {" "}
                {/* Added DaisyUI classes */}
                <LuMail className="opacity-50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mail@site.com"
                  required
                  className="grow" // Added grow
                />
              </label>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  {" "}
                  {/* Added DaisyUI classes */}
                  <LuKeyRound className="opacity-50" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    minLength={8}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    className="grow" // Added grow
                  />
                </label>
                {/* Consider showing validator hints dynamically based on input validity */}
                <p className="text-xs text-gray-500 mt-1">
                  Must be more than 8 characters, including At least one number
                  At least one lowercase letter At least one uppercase letter
                </p>
              </div>
              <label className="input input-bordered flex items-center gap-2 mb-8 w-full">
                {" "}
                {/* Added DaisyUI classes */}
                <LuKeyRound className="opacity-50" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="grow" // Added grow
                />
              </label>
              {/* Hidden input for invite code */}
              <input
                type="hidden"
                name="inviteCode"
                value={formData.inviteCode}
              />
              <button
                type="submit"
                className={`btn btn-primary ${
                  isSubmitting ? "btn-disabled" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              <div className="divider my-8">OR</div>
              <div className="text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  {/* Use the onLoginClick prop to open the login modal */}
                  <button
                    type="button" // Use type="button" to prevent form submission
                    className="link link-primary font-semibold"
                    onClick={() => {
                      onClose(); // Close signup modal
                      onLoginClick(); // Open login modal
                    }}
                  >
                    Login here
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* This div acts as the modal backdrop, clicking it closes the modal */}
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>{" "}
        {/* This button is hidden but needed for the form method */}
      </form>
    </dialog>
  );
};

export default SignupModal;
