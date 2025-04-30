import { useEffect, useState } from "react";
import { useEndpoints } from "../endpoints";
import toast from "react-hot-toast";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { checkTokenEndpoint } = useEndpoints();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const response = await fetch(checkTokenEndpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        toast.error("Server error during authentication check:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [checkTokenEndpoint]);

  return isAuthenticated;
}
