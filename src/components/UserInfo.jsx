import { formatDate } from "../utils/helpers";
import "./UserInfo.css";

function UserInfo({ userData }) {
  return (
    <div className="userinfo">
      <h4>Hello {userData.username}</h4>
      <div className="profile-image"></div>
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Username</td>
            <td>{userData.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <td>Last Login</td>
            <td>{formatDate(userData.last_login)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserInfo;
