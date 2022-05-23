import { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  component: React.ComponentType;
  path: string;
  [key: string]: any;
};

const Auth = ({ component: Component, path, ...rest }: Props) => {
  // const { auth } = useSelector((state: StoreType) => state.AuthReducer);
  const isLoggedIn = useMemo(
    () =>
      localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth') ?? 'false')
        : false,
    []
  );

  return (
    <Route
      {...rest}
      render={(props: any) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                prevPathname: path
              }
            }}
          />
        )
      }
    />
  );
};

export default Auth;
