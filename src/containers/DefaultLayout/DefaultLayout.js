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

import logo from '../../assets/img/brand/LOGO2.png';
import logout from '../../assets/img/brand/logout2.png';
import dummyPic from '../../assets/img/brand/User-Icon.png';
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
        Authentication = null;
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
                    <AppSidebar fixed display="lg">
                        {/* <AppSidebarHeader /> */}
                        {/* <AppSidebarForm /> */}
                        <Suspense>
                            
                    <div className="scrollbar-container sidebar-nav"> 
                            <div className="p-0 sidebar-header">
                                <img src={logo} alt="" className="sideLogo"/>
                            </div>


															{/*
																<AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
															**/
														  }
                                                       
							<SidebarMenu menuItems={this.state.navigationMenu}/>

                            <div className="p-0 sidebar-header" style={{textAlign: 'left',marginTop: '30px'}} onClick={this.onUserDropdownClick}>
                                        <tr>
                                            <td rowSpan="3" className="text-center align-middle p-0 divProfilePhoto" >
                                           
    
                                                <img className="profilePhoto" src={dummyPic} alt="dummyPic" />
                                            </td> 
                                        </tr>
                                        <tr> 
                                            <td className="pt-0">
                                                <span className="userName">{Authentication.getName()}</span>
                                                <br />
                                                <span className="profileID">  ID: {Authentication.getId()} </span>
                                            </td>
                                        </tr>
                                        {/* <tr> 
                                            <td className="pt-0">
                                                <span className="profileID"> ID: {Authentication.getId()} </span>
                                            </td>
                                        </tr> */}
                            </div>
                                <div className="userLogout  p-0 sidebar-header">
                                    <ul className="nav">
                                        <li class="nav-item"><a class="nav-link" href="/" onClick={(e) => {this.signOut()} }><img src={logout} alt="" className="LogoutIcon"/><i class="nav-icon "></i><div class="nav-name Logout">Logout</div></a></li>
                                    </ul>
                                </div>
                    </div>                                         

                           

                            {/* {this.expandUser()} */}
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
