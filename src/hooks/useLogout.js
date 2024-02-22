import toast from "react-hot-toast";
import { axiosPrivate } from "../services/axios";
import { useAuthContext } from "./useAuthContext";
import { useCallback } from "react";

export function useLogout(msg) {
  const { dispatch } = useAuthContext();
  console.log(msg);

  const logout = useCallback(async () => {
    try {
      // Remove http-only refresh token
      await axiosPrivate.post("/logout");

      // Remove user from localstorage
      localStorage.removeItem("user");

      // Dispatch logout action
      dispatch({ type: "account/logout" });
      toast(msg || "Logged Out", {
        icon: "⛔",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [dispatch, msg]);

  return { logout };
}
