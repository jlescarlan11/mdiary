import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { isAuthenticated, logout } from "../auth"; // Import isAuthenticated and logout
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PiFilmSlateFill } from "react-icons/pi";

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
          <a
            className="relative mansalva-regular btn btn-ghost text-4xl"
            style={{
              display: "inline-block",
              position: "relative",
              transform: "rotate(0.8deg)",
              transformOrigin: "center",
              backfaceVisibility: "hidden",
            }}
            href="/"
          >
            <span className="relative text-2xl mansalva-regular z-10 font-bold  text-base-content">
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  transform: "skew(0.85deg)",
                  transformOrigin: "center",
                  backfaceVisibility: "hidden",
                }}
              >
                T
              </span>
              <span
                className="-ml-[9.5px]"
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1px",
                  transform: "skew(0.85deg)",
                  transformOrigin: "center",
                  backfaceVisibility: "hidden",
                }}
              >
                a
              </span>
              <span
                className="-ml-[1.5px]"
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "0px",
                  transform: "skew(0.85deg)",
                  transformOrigin: "center",
                  backfaceVisibility: "hidden",
                }}
              >
                l
              </span>
              <span
                className="-ml-[3.5px]"
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1px",
                  transform: "skew(0.85deg)",
                  transformOrigin: "center",
                  backfaceVisibility: "hidden",
                }}
              >
                a
              </span>
              <span
                className="-ml-[1.5px]"
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1px",
                  transform: "skew(25.03deg) rotate(10deg)",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                r
              </span>
              <span
                className="-ml-[2.5px] text-shadow-[0.3px_0.3px_0] text-shadow-base-content text-base-100"
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1.2px",
                  zIndex: 10,
                  transform: "skew(0deg) rotate(1.85deg)",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                a
              </span>
              <span
                className="-ml-[12px] text-shadow-[0.3px_0.3px_0] text-shadow-neutral-content "
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1.25px",
                  zIndex: 20,
                  transform: "skew(0deg) rotate(1.85deg)",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                a
              </span>
              <span
                className="-ml-[1px] text-base-100 petit-formal-script-regular text-lg text-shadow-neutral-content"
                style={{
                  display: "inline-block",
                  position: "relative",
                  zIndex: 0,
                  top: "-3px",
                  transform: "skew(0deg) rotate(1.85deg)",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                m
              </span>
              <span
                className="-ml-[6px] text-shadow-[-0.3px_-0.3px_0] text-shadow-base-content text-base-100 "
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1.5px",
                  zIndex: 10,
                  transform: "skew(0deg) rotate(1.85deg)",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                a
              </span>
              <span
                className="-ml-[11.5px] text-shadow-[-0.3px_-0.3px_0] text-shadow-neutral-content "
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "-1px",
                  zIndex: 10,
                  transform: "skew(0deg) rotate(1.85deg)",
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                a
              </span>
            </span>

            <div
              className=" absolute"
              style={{ left: "55%", top: "5%", transform: "" }}
            >
              {/* Using the Film icon from lucide-react */}
              {/* Adjusting size and color */}

              <PiFilmSlateFill className=" fill-base size-8 stroke-base-content stroke-1" />
            </div>
            <div
              className=" absolute"
              style={{ left: "59.5%", top: "40%", transform: "" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
                className="w-[1.4rem] h-[0.85rem] fill-base-content stroke-base-100 stroke-[1]"
              >
                <rect width="100" height="50" />
              </svg>
            </div>
          </a>
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
