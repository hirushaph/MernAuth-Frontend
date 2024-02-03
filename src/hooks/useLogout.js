import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  function logout() {
    // Remove user from localstorage
    localStorage.removeItem("user");

    // Dispatch logout action
    dispatch({ type: "account/logout" });
  }

  return { logout };
}
