import ViewTask from 'components/board/components/ViewTask';
import CreateBoard from 'components/createBoard/CreateBoard';
import CheckYourMail from 'components/invalid/CheckYourMail';
import PageLoader from 'components/Loader/PageLoader';
import LoginPage from 'components/Login';
import SignUpPage from 'components/signup';
import WorkSpaceModal from 'components/Workspace';
import { useSelector } from 'react-redux';

import { Route, Switch, useLocation } from 'react-router-dom';
import { StoreType } from 'store';
import PublicRoutes from './public';
import PrivateRoute from './routes';

const RouteIndex = () => {
  const location = useLocation<any>();

  const { loading: authLoading, auth } = useSelector(
    (store: StoreType) => store.AuthReducer
  );

  const background = location.state && location?.state?.background;

  return (
    <>
      <Switch location={background || location}>
        <PublicRoutes exact path='/' component={LoginPage} />
        <PublicRoutes path='/signup' component={SignUpPage} />
        <PublicRoutes path='/check-email' component={CheckYourMail} />

        <Route component={PrivateRoute} />
      </Switch>

      {authLoading && <PageLoader />}

      {background && auth && (
        <Route path='/task/:taskId' component={ViewTask} />
      )}
      {background && (
        <Route path='/create-workspace' component={WorkSpaceModal} />
      )}
      {background && <Route path='/create-board' component={CreateBoard} />}
    </>
  );
};

export default RouteIndex;
