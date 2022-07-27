import { useState } from 'react';
import LoginBody from './components/LoginBody';
import './style.scss';

const LoginPage = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  return (
    <>
      <div className='loginPage'>
        <h1>Rello</h1>

        <div className='loginPage__body'>
          <LoginBody
            state={state}
            setState={setState}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
