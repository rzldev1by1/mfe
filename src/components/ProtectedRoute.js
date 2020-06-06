import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = (store) => ({ store })
class ProtectedRoute extends Component {
	render() {
		const { component: Component, store, ...others } = this.props;
		const renderRoute = props => {
			if (store.user && store.user.token) {
				return <Component {...props} />
			}
			return (
				<Redirect to={{ pathname: '/login', state: { returnUrl: props.location } }} />
			)
		}
		return <Route {...others} render={renderRoute} />
	}
}

export default connect(mapStateToProps)(ProtectedRoute);