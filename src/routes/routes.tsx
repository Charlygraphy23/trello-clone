import BoardIndex from 'components/board';
import Header from 'components/header';
import Home from 'components/Home';
import InvalidPage from 'components/invalid/InvalidPage';
import InvitePage from 'components/invite';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { homeLoad } from 'store/actions';
import { profileLoad } from 'store/actions/user.action';
import Auth from './auth';

const PrivateRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') ?? 'false');

    if (!auth) return;
    dispatch(profileLoad());
    dispatch(homeLoad());
  }, [dispatch]);

  return (
    <>
      {/* {authLoading && <PageLoader />} */}
      <Header />

      <Switch>
        <Auth path='/invite' component={InvitePage} />
        <Auth path='/home' component={Home} />
        <Auth path='/board/:id' component={BoardIndex} />
        <Route component={InvalidPage} />
      </Switch>
    </>
  );
};

export default memo(PrivateRoutes);
