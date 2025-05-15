import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginModal from "./LoginModal"; // Import the new login modal component
import SignupModal from "./SignupModal"; // Import the new signup modal component

const Layout: React.FC = () => {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control login modal visibility
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State to control signup modal visibility

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, [location.pathname]);

  // Function to open the login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Function to open the signup modal
  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  // Function to close the signup modal
  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <>
      {/* Pass the openLoginModal function to the Navbar */}
      {/* Render ThemeSwitcher next to Navbar, not as a child */}
      <Navbar onLoginClick={openLoginModal} />
      <Outlet />
      {/* Render the LoginModal component */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSignupClick={openSignupModal} // Pass function to open signup modal
      />
      {/* Render the SignupModal component */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        onLoginClick={openLoginModal} // Pass function to open login modal
      />
    </>
  );
};

export default Layout;
