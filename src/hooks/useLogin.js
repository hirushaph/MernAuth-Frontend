import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(username, password) {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(json.error || json.errors);
      }

      if (res.ok) {
        // Save user to local storage
        localStorage.setItem("user", json.username);
        localStorage.setItem("token", json.token);

        // Update Authcontext
        dispatch({ type: "account/login", payload: json.username });

        setIsLoading(false);
        toast.success("Login Successfully");
      }

      return json.error || json.errors;
    } catch (error) {
      setIsLoading(false);
      return "Internal Server Error";
    }
  }

  return { login, isLoading, error, setError };
}
