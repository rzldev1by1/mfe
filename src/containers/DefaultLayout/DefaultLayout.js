import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
// import { Button, ButtonDropdown,
//          Card, CardBody, CardHeader,
//          Col, Row,
//          DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { AppAside,
		 AppSidebar,
		 AppSidebarFooter,
		 // AppSidebarForm,
		 // AppSidebarHeader,
		 // AppSidebarMinimizer,
		//  AppBreadcrumb2 as AppBreadcrumb,
		 AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

import navigation from '../../_nav';
import routes from '../../routes';

import Authentication from '../../Auth/Authentication';

import logo from '../../assets/img/brand/logo_ml_large.png';
import dummyPic from '../../assets/img/brand/userprofile.png';
import menunav from '../../menunav';
import SidebarMenu from './SidebarMenu';

const DefaultAside = React.lazy(() => import('./DefaultAside'));

class DefaultLayout extends Component {

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	constructor() {
		super();

		this.state = {
            displayMenu: false,
						navigationMenu: menunav
        };
		this.counter = 0;
	};

	componentDidMount(){
		this.showMenu()
	}

	signOut() {
        Authentication.signOut();
	}

    onUserDropdownClick = () => {
        this.setState((prevState) => {
            return { displayMenu: !prevState.displayMenu }
        });
    }

    expandUser = () => {
        if (this.state.displayMenu) {
            return (
                <div className="viewProfile" size="sm">
                    <div className="expandProfile">
                        <a className="expandProfile" href="/">About</a>
                    </div>
                    <div className="expandProfile">
                        <a className="expandProfile" href="/">Change Password</a>
                    </div>
                    <div className="expandProfile">
                        <a className="expandProfile" href="/" onClick={(e) => {this.signOut()} }>
                            <i className="fa fa-power-off" /> Logout
                        </a>
                    </div>
                </div>
            );
        }
    }



	showMenu = () => {
			let userLevel = Authentication.getUserLevel();
			let userMenu = Authentication.getUserMenu();
			let menuaccess = {...menunav};

			if(userLevel){
				if(userLevel.toLowerCase() !== 'administrator'){
					let menuItems = 	menunav.items.filter((item) => { return userMenu.indexOf(item.key) !== -1 });
					if(menuItems.length)
					 menuaccess.items = menuItems
				}
				this.setState({navigationMenu:menuaccess});

			}

		}



    render() {

        return (
            <div className="app">
                <div className="app-body">
                    <AppSidebar className="sidebar-fullheight" fixed display="lg">
                        {/* <AppSidebarHeader /> */}
                        {/* <AppSidebarForm /> */}
                        <Suspense>
                            <div className="p-0 sidebar-header">
                                <img className="navbar-brand-full" src={logo} alt="" style={{ width: 200, height: 58 }} />
                                <hr className="border-header" />
                            </div>


															{/*
																<AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
															**/
														  }


																<SidebarMenu menuItems={this.state.navigationMenu}/>


                            <div className="userSection" size="sm" onClick={this.onUserDropdownClick}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td rowSpan="2" className="text-center align-middle p-0">
                                                {/* <span className="fa fa-user-circle fa-3x" /> */}
                                                <img className="profilePhoto" src={dummyPic} alt="dummyPic" />
                                            </td>
                                            <td className="pb-0">
                                                <span className="userName">{Authentication.getName()}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-0">
                                                <span className="profileID"> ID: {Authentication.getId()} </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {this.expandUser()}
                        </Suspense>
                        <AppSidebarFooter />
                        {/* <AppSidebarMinimizer /> */}
                    </AppSidebar>
                    <main className="main">
                        {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
                        <Container fluid className="pl-0">
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
