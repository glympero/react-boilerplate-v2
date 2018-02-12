//Exports a React Component
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Login from '../components/Login';
import HelpPage from '../components/HelpPage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


export const history = createHistory();
  
  
 const AppRouter = () => (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={Login} exact={true} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/help" component={HelpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );

  export default AppRouter;