// src/App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";

// Removed direct import of LogIn and Signup pages as they are now modals
// import LogIn from "./pages/LogIn";
// import Signup from "./pages/Signup"; // Removed direct import of Signup page

import { isAuthenticated } from "./auth"; // Assuming this exists
import Index from "./pages/Index";
import GenrePage from "./pages/Genre";
import DiscoverPage from "./pages/Discover";

// Import the updated Layout component
import Layout from "./components/Layout";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) =>
  isAuthenticated() ? (
    <>{children}</>
  ) : (
    <>
      {/* You might want to show the Index page or a different landing page */}
      <Index />
      {/* Optionally, you could automatically open the login modal here if the user tries to access a protected route */}
      {/* For this example, we'll just show the index page */}
    </>
  );

// Removed PublicRoute as the direct /login and /signup routes are no longer used
// const PublicRoute: React.FC<RouteProps> = ({ children }) =>
//   isAuthenticated() ? <Navigate to="/" /> : <>{children}</>;

const App: React.FC = () => {
  return (
    <Routes>
      {/* Use the updated Layout component */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        {/* Removed the direct /login and /signup routes */}
        {/* <Route
          path="/login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        /> */}
        {/* <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        /> */}
        <Route path="/genres" element={<GenrePage />} />
        <Route path="/genres/:genreName" element={<GenrePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
      </Route>
    </Routes>
  );
};

export default App;
