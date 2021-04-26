import { Switch, Route } from 'react-router-dom';
import routes from './routes';

export default function RouterView () {
  return (
    <div>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} exact path={route.path} component={route.component} />
        ))}
      </Switch>
    </div>
  );
}
