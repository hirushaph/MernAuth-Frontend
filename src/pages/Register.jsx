import { Link } from "react-router-dom";
import "./Register.css";
import Button from "../components/Button";

function Register() {
  return (
    <section className="section">
      <div className="form-container">
        <div className="text-container">
          <h3>Create New Account</h3>
          <p>Welcome to MernAuth Create Account to Get Started</p>
        </div>
        <form className="form">
          <input
            type="text"
            className="input"
            name="username"
            placeholder="Enter username "
          />
          <input
            type="email"
            className="input"
            name="emil"
            placeholder="Enter email "
          />
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Enter password "
          />
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Confirm password "
          />
          <Button type="submit">Register</Button>
        </form>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </section>
  );
}

export default Register;
