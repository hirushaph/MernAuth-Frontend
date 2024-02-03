import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Login.css";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import ErrorMsg from "../components/ErrorMsg";

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
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { login, isLoading, error, setError } = useLogin();

  const navigate = useNavigate();

  function handleOnChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.username || !data.password) {
      return setError("All fields are required");
    }
    /**
     * Login user and return errors (if any)
     * res = erros
     */
    const res = await login(data.username, data.password);

    if (!res) {
      console.log(error);
      navigate("/dashboard");
    } else {
      setError(res);
    }
  }
  return (
    <section className="section">
      <div className="form-container">
        <div className="text-container">
          <h3>Login to Account</h3>
          <p>Welcome Back to MernAuth </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && <ErrorMsg error={error} />}

          {loginInputs.map((input) => (
            <FormInput
              {...input}
              key={input.id}
              value={data[input.name]}
              onChange={handleOnChange}
            />
          ))}
          <Button disabled={isLoading} type="submit">
            Register
          </Button>
        </form>
        <div>
          <p className="form-footer">
            {`Don't have an account ?`} <Link to="/login">Register</Link>
          </p>
          <p className="reset-password form-footer">
            Forgot Password ? <Link to="/login">Reset Password</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
