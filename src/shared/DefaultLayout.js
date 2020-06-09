// import React, { Component, Suspense } from 'react';
// import { connect } from 'react-redux';
// import { Redirect, Route, Switch, NavLink } from 'react-router-dom';

// import {
//     AppAside,
//     AppSidebar,
//     AppSidebarFooter,
//     AppSidebarForm,
//     AppSidebarHeader,
//     AppSidebarMinimizer,
//     AppBreadcrumb2 as AppBreadcrumb,
//     AppSidebarNav2 as AppSidebarNav,
//     AppFooter,
// } from '@coreui/react';

// import routes from '../routes';

// import helpers from 'helpers';

// import logo from 'assets/img/brand/LOGO2.png';
// import dummyPic from 'assets/img/brand/User-Icon.png';
// import menunav from '../_nav';
// import SidebarMenu from './SidebarMenu';

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));

// class DefaultLayout extends Component {

//     loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

//     constructor() {
//         super();

//         this.state = {
//             displayMenu: false,
//             navigationMenu: menunav
//         };
//         this.counter = 0;
//     };

//     componentDidMount() {
//         this.showMenu()
//     }

//     signOut = (e) => {
//         this.props.dispatch({ type: 'SET_AUTH', data: null })
//     }

//     onUserDropdownClick = () => {
//         this.setState((prevState) => {
//             return { displayMenu: !prevState.displayMenu }
//         });
//     }

//     expandUser = () => {
//         if (this.state.displayMenu) {
//             return (
//                 <div className="viewProfile" size="sm">
//                     <div className="expandProfile">
//                         <a className="expandProfile" href="/">About</a>
//                     </div>
//                     <div className="expandProfile">
//                         <a className="expandProfile" href="/">Change Password</a>
//                     </div>
//                     <div className="expandProfile">
//                         <a className="expandProfile" href="/" onClick={(e) => { this.signOut() }}>
//                             <i className="fa fa-power-off" /> Logout
//                         </a>
//                     </div>
//                 </div>
//             );
//         }
//     }

//     showMenu = () => {
//         let userLevel = helpers.getUserLevel();
//         let userMenu = helpers.getUserMenu();
//         let menuaccess = { ...menunav };

//         if (userLevel) {
//             if (userLevel.toLowerCase() !== 'administrator') {
//                 let menuItems = menunav.items.filter((item) => { return userMenu.indexOf(item.key) !== -1 });
//                 if (menuItems.length)
//                     menuaccess.items = menuItems
//             }
//             this.setState({ navigationMenu: menuaccess });

//         }

//     }

//     render() {
//         const { store } = this.props
//         return (
//             <div className="app">
//                 <div className="app-body">
//                     <AppSidebar fixed display="lg">
//                         <AppSidebarHeader />
//                         <AppSidebarForm />
//                         <Suspense>

//                             <div className="scrollbar-container ">
//                                 <div className="p-0 sidebar-header">
//                                     <img src={logo} alt="" className="sideLogo" />
//                                 </div>


//                                 {/*
// 																<AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
// 															**/
//                                 }

//                                 <SidebarMenu menuItems={this.state.navigationMenu} />


//                                 <div rowSpan="3" className="divProfilePhoto" >
//                                     <img className="profilePhoto" src={dummyPic} alt="dummyPic" />

//                                     <div className="divProfileText">
//                                         <span className="userName">{store.user.name}</span> <br />
//                                         <span className="profileID">  ID: {store.user.userId} </span> <br />
//                                         <a className="LogoutLink" href="#/logout" onClick={this.signOut}>
//                                             <div style={{ paddingTop: '5px' }}>LOGOUT</div>
//                                         </a>
//                                     </div>
//                                 </div>


//                             </div>



//                             {/* {this.expandUser()} */}
//                         </Suspense>
//                         <AppSidebarFooter />
//                         {/* <AppSidebarMinimizer /> */}
//                     </AppSidebar>
//                     <main className="main">
//                         {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
//                         <Suspense fallback={this.loading()}>
//                             <Switch>
//                                 {routes.map((route, idx) => {
//                                     return route.component ? (
//                                         <Route key={idx} path={route.path} exact={route.exact} name={route.name}
//                                             render={props => (
//                                                 <route.component {...props} />
//                                             )} />
//                                     ) : (null);
//                                 })}
//                                 <Redirect from="/" to="/Welcome" />
//                             </Switch>
//                         </Suspense>
//                     </main>
//                     <AppAside fixed>
//                         <Suspense fallback={this.loading()}>
//                             <DefaultAside />
//                         </Suspense>
//                     </AppAside>
//                 </div>
//                 {/* <AppFooter>
//                     <Suspense fallback={this.loading()}>
//                         <DefaultFooter />
//                     </Suspense>
//                 </AppFooter> */}
//             </div>
//         );
//     }
// }
// const mapStateToProps = (store) => ({ store })
// const mapDispatchToProps = (dispatch) => ({ dispatch })
// export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
