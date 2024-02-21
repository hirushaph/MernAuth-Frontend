import { useState } from "react";
import axios from "../services/axios";

export function usePasswordReset() {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  async function resetPassword(username) {
    try {
      setIsLoading(true);
      setError(null);
      setMsg(null);
      const res = await axios.get(`/generateotp?username=${username}`);
      if (!res.status === 200) throw new Error("Internal server error");
      setMsg(res.data.msg);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  }

  return { isLoading, resetPassword, error, setError, msg };
}
