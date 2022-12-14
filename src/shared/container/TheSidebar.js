import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  CSidebar,
  // CSidebarBrand,
  CSidebarNav,
} from '@coreui/react';
import Logo from '../../assets/img/logo-white.png';
import nav from './_nav';
import './TheSidebar.css';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const show = useSelector((state) => state.sidebarShow);
  const user = useSelector((state) => state.user);
  const lastChangedUser = useSelector((state) => state.lastChangedUser);

  const [hover, setHover] = useState(null);
  const signOut = async () => {
    dispatch({ type: 'LOGOUT' });
    const payload = { last_access: new Date().toLocaleString() };
    const ret = await axios.post('auth/logout', payload);
    return ret;
  };
  const userMenu = user.userModules && user.userModules.map((item) => item.menu_id);
  const adminRoutes = ['/users-management'];

  let navigation = nav;

  // Old Checking menu, admin only access user management
  // if (user.userLevel === 'Regular') {
  //   navigation = navigation.filter((n) => {
  //     return !adminRoutes.includes(n.to) && userMenu.includes(n.key);
  //   });
  // } else if (!superAdmin.includes(user.userId)) {
  //   navigation = navigation.filter((n) => {
  //     return adminRoutes.includes(n.to);
  //   });
  // }

  if (user.userLevel === 'Regular') {
    navigation = navigation.filter((n) => {
      return !adminRoutes.includes(n.to) && userMenu?.includes(n.key);
    });
  }
  else {
    navigation = navigation.filter((n) => {
      return n.to !== '/supplier-management';
    });
  }

  return (
    <CSidebar
      id="theSidebar"
      show={show}
      className="h-100"
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <ul className="sidebar-nav-header">
        <li className="c-sidebar-item">
          {/* <Link onClick={() => darkModeMLS({ darkMode, dispatch })}> */}
          <div className="link-custom">
            <img src={Logo} height="35" alt="logo" />
          </div>
        </li>
        <Link to="/" className="text-logo">
          <li className="c-sidebar-item logo-text text-white">Microlistics</li>
        </Link>
      </ul>
      <CSidebarNav className="sidebar-nav-menu">
        {navigation.map((n) => {
          const string = location.pathname;
          const isActive = string.includes(n.to);
          const isHover = hover === n.to;
          let hoverIcon = n.icon;
          if (isHover) hoverIcon = `${n.icon}-hover`;
          else if (isActive) hoverIcon = `${n.icon}-active`;
          const icon = `nav/${hoverIcon}.png`;
          return (
            <Link key={n.to} to={n.to} className={isActive} style={{ textDecoration: 'none' }}>
              <li
                key={n.to}
                className="c-sidebar-item links"
                onMouseEnter={() => setHover(n.to)}
                onMouseLeave={() => setHover(null)}
              >
                <img className={`m-0 mb-1 c-sidebar-nav-icon ${n.icon}`} src={icon} alt="" />
                <div className={isHover || isActive ? 'text-white' : 'text-blue'}>{n.name}</div>
              </li>
            </Link>
          );
        })}
      </CSidebarNav>
      <ul className="sidebar-nav-bottom m-0 p-0">
        <li className="c-sidebar-item" onMouseEnter={() => setHover('logout')} onMouseLeave={() => setHover(null)}>
          <img className="m-0 c-sidebar-nav-icon-profile" src="nav/profile.png" alt="" />
          <div className=" text-left text-blue">
            <div>
              {lastChangedUser && lastChangedUser.userId === user.userId && lastChangedUser.email === user.email
                ? lastChangedUser.name
                : user.name}
            </div>
            <div>ID: {user.userId} </div>
            <a href="#/" onClick={signOut} className="logOutHover">
              {' '}
              LOGOUT{' '}
            </a>
          </div>
        </li>
      </ul>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
