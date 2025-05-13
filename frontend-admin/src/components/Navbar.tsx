// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logout, isAuthenticated } from "../auth";
// Import LuPalette icon
import {
  LuLayoutDashboard,
  LuFilm,
  LuUsers,
  LuMenu,
  LuPalette,
} from "react-icons/lu";

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location to highlight active link

  // State and effect for integrated Theme Changer
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // List of DaisyUI themes (you can expand this list)
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    // Close the drawer when logout is clicked
    const checkbox = document.getElementById("my-drawer-4") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  // Only show the Navbar content if the user is authenticated
  if (!isAuthenticated()) {
    return null; // Don't render navbar on public routes handled by Layout
  }

  // Define navigation links with icons
  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
    { path: "/movies", label: "Movie Entries", icon: LuFilm },
    { path: "/user", label: "User Management", icon: LuUsers },
  ];

  return (
    // Use DaisyUI's drawer component structure
    <div className=" drawer drawer-end z-50 shadow-md bg-base-100  border-b border-base-300">
      <div className="container max-w-7xl mx-auto">
        {" "}
        {/* drawer-end makes it slide from the right */}
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          {/* Navbar is now inside the drawer-content */}
          <div className="navbar px-4 md:px-6">
            {/* Left section: Logo and Title */}
            <div className="navbar-start">
              <div className="text-xl flex items-center gap-2 md:gap-4">
                <LuFilm className="text-primary h-6 w-6" />{" "}
                {/* Increased icon size slightly */}
                <Link
                  to="/dashboard"
                  className="btn btn-ghost text-base-content text-lg md:text-xl normal-case"
                >
                  {" "}
                  {/* Use Link for title, normal-case to prevent uppercase */}
                  CineLog Admin
                </Link>
              </div>
            </div>

            {/* Center section: This section is now empty as navigation moves to navbar-end */}
            <div className="navbar-center hidden lg:flex">
              {/* Navigation links are now in navbar-end for larger screens */}
              <ul className="menu menu-horizontal px-1 space-x-1 hidden lg:flex">
                {" "}
                {/* Show only on lg+ screens */}
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`btn btn-ghost ${
                          isActive
                            ? "active bg-primary text-primary-content"
                            : "text-base-content hover:bg-base-200"
                        }`}
                        aria-label={link.label}
                        title={link.label} // Tooltip for consistency, though text is visible
                      >
                        {/* Display full label text */}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right section: Navigation, Theme Switcher, and Logout */}
            {/* Added flex and gap for layout and spacing */}
            <div className="navbar-end flex items-center space-x-2 md:space-x-4 lg:space-x-6">
              {" "}
              {/* Increased space-x for lg */}
              {/* Navigation Links (visible on large screens) */}
              {/* Moved navigation links here and display full label */}
              {/* Integrated Theme Changer (visible on ALL screens) */}
              <div
                className="dropdown dropdown-end tooltip tooltip-bottom"
                data-tip="Change Theme"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-base-content btn-circle"
                >
                  <LuPalette className="h-6 w-6" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto"
                >
                  {/* Added Theme title */}
                  <li className="menu-title text-base-content">Theme</li>
                  {themes.map((t) => (
                    // Apply 'active' class to the list item based on current theme
                    // This is the standard DaisyUI approach for highlighting menu items
                    <li
                      key={t}
                      className={
                        theme === t ? "bg-primary text-primary-content" : ""
                      }
                    >
                      <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
                        value={t}
                        checked={theme === t}
                        onChange={(e) => setTheme(e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {/* Logout Button (visible on large screens) */}
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline btn-error hidden lg:inline-flex"
              >
                {" "}
                {/* Show only on lg+ screens */}
                Logout
              </button>
              {/* Hamburger Button (visible on small/medium screens) */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost btn-circle lg:hidden"
              >
                {" "}
                {/* Show only on lg- screens */}
                <LuMenu className="h-5 w-5" /> {/* Hamburger icon */}
              </label>
            </div>
          </div>
          {/* Rest of your page content goes here, after the navbar */}
          {/* In App.tsx, the <Outlet /> will render here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li className="menu-title">Admin Navigation</li>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "hover:bg-base-300"
                    }`}
                    onClick={() => {
                      // Close the drawer when a link is clicked
                      const checkbox = document.getElementById(
                        "my-drawer-4"
                      ) as HTMLInputElement;
                      if (checkbox) {
                        checkbox.checked = false;
                      }
                    }}
                  >
                    <link.icon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary-content" : "text-primary"
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
            {/* Horizontal line separator */}
            <div className="divider my-4"></div> {/* DaisyUI divider */}
            {/* Logout Button in Drawer */}
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
