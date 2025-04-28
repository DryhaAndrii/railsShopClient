// src/routes/RoutesMapper.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export default function RoutesMapper({ isAuthenticated }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const renderRouteElement = (route) => {
    const { element, private: isPrivate, path } = route;

    if (!isAuthenticated) return path === "/auth" ? element : <Navigate to="/auth" />;

    if (isAuthenticated) return path === "/auth" ? <Navigate to="/" /> : element;

    if (user?.role === "admin") return element;

    if (path === "/") return element;

    return <Navigate to="/" />;
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
