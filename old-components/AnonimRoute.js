import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import helpers from 'helpers';

class AnonimRoute extends Component {
	render() {
		const { component: Component, ...others } = this.props;

		const renderRoute = props => {
			if (helpers.isAuthenticated()) {
				return window.location.pathname = '/'
			}

			return <Component {...props} />
		}

		return <Route {...others} render={renderRoute} />
	}
}

export default AnonimRoute;