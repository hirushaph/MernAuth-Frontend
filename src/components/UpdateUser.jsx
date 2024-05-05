import { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';
import { axiosPrivate } from '../services/axios';
import validator from 'validator';
import ErrorMsg from './ErrorMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { useLogout } from '../hooks/useLogout';

function UpdateUser({ userData, setUserData }) {
  const { logout } = useLogout();
  const [data, setData] = useState({
    username: userData.username,
    email: userData.email,
    password: '',
  });
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      type: 'text',
      placeholder: 'Enter New Password',
      label: 'Password',
    },
  ];

  function handleOnChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      data.username === userData.username &&
      data.email === userData.email &&
      data.password === ''
    )
      return;

    try {
      setIsLoading(true);
      let userinfo = {};
      let isUserChanged = false;

      if (data.username !== userData.username) {
        userinfo.username = data.username;
        isUserChanged = true;
      }

      if (data.email !== userData.email) userinfo.email = data.email;

      if (data.password && validator.isStrongPassword(data.password)) {
        userinfo.password = data.password;
      } else {
        throw new Error('Password is not strong');
      }

      await axiosPrivate.put('/updateuser', JSON.stringify(userinfo));
      setUserData({ ...userData, ...data });
      setIsLoading(false);
      toast.success('User Updated Successfully');

      if (isUserChanged) logout();
      setData({ ...data, password: '' });
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className='update-user'>
      <div className='update-user-heading'>
        <h4>Update User Info</h4>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        {error && <ErrorMsg error={error} />}
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            name={input.name}
            label={input.label}
            value={data[input.name]}
            onChange={handleOnChange}
            placeholder={input.placeholder}
          />
        ))}

        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <FontAwesomeIcon icon='circle-notch' /> Updating
            </>
          ) : (
            'Update User'
          )}
        </Button>
      </form>
    </div>
  );
}

export default UpdateUser;
