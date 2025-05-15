import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container max-w-7xl mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MovieDiary</a>
        </div>
        <div className="flex-none flex">
          <ul className="menu menu-horizontal px-1 flex items-center gap-4">
            <ThemeSwitcher />
            <li>
              <button className="btn btn-outline">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
