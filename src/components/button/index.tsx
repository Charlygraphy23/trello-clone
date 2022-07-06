/* eslint-disable prettier/prettier */
import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';

type ButtonType = {
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset' | undefined;
  name?: string;
  value?: string;
  onClick?: (
    // eslint-disable-next-line no-unused-vars
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  children?: JSX.Element | string;
  loading?: boolean;
  loaderColor?:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
  disabled?: boolean;
  google?: boolean;
  handleGoogleSuccess?: (
    // eslint-disable-next-line no-unused-vars
    e: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => void;
  handleGoogleFailure?: (
    // eslint-disable-next-line no-unused-vars
    e: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => void;
};

const Button = ({
  className = '',
  style = {},
  type = undefined,
  name = '',
  value = '',
  onClick,
  children,
  loading = false,
  loaderColor = 'primary',
  disabled = false,
  google = false,
  handleGoogleSuccess,
  handleGoogleFailure
}: ButtonType) => {
  if (google) {
    return (
      <GoogleLogin
        className={`${className} `}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        buttonText={value}
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy='single_host_origin'

      />
    );
  }

  return (
    <button
      className={`${className} `}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      style={style}
      name={name}
      disabled={disabled}
    >
      {loading && (
        <div className={`spinner-border text-${loaderColor}`} role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}

      {!loading ? children || value : ''}
    </button>
  );
};

export default Button;
