// src/App.tsx
import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./auth";

import Movies from "./pages/Movies";
import UserManagement from "./pages/UserManagement";
// Sidebar is removed as per previous request

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;

const PublicRoute: React.FC<RouteProps> = ({ children }) =>
  isAuthenticated() ? <Navigate to="/dashboard" replace /> : <>{children}</>;

// Layout component - Simplified as sidebar is removed
const Layout: React.FC = () => {
  const location = useLocation();
  // Hide navbar on login/signup pages
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, [location.pathname]);

  if (hideLayout) {
    return <Outlet />; // Render only the content for login/signup
  }

  return (
    // Main layout container - flex-col by default, no need for md:flex-row as sidebar is gone
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      {isAuthenticated() && ( // Show navbar only on protected routes
        <Navbar />
      )}

      {/* Page content - add responsive padding */}
      {/* The padding is applied in the individual page components (Dashboard, Movies, UserManagement) */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    // Removed container and max-w-7xl here.
    // The layout and max-width should be managed within the main content areas of each page
    // to allow the navbar and potentially full-width elements to span the viewport.
    <div className="min-h-screen">
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root to login or dashboard based on auth status */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LogIn />
              </PublicRoute>
            }
          />
          {/* Add a signup route placeholder if needed */}
          {/* <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} /> */}

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          {/* Add other protected admin routes here */}
          {/* <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} /> */}
          {/* <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} /> */}
          {/* <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
