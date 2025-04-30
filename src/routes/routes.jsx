// src/routes/routes.jsx
import HomePage from "../pages/HomePage";
import UsersPage from "../pages/UsersPage";
import ItemsPage from "../pages/ItemsPage";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage/CartPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import UserPage from "../pages/UserPage";

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
  },{
    path: "/cart",
    element: <CartPage />,
    private: true,
  },{
    path: "/orders",
    element: <OrdersPage />,
    private: true,
  },{
    path: "/user",
    element: <UserPage />,
    private: true,
  },
];