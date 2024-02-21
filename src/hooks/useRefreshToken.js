import axios from "../services/axios";

function useRefreshToken() {
  async function refresh() {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    const { token } = response.data;

    // Get localstorage user object
    const user = JSON.parse(localStorage.getItem("user"));
    user.token = token;

    localStorage.setItem("user", JSON.stringify(user));
    return token;
  }

  return refresh;
}

export default useRefreshToken;
