import { Link } from "react-router-dom";
import Button from "../components/Button";
import "./Login.css";

function Login() {
  return (
    <section className="section">
      <div className="form-container">
        <div className="text-container">
          <h3>Login to Account</h3>
          <p>Welcome Back to MernAuth </p>
        </div>
        <form className="form">
          <input
            type="text"
            className="input"
            name="username"
            placeholder="Enter username "
          />

          <input
            type="password"
            className="input"
            name="password"
            placeholder="Enter password "
          />
          <Button type="submit">Register</Button>
        </form>
        <div>
          <p className="form-footer">
            Don't have an account ? <Link to="/login">Register</Link>{" "}
          </p>
          <p className="reset-password form-footer">
            Forgot Password ? <Link to="/login">Reset Password</Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
