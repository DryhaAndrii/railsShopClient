import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/authPage";
import HomePage from "./pages/HomePage";
import Toaster from "./components/toaster/toaster";
import useCheckAuth from "./hooks/useCheckAuth";
import { LoadingProvider } from "./contexts/Loading.Context";
import Loading from "./components/loading/loading";

function App() {
  const isAuthenticated = useCheckAuth();

  if (isAuthenticated === null) {
    return <Loading isLoading={true} />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <LoadingProvider>
          <Toaster />
          <Routes>
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
            />
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />}
            />
          </Routes>
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
