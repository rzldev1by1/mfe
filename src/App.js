import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import './assets/scss/style.scss';
import axios from 'axios';
import endpoints from './helpers/endpoints';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);
const TheLayout = React.lazy(() => import('./shared/container/TheLayout'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Login = React.lazy(() => import('./pages/Login/Login'));

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    if (props.store.user) {
      const { token, userLevel } = props.store.user;
      axios.defaults.baseURL = endpoints.env.REACT_APP_API_URL;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common.Accept = 'application/json';
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios.defaults.headers.common.userLevel = userLevel || '';
      axios.defaults.timeout = 100000;
      axios.interceptors.request.use((request) => {
        return request;
      });
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        function (error) {
          if (error?.response?.status === 401) {
            props.dispatch({ type: 'EXPIRED' });
          }
          return Promise.reject(error);
        },
      );
    }
  }

  render() {
    const { component: Component, store, ...others } = this.props;
    const renderRoute = (props) => {
      if (store.user && store.user.token && !store.expired) {
        const adminRoutes = ['/users-management'];
        if (store.user.userLevel === 'Regular' && adminRoutes.includes(props.location.pathname)) {
          return <Redirect to={{ pathname: '/', state: { returnUrl: props.location } }} />;
        }
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/login', state: { returnUrl: props.location } }} />;
    };
    return <Route {...others} render={renderRoute} />;
  }
}

class App extends React.Component {
  render() {
    const tes = endpoints.env.REACT_APP_API_URL_ISMOBILE;
    const isMobileView = document.documentElement.clientWidth <= 500;
    if (isMobile && isMobileView && tes === 'true') {
      return window.location.assign('http://mweb-m.staging.microlistics.com/');
    }
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <ProtectedRoute path="/" name="Home" component={TheLayout} {...this.props} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (store) => ({ store });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(App);
