import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated, logout } from "../auth"; // Import isAuthenticated and logout
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface NavbarProps {
  onLoginClick: () => void; // Function to call when login button is clicked
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle logout logic
  const handleLogout = () => {
    logout(); // Call your logout function
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container max-w-7xl mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Talarama</a>
        </div>
        <div className="flex-none flex">
          <ul className="menu menu-horizontal px-1 flex items-center gap-4">
            <ThemeSwitcher />
            <li>
              {/* Conditionally render Login or Logout button */}
              {isAuthenticated() ? (
                <button className="btn btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-outline" onClick={onLoginClick}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
