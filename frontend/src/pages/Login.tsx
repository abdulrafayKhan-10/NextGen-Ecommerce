import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { UserCreateDto } from '../types/User';
import { createUserThunk } from '../redux/thunks/userThunks';
import { loginUserThunk } from '../redux/thunks/authThunks';
import { AppDispatch, RootState } from '../redux/store';

const Login = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreateDto>();

  const [currentState, setCurrentState] = useState<'Login' | 'Sign Up'>(
    'Login'
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const { userRole, authenticated, loading, error } = useSelector(
    (state: RootState) => state.authR
  );

  useEffect(() => {
    if (authenticated) {
      const path =
        userRole === 'Admin'
          ? '/dashboard/admin/profile'
          : '/dashboard/user/profile';
      navigate(path, { state: userRole });
    }
  }, [authenticated, userRole, navigate]);

  const onSubmit = async (data: UserCreateDto) => {
    try {
      let userData;
      if (currentState === 'Sign Up') {
        userData = await dispatch(createUserThunk(data)).unwrap();
        const path =
          userRole === 'Admin'
            ? '/dashboard/admin/profile'
            : '/dashboard/user/profile';
        navigate(path);
      } else {
        userData = await dispatch(
          loginUserThunk({ email: data.email, password: data.password })
        ).unwrap();
        if (
          signIn({
            auth: {
              token: userData.token,
              type: 'Bearer',
            },
            userState: {
              name: data.email,
              uid: userData.userId,
            },
          })
        ) {
          // Successfully signed in
        } else {
          throw new Error('Sign-in failed');
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Operation failed', error);
    }
  };

  const toggleFormState = () => {
    setCurrentState((prev) => (prev === 'Login' ? 'Sign Up' : 'Login'));
    reset();
  };

  const InputField = ({
    type,
    placeholder,
    name,
    validation,
  }: {
    type: string;
    placeholder: string;
    name: keyof UserCreateDto;
    validation?: Record<string, unknown>;
  }) => (
    <div className='flex flex-col w-full'>
      <input
        type={type}
        className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errors[name] && (
        <span className='mt-1 text-xs text-red-500 font-medium'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );

  return (
    <div className='min-h-[70vh] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 text-slate-800'
      >
        <div className='flex flex-col items-center gap-2 mb-6'>
          <h2 className='text-3xl font-extrabold text-slate-900'>{currentState}</h2>
          <hr className='border-none h-1 w-16 bg-emerald-500 rounded-full' />
        </div>

        {currentState === 'Sign Up' && (
          <div className='flex gap-4'>
            <InputField
              type='text'
              placeholder='First Name'
              name='firstName'
              validation={{
                required: { value: true, message: 'First Name is required' },
                minLength: {
                  value: 2,
                  message: 'Must be at least 2 characters',
                },
              }}
            />
            <InputField
              type='text'
              placeholder='Last Name'
              name='lastName'
              validation={{
                required: { value: true, message: 'Last Name is required' },
                minLength: {
                  value: 2,
                  message: 'Must be at least 2 characters',
                },
              }}
            />
          </div>
        )}

        <InputField
          type='email'
          placeholder='Email'
          name='email'
          validation={{
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Email is not valid',
            },
          }}
        />
        <InputField
          type='password'
          placeholder='Password'
          name='password'
          validation={{
            required: { value: true, message: 'Password is required' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'Must be 8 characters, contain letters and numbers',
            },
          }}
        />

        <div className='w-full flex justify-between text-sm mt-2 text-slate-500 font-medium'>
          <p className='cursor-pointer hover:text-emerald-600 transition-colors'>Forgot your password?</p>
          <p onClick={toggleFormState} className='cursor-pointer hover:text-emerald-600 transition-colors'>
            {currentState === 'Login' ? 'Create Account' : 'Login Here'}
          </p>
        </div>
        <button
          type='submit'
          className='w-full bg-slate-900 hover:bg-emerald-500 text-white font-bold py-4 mt-4 transition-colors duration-300 rounded-lg shadow-md'
          disabled={loading}
        >
          {loading ? 'Processing...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
        {error && <p className='text-red-500 text-center text-sm mt-2'>{error}</p>}
      </form>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default Login;
