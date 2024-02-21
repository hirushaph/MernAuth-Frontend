import { useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function changePassword(password, confirmPassword) {
    setIsLoading(true);
    try {
      const res = await axios.put("/resetpassword", {
        password: password,
        confirmpassword: confirmPassword,
      });

      if (res.status === 200)
        navigate("/login", {
          state: {
            message: "Password reset successfull, Please login to your account",
          },
        });
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return { changePassword, isLoading, error, setError };
}
