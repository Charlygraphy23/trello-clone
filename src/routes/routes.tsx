import BoardIndex from 'components/board';
import Header from 'components/header';
import Home from 'components/Home';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { profileLoad } from 'store/actions/user.action';
import Auth from './auth';

const PrivateRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') ?? 'false');

    if (!auth) return;
    dispatch(profileLoad());
  }, [dispatch]);

  return (
    <>
      {/* {authLoading && <PageLoader />} */}
      <Header />
      <Switch>
        <Auth path='/home' component={Home} />
        <Auth path='/board/:id' component={BoardIndex} />
      </Switch>
    </>
  );
};

export default memo(PrivateRoutes);
