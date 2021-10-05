import { useCallback, useState } from "react";
const URL = process.env.REACT_APP_SERVER_HOST;

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }
      const response = await fetch(`${URL}${url}`, { method, body, headers });
      console.log(response);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);
  const clearError = useCallback(() => setError(null), []);
  return { loading, error, request, clearError };
};
