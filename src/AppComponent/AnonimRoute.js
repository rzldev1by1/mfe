import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Authentication from '../Auth/Authentication';

class AnonimRoute extends Component {
	render() {
		const { component: Component, ...others } = this.props;

		const renderRoute = props => {
			if (Authentication.isAuthenticated()) {
				return window.location.pathname = '/'
			}

			return <Component {...props} />
		}

		return <Route {...others} render={renderRoute} />
	}
}

export default AnonimRoute;