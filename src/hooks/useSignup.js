import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";
import { axiosPrivate } from "../services/axios";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function signup(username, email, password, confirmPassword) {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axiosPrivate.post("/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      const resData = res.data;
      // Save user to local storage
      const data = JSON.stringify({
        username: resData.username,
        token: resData.token,
      });
      localStorage.setItem("user", data);

      // Update Authcontext
      dispatch({ type: "account/login", payload: resData.username });

      setIsLoading(false);
      toast.success("Register Successfully");
    } catch (error) {
      setIsLoading(false);
      const errorMessages = error?.response?.data?.errors;
      setError(errorMessages);
      return errorMessages || "Internal Server Error";
    }
  }

  return { signup, isLoading, error, setError };
}
