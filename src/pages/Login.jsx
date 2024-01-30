import { Link } from "react-router-dom";
import Button from "../components/Button";
import "./Login.css";
import FormInput from "../components/FormInput";

const loginInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter Username",
    label: "Username",
  },
  {
    id: 2,
    name: "password",
    type: "text",
    placeholder: "Enter Password",
    label: "Email",
  },
];

function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="section">
      <div className="form-container">
        <div className="text-container">
          <h3>Login to Account</h3>
          <p>Welcome Back to MernAuth </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {loginInputs.map((input) => (
            <FormInput
              key={input.id}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              label={input.type}
            />
          ))}
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
