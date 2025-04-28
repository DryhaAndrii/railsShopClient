// src/routes/routes.jsx
import HomePage from "../pages/HomePage";
import UsersPage from "../pages/UsersPage";
import ItemsPage from "../pages/ItemsPage";
import AuthPage from "../pages/AuthPage";

export const routes = [
  {
    path: "/auth",
    element: <AuthPage />,
    private: false,
  },
  {
    path: "/",
    element: <HomePage />,
    private: true,
  },
  {
    path: "/users",
    element: <UsersPage />,
    private: true,
  },
  {
    path: "/items",
    element: <ItemsPage />,
    private: true,
  },
];