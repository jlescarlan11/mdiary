import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/SignUp";
import { isAuthenticated } from "./auth";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={"/login"} />;
};

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
};

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
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
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* <Route
        path="/signup"
        element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />}
      />
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LogIn />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
      /> */}
    </Routes>
  );
}

export default App;
