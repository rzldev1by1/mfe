import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  CSidebar,
  // CSidebarBrand,
  CSidebarNav,
} from '@coreui/react';
import Logo from 'assets/img/logo-white.png';
import nav from './_nav';
import './TheSidebar.css';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const show = useSelector((state) => state.sidebarShow);
  const user = useSelector((state) => state.user);

  const [hover, setHover] = useState(null);
  let userMenu = user.userModules.map((item) => item.menu_id);
  const adminRoutes = ['/users-management'];
  const superAdmin = ['MLS12345', 'angae'];

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
      return !adminRoutes.includes(n.to) && userMenu.includes(n.key);
    });
  }
  else {
    navigation = navigation.filter((n) => {
      return n.to !== "/supplier-management"
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
        <li className="c-sidebar-item py-2 justify-content-end d-flex">
          <Link to="/">
            <img src={Logo} height="35" alt="logo" />
          </Link>
        </li>
        <li></li>
      </ul>
      <CSidebarNav className="sidebar-nav-menu">
        {navigation.map((n, i) => {
          let string = location.pathname;
          const isActive = string.includes(n.to);
          const isHover = hover === n.to;
          let icon = `nav/${isHover ? n.icon + '-hover' : isActive ? n.icon + '-active' : n.icon}.png`;
          return (
            <Link to={n.to} className={isActive} style={{ textDecoration: 'none' }}>
              <li
                key={i}
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
        <li className="c-sidebar-item">
          <img className="m-0 c-sidebar-nav-icon-profile" src="nav/profile.png" alt="" />
        </li>
      </ul>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
