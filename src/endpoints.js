const apiUrl = import.meta.env.VITE_API_URL;
export function useEndpoints() {
  return {
    signupEndpoint: `${apiUrl}/signup`,
    signinEndpoint: `${apiUrl}/login`,
    checkTokenEndpoint: `${apiUrl}/api/v1/validate_token`,
  };
}
