// src/routes/RoutesMapper.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export default function RoutesMapper({ isAuthenticated }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const renderRouteElement = (route) => {
    const { element, private: isPrivate, path } = route;

    // Если неавторизован — пускаем только на /auth
    if (!isAuthenticated) {
      return path === "/auth" ? element : <Navigate to="/auth" />;
    }

    // Если авторизован, но это /auth — редиректим на главную
    if (isAuthenticated && path === "/auth") {
      return <Navigate to="/" />;
    }

    // Если путь требует админ-прав
    const adminOnlyPaths = ["/users", "/items"];
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
