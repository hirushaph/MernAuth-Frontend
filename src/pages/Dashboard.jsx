import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { axiosPrivate } from "../services/axios";
import { useLogout } from "../hooks/useLogout";
import toast from "react-hot-toast";

function Dashboard() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  useEffect(() => {
    async function getUser() {
      try {
        await axiosPrivate.get(`/user/${user}`);
      } catch (error) {
        toast.error(error.response.data.message);
        return logout();
      }
    }

    getUser();
  }, [logout, user]);
  return <div>MernAuth Dashboard</div>;
}

export default Dashboard;
