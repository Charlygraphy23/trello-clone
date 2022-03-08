import BoardIndex from 'components/board';
import ViewTask from 'components/board/components/ViewTask';
import { Route, Switch, useLocation } from 'react-router-dom';

const RouteIndex = () => {
  const location = useLocation();

  // @ts-ignore
  const background = location.state && location?.state?.background;

  return (
    <>
      <Switch>
        <Route path='/' component={BoardIndex} />
      </Switch>
      {background && <Route path='/data' component={ViewTask} />}
    </>
  );
};

export default RouteIndex;
