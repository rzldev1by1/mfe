import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Table } from 'reactstrap';

import { AppAside,
		// AppFooter,
		// AppHeader,
		AppSidebar,
		AppSidebarFooter,
		AppSidebarForm,
		AppSidebarHeader,
		// AppSidebarMinimizer,
		// AppBreadcrumb2 as AppBreadcrumb,
		AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

// import logo from '../../assets/img/brand/logo_ttl_large.png';
import logo from '../../assets/img/brand/logo_ml_large.png';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
// const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	signOut(e) {
		e.preventDefault()
		this.props.history.push('/logins')
	}

	render() {
		return (
			<div className="app">
				{/* <AppHeader fixed>
					<Suspense  fallback={this.loading()}>
						<DefaultHeader onLogout={e=>this.signOut(e)}/>
					</Suspense>
				</AppHeader> */}
				<div className="app-body">
					<AppSidebar className="sidebar-fullheight" fixed display="lg">
						<AppSidebarHeader />
						<AppSidebarForm />
						<Suspense>
							<div className="p-0 sidebar-header">
								<img className="navbar-brand-full" src={logo} alt="" style={{ width: 150, height: 38 }} />
								<hr className="border-header" />
							</div>

							<AppSidebarNav navConfig={navigation} {...this.props} router={router}/>

							<Table className="userSection" size="sm">
								<tbody>
									<tr>
										<td rowSpan="2" className="text-center align-middle p-0" style={{ borderTop: "none" }}>
											<span className="fa fa-user-circle fa-3x" />
										</td>
										<td className="pb-0" style={{ borderTop: "none" }}>
											<span className="userName">George Smith</span>
										</td>
									</tr>
									<tr>
										<td className="pt-0" style={{ borderTop: "none" }}>
											<span className="viewProfile">View Profile</span>
										</td>
									</tr>
								</tbody>
							</Table>
						</Suspense>
						<AppSidebarFooter />
						{/* <AppSidebarMinimizer /> */}
					</AppSidebar>
					<main className="main">
						{/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
						<Container fluid className="pl-2">
							<Suspense fallback={this.loading()}>
								<Switch>
									{routes.map((route, idx) => {
										return route.component ? (
											<Route
												key={idx}
												path={route.path}
												exact={route.exact}
												name={route.name}
												render={props => (
													<route.component {...props} />
												)} />
										) : (null);
									})}
									<Redirect from="/" to="/logins" />
								</Switch>
							</Suspense>
						</Container>
					</main>
					<AppAside fixed>
						<Suspense fallback={this.loading()}>
							<DefaultAside />
						</Suspense>
					</AppAside>
				</div>
				{/* <AppFooter>
					<Suspense fallback={this.loading()}>
						<DefaultFooter />
					</Suspense>
				</AppFooter> */}
			</div>
		);
	}
}

export default DefaultLayout;
