import FooterSvg from 'components/FooterSvg';
import React from 'react';
import SignupBody from './components/SignupBody';
import './style.scss';

const SignUpPage = () => (
  <div className='signup__page'>
    <h1>Trello</h1>

    <div className='loginPage__body'>
      <SignupBody />
    </div>

    <FooterSvg />
  </div>
);

export default SignUpPage;
