import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Table } from 'reactstrap';
// import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import dummyPic from '../../assets/img/brand/userprofile.png';


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

	constructor(){
		super();
	   
		this.state = {
			  displayMenu: false,
			};
	   
		 this.showDropdownMenu = this.showDropdownMenu.bind(this);
		 this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
	   
	};

	showDropdownMenu(event) {
		event.preventDefault();
		this.setState({ displayMenu: true }, () => {
		document.addEventListener('click', this.hideDropdownMenu);
		});
	  }
	
	hideDropdownMenu() {
		this.setState({ displayMenu: false }, () => {
		  document.removeEventListener('click', this.hideDropdownMenu);
		});
	
	  }

	// constructor(props) {
	// 	super(props);
	
	// 	this.toggle = this.toggle.bind(this);
	// 	this.state = {
	// 	  dropdownOpen: new Array(19).fill(false),
	// 	};
	//   }
	
	//   toggle(i) {
	// 	const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
	// 	this.setState({
	// 	  dropdownOpen: newArray,
	// 	});
	//   }

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
									<img className="navbar-brand-full" src={logo} alt="" style={{ width: 200, height: 58 }} />
									<hr className="border-header" />
								</div>
	
								<AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
	
								<div className="userSection" size="sm" onClick={this.showDropdownMenu}>
									<div>
										
										<tr>
											<td rowSpan="2" className="text-center align-middle p-0" style={{ borderTop: "none" }}>
												<img className="profilePhoto" src={dummyPic}></img>
												{/* <span className="fa fa-user-circle fa-3x" /> */}
											</td>
											<td className="pb-0" style={{ borderTop: "none" }}>
												<span className="userName">George Smith</span>
											</td>
										</tr>
										<tr>
											<td className="pt-0" style={{ borderTop: "none" }}>
												<span className="profileID"> ID:123012131 </span>
											</td>
										</tr>
									</div>
								</div>
	
								{this.state.displayMenu ? (
									
								<div className="viewProfile" size="sm">
									<div className="about" align="center"><a href="" style={{textDecoration:"none"},{color:"#B4B9BB"}}>About</a></div>
									<div className="about" align="center"><a href="" style={{textDecoration:"none"},{color:"#B4B9BB"}}>Change Password</a></div>
									<div className="about" align="center"><a href="" style={{textDecoration:"none"},{color:"#B4B9BB"}}><i className="fa fa-power-off"></i>  Logout</a></div>
	
								</div>
								):
								(
									null
								)
								}
	
	{/* 
	<ButtonDropdown direction="up" className="mr-1" isOpen={this.state.dropdownOpen[13]} toggle={() => { this.toggle(13); }}>
		<DropdownToggle caret size="lg">
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
												<span className="profileID"> ID:123012131 </span>
											</td>
										</tr>
		</DropdownToggle>
					  
		<DropdownMenu>
		  <DropdownItem>About</DropdownItem>
		  <DropdownItem>Change Password</DropdownItem>
		  <DropdownItem>Logout</DropdownItem>
		</DropdownMenu>
	</ButtonDropdown> */}
	
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
