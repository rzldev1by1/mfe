import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'assets/App.scss';

import DefaultLayout from 'components/DefaultLayout';
import ProtectedRoute from 'components/ProtectedRoute';
import Login from 'pages/Login';

 const Register = React.lazy(() => import('pages/Register'));
// const Page404 = React.lazy(() => import('pages/Page404'));
// const Page500 = React.lazy(() => import('pages/Page500'));

// const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
	render() {
		return (
			<HashRouter>
				{/* <React.Suspense fallback={loading()}> */}
					<Switch>
						{/* 
						<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
						<Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}


						{/* <AnonimRoute exact path="/login" name="Login Page" component={Login} /> */}
						<Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
						<Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
						{/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
						<ProtectedRoute path="/" name="Home" component={DefaultLayout} />
					</Switch>
				{/* </React.Suspense> */}
			</HashRouter>
		);
	}
}

export default App;
