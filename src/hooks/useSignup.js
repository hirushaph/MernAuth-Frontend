import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export function useSignup() {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function signup(username, email, password, confirmPassword) {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const json = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(json.error || json.errors);
      }

      if (res.ok) {
        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // Update Authcontext
        dispatch({ type: "account/login", payload: json });

        setIsLoading(false);
        toast.success("Register Successfully");
      }

      return json.error || json.errors;
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred during signup.");
    }
  }

  return { signup, isLoading, error };
}
