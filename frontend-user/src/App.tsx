// src/App.tsx
import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import LogIn from "./pages/LogIn";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./auth";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Index from "./pages/Index";
import GenrePage from "./pages/Genre";
import DiscoverPage from "./pages/Discover";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) =>
  isAuthenticated() ? (
    <>{children}</>
  ) : (
    <>
      <Index />
    </>
  );

const PublicRoute: React.FC<RouteProps> = ({ children }) =>
  isAuthenticated() ? <Navigate to="/" /> : <>{children}</>;

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, [location.pathname]);

  return (
    <>
      <Navbar>
        <ThemeSwitcher />
      </Navbar>
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />
        <Route path="/genres" element={<GenrePage />} />
        <Route path="/genres/:genreName" element={<GenrePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
      </Route>
    </Routes>
  );
};

export default App;
