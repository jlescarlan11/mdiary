import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div data-theme="caramellatte">
      <div>Navbar</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
