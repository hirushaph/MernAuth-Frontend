import axios from "../services/axios";

function useRefreshToken() {
  async function refresh() {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    const { token } = response.data;

    localStorage.setItem("token", token);
    return token;
  }

  return refresh;
}

export default useRefreshToken;
