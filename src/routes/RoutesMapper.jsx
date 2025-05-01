// src/routes/RoutesMapper.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export default function RoutesMapper({ isAuthenticated }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const renderRouteElement = (route) => {
    const { element, path } = route;

    // if not authenticated allowed only  /auth
    if (!isAuthenticated) {
      return path === "/auth" ? element : <Navigate to="/auth" />;
    }

    // if authenticated but on /auth - redirect to home
    if (isAuthenticated && path === "/auth") {
      return <Navigate to="/" />;
    }

    // If path requires admin access
    const adminOnlyPaths = ["/users", "/items","/itemAdd"];
    if (adminOnlyPaths.includes(path) && user?.role !== "admin") {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={renderRouteElement(route)}
        />
      ))}
    </Routes>
  );
}
