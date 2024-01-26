import { Link } from "react-router-dom";
import "./Register.css";
import Button from "../components/Button";
import { useState } from "react";
import FormInput from "../components/FormInput";

const formInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter Username",
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Enter Password",
  },
  {
    id: 4,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleOnChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <section className="section">
      <div className="form-container">
        <div className="text-container">
          <h3>Create New Account</h3>
          <p>Welcome to MernAuth Create Account to Get Started</p>
        </div>
        <form className="form">
          {formInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={data[input.name]}
              onChange={handleOnChange}
            />
          ))}
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
