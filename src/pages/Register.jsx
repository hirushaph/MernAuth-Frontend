import { Link } from "react-router-dom";
import "./Register.css";
import Button from "../components/Button";
import { useState } from "react";
import FormInput from "../components/FormInput";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validation";

const formInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter Username",
    label: "Username",
  },
  {
    id: 2,
    name: "email",
    type: "text",
    placeholder: "Enter Email",
    label: "Email",
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    label: "Password",
  },
  {
    id: 4,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
  },
];

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleOnChange(e) {
    e.preventDefault();
    const { type, name, value } = e.target;

    setData({ ...data, [name]: value });

    switch (e.target.name) {
      case "username":
        setErrors({ ...errors, username: validateUsername(value) });
        break;
      case "email":
        setErrors({ ...errors, email: validateEmail(value) });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value, data.confirmPassword, name),
          confirmPassword:
            value !== data.confirmPassword && data.confirmPassword
              ? "Password does not match"
              : "",
        });

        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          confirmPassword: validatePassword(data.password, value, name),
        });
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErros = {};
    setData({ ...data, [e.target.name]: e.target.value });

    console.log(validationErros);
  }

  return (
    <section className="section">
      <div className="form-container">
        <div className="text-container">
          <h3>Create New Account</h3>
          <p>Welcome to MernAuth Create Account to Get Started</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {formInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={data[input.name]}
              onChange={handleOnChange}
              errors={errors}
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
