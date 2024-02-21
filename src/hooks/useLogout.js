import toast from "react-hot-toast";
import { axiosPrivate } from "../services/axios";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  async function logout() {
    try {
      // Remove user from localstorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Remove http cookie
      const res = await axiosPrivate.post("/logout");
      console.log(res);

      // Dispatch logout action
      dispatch({ type: "account/logout" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return { logout };
}
