import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  const { user } = useAuthContext();
  return (
    <header className="main-header">
      <div className="container">
        <h3 className="brand">MernAuth</h3>
        <nav className="nav-menu">
          <ul>
            {user && <li>{user}</li>}
            {!user && (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
