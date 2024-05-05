import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import toast from 'react-hot-toast';
import { axiosPrivate } from '../services/axios';

export function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(username, password) {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axiosPrivate.post('/login', { username, password });

      const resData = res.data;

      // Save user to local storage
      const data = JSON.stringify({
        username: resData.username,
        token: resData.token,
      });
      localStorage.setItem('user', data);

      // Update Authcontext
      dispatch({ type: 'account/login', payload: resData.username });

      setIsLoading(false);
      toast.success('Login Successfully');
    } catch (error) {
      setIsLoading(false);
      const errorMessages = error?.response?.data?.error;
      setError(errorMessages);

      return errorMessages || 'Internal Server Error';
    }
  }

  return { login, isLoading, error, setError };
}
