import { AxiosError } from 'axios';
import React from 'react';
import { GoogleLoginResponse } from 'react-google-login';
import { toast } from 'react-toastify';
import validator from 'validator';

type ValidatorMethodType = {
  state: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
};

/* eslint-disable import/prefer-default-export */
export const LABEL_COLORS = [
  '#61BD4F',
  '#F2D600',
  '#FF9F1A',
  '#EB5A46',
  '#C377E0',
  '#0079BF',
  '#00C2E0',
  '#51E898',
  '#FF78CB',
  '#344563'
];

export const throwError = (err: AxiosError<any, any>) => {
  const message = err?.response?.data?.msg ?? err.message;
  return toast.error(message);
};

export const refreshTokenSetup = (
  // eslint-disable-next-line no-unused-vars
  _res: GoogleLoginResponse
) => {
  let refreshTiming = (_res?.tokenObj?.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await _res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

export const handleValidator = ({ state, setErrors }: ValidatorMethodType) => {
  let flag = false;

  Object.entries(state).forEach((value: any) => {
    const [key, val] = value;

    if (validator.isEmpty(val)) {
      flag = true;
      setErrors((prevState: any) => ({
        ...prevState,
        [key]: true
      }));
    }
    if (key === 'email' && !validator.isEmail(val)) {
      flag = true;
      setErrors((prevState: any) => ({
        ...prevState,
        [key]: true
      }));
    }
    if (key === 'password' && !validator.isStrongPassword(val)) {
      flag = true;
      setErrors((prevState: any) => ({
        ...prevState,
        [key]: true
      }));
    }
  });

  return flag;
};

export const userLoggedIn = (status: boolean) =>
  localStorage.setItem('auth', JSON.stringify(status));

export const titleLettersConvert = (string: string) =>
  string.slice(0, 1).toUpperCase();
