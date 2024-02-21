import { useState } from "react";
import axios from "../services/axios";

export function useVerifyOtp() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function verifyOtp(otp) {
    try {
      setIsLoading(true);
      const res = await axios.post("/verifyotp", { otp });
      setIsLoading(false);
      if (res.status === 200) return true;
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }

  return { verifyOtp, setError, error, isLoading };
}
