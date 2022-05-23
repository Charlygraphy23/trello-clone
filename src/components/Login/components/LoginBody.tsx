import { signInWithEmail, signupWithGoogle } from 'api';
import classNames from 'classnames';
import Button from 'components/button';
import { handleValidator, throwError, userLoggedIn } from 'config/app';
import { useCallback, useState } from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addAuthData } from 'store/actions';

type Props = {
  state: {
    email: string;
    password: string;
  };
  errors: {
    email: boolean;
    password: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
};

const LoginBody = ({ state, errors, setState, setErrors }: Props) => {
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const handleValidate = useCallback(() => {
    setErrors({
      email: false,
      password: false
    });

    return handleValidator({ state, setErrors });
  }, [setErrors, state]);

  const isGoogleLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): response is GoogleLoginResponse =>
    !!response &&
    typeof response === 'object' &&
    !!(response as GoogleLoginResponse).tokenObj;

  const googleSuccess = useCallback(
    (_res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!isGoogleLoginResponse(_res)) {
        return;
      }

      signupWithGoogle(_res.tokenObj.id_token)
        .then((response) => {
          dispatch(addAuthData(response.data.data));
          userLoggedIn(true);
          history.push('/home');
          // refreshTokenSetup(_res as GoogleLoginResponse);
          toast.success('Logged in');
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    },
    [dispatch, history]
  );

  const googleFailure = useCallback(
    (_res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!isGoogleLoginResponse(_res)) {
        return;
      }
      _res.disconnect();
      console.error('GOOGLE AUTH ERROR');
    },
    []
  );

  const handleLogin = useCallback(() => {
    const hasError = handleValidate();

    if (hasError) return null;
    setBtnLoading(true);
    signInWithEmail(state.email, state.password)
      .then((response) => {
        dispatch(addAuthData(response.data.data));
        userLoggedIn(true);
        setBtnLoading(false);
        toast.success('Successfully Login');
        history.push('/home');
      })
      .catch((err) => {
        setBtnLoading(false);
        throwError(err);
      });
  }, [dispatch, handleValidate, history, state.email, state.password]);

  const handleChange = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    },
    [setState]
  );

  return (
    <>
      <p className='login__title mb-3'>Log in to Trello</p>

      <input
        name='email'
        type='text'
        className={classNames('mb-3', {
          error: errors.email
        })}
        placeholder='Enter email address'
        onChange={handleChange}
      />

      <input
        name='password'
        type='password'
        className={classNames('mb-3', {
          error: errors.password
        })}
        placeholder='Enter password'
        onChange={handleChange}
      />

      <Button
        className='bg-success text-white w-100 mb-3 login__submit'
        type='button'
        onClick={handleLogin}
        loading={btnLoading}
        loaderColor='light'
      >
        Login
      </Button>

      <div className='app__divider w-100' />

      <Button
        className='w-100 mb-3 login__google mt-4 justify-content-center'
        google
        handleGoogleSuccess={googleSuccess}
        handleGoogleFailure={googleFailure}
        value='Continue with Google'
      />

      <div className='loginPage__footer'>
        <Link to='/signup'>Sign up ?</Link>
      </div>
    </>
  );
};

export default LoginBody;
