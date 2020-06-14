import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from '@coreui/react'
import Logo from 'assets/img/LOGO2.png'
import UserIcon from 'assets/img/User-Icon.png';
import navigation from './_nav'
import './TheSidebar.css'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const user = useSelector(state => state.user)

  const signOut = (e) => {
    dispatch({ type: 'set', user: null })
  }
  return (
    <CSidebar
      show={show}
      unfoldable
      className="c-sidebar-unfoldable"
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand to="/">
        <img src={Logo} className="c-sidebar-brand-full" height="35" alt="logo" />
        <img src={Logo} className="c-sidebar-brand-minimized" height="35" alt="logo" />
      </CSidebarBrand>
      <CSidebarNav>
        {/* <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        /> */}
        {navigation.map((n, i) => <li key={i} className="c-sidebar-nav-item">
          <Link to={n.to} className="c-sidebar-nav-link"><i className={`c-sidebar-nav-icon ${n.icon}`}></i>{n.name}</Link>
        </li>)}
      </CSidebarNav>
      <ul className="c-sidebar-nav c-sidebar-bottom">
        <li className="c-sidebar-nav-item">
          <span className="c-sidebar-nav-link logout">
            <img src={UserIcon} alt="logout-icon" />
            <div className="ml-3">
              <span>{user.name}</span> <br />
              <span>ID: {user.userId} </span> <br />
              <a href="#/logout" onClick={signOut}> LOGOUT </a>
            </div>
          </span>
        </li>
      </ul>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
