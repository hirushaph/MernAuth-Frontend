import toast from "react-hot-toast";
import { axiosPrivate } from "../services/axios";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  async function logout() {
    try {
      // Remove http-only refresh token
      await axiosPrivate.post("/logout");

      // Remove user from localstorage
      localStorage.removeItem("user");

      // Dispatch logout action
      dispatch({ type: "account/logout" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return { logout };
}
