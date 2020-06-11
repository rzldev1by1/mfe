import React from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'assets/scss/style.scss'

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)
const TheLayout = React.lazy(() => import('shared/container/TheLayout'))
const Register = React.lazy(() => import('pages/Register/Register'))
const Login = React.lazy(() => import('pages/Login/Login'))

class ProtectedRoute extends React.Component {
	render() {
		const { component: Component, store, ...others } = this.props
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

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<React.Suspense fallback={loading}>
					<Switch>
						<Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
						<Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
						<ProtectedRoute path="/" name="Home" component={TheLayout} {...this.props} />
					</Switch>
				</React.Suspense>
			</HashRouter>
		)
	}
}

const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(App)
