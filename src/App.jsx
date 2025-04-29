import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Toaster from "./components/toaster/toaster";
import useCheckAuth from "./hooks/useCheckAuth";
import { LoadingProvider } from "./contexts/Loading.Context";
import Loading from "./components/loading/loading";
import Header from "./components/header/header";
import RoutesMapper from "./routes/RoutesMapper";

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
          <Header />
          <div className="container">
            <RoutesMapper isAuthenticated={isAuthenticated} />
          </div>
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
