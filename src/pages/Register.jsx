import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import Button from '../components/Button';
import { useState } from 'react';
import FormInput from '../components/FormInput';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validation';
import { useSignup } from '../hooks/useSignup';
import ErrorMsg from '../components/ErrorMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const formInputs = [
  {
    id: 1,
    name: 'username',
    type: 'text',
    placeholder: 'Enter Username',
    label: 'Username',
  },
  {
    id: 2,
    name: 'email',
    type: 'text',
    placeholder: 'Enter Email',
    label: 'Email',
  },
  {
    id: 3,
    name: 'password',
    type: 'password',
    placeholder: 'Enter Password',
    label: 'Password',
  },
  {
    id: 4,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    label: 'Confirm Password',
  },
];

function Register() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signup, isLoading, error, setError } = useSignup();

  const navigate = useNavigate();

  function handleOnChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError('');

    switch (e.target.name) {
      case 'username':
        setErrors({ ...errors, username: validateUsername(value) });
        break;
      case 'email':
        setErrors({ ...errors, email: validateEmail(value) });
        break;
      case 'password':
        setErrors({
          ...errors,
          password: validatePassword(value, data.confirmPassword, name),
          confirmPassword:
            value !== data.confirmPassword && data.confirmPassword
              ? 'Password does not match'
              : '',
        });

        break;
      case 'confirmPassword':
        setErrors({
          ...errors,
          confirmPassword: validatePassword(data.password, value, name),
        });
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      errors.username ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      console.log('Error');
      return;
    }

    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      return setError('All fields are required');
    }

    const res = await signup(
      data.username,
      data.email,
      data.password,
      data.confirmPassword
    );

    if (!res) {
      navigate('/dashboard');
    } else {
      setError(res);
    }
  }

  return (
    <section className='section'>
      <div className='form-container'>
        <div className='text-container'>
          <h3>Create New Account</h3>
          <p>Welcome to MernAuth Create Account to Get Started</p>
        </div>

        <form className='form' onSubmit={handleSubmit}>
          {error && <ErrorMsg error={error} />}

          {formInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={data[input.name]}
              onChange={handleOnChange}
              errors={errors}
            />
          ))}

          <Button disabled={isLoading} color='secondary' type='submit'>
            {isLoading ? (
              <FontAwesomeIcon icon='circle-notch' spin />
            ) : (
              'Register'
            )}
          </Button>
        </form>
        <p className='form-footer form-footer-register'>
          Already have an account? <Link to='/login'>Login</Link>{' '}
        </p>
      </div>
    </section>
  );
}

export default Register;
