import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { axiosPrivate } from "../services/axios";
import { useLogout } from "../hooks/useLogout";
import toast from "react-hot-toast";
import "./Dashboard.css";
import Spinner from "../components/Spinner";
import UserInfo from "../components/UserInfo";
import UpdateUser from "../components/UpdateUser";

function Dashboard() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        const res = await axiosPrivate.get(`/user/${user}`);
        console.log("fetched");
        setUserData((data) => ({ ...data, ...res.data }));

        setIsLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
        logout();
      }
    }

    getUser();
  }, [user, logout]);

  return (
    <section className="profile-section">
      <div className="column">
        {isloading ? <Spinner /> : <UserInfo userData={userData} />}
      </div>
      <div className="column">
        {isloading ? (
          <Spinner />
        ) : (
          <UpdateUser userData={userData} setUserData={setUserData} />
        )}
      </div>
    </section>
  );
}

export default Dashboard;
