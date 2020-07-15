import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  CSidebar,
  // CSidebarBrand,
  CSidebarNav,
} from '@coreui/react'
import Logo from 'assets/img/logo-white.png'
import UserIcon from 'assets/img/User-Icon.png';
import navigation from './_nav'
import './TheSidebar.css'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const show = useSelector(state => state.sidebarShow)
  const user = useSelector(state => state.user)
  const [hover, setHover] = useState(null)
  const signOut = (e) => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <CSidebar
      show={show}
      // unfoldable
      // className="c-sidebar-unfoldable"
      className="h-100"
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      {/* <CSidebarBrand to="/">
        <img src={Logo} className="c-sidebar-brand-full" height="35" alt="logo" />
        <img src={Logo} className="c-sidebar-brand-minimized" height="35" alt="logo" />
      </CSidebarBrand> */}
      <ul className="sidebar-nav-header">
        <li className="c-sidebar-item">
          <Link to="/"><img src={Logo} height="35" alt="logo" /></Link>
        </li>
        <li className="c-sidebar-item logo-text">
          Microlistics
        </li>
      </ul>
      <CSidebarNav className="sidebar-nav-menu">
        {navigation.map((n, i) => {
          const active = location.pathname === n.to ? 'text-white' : 'text-purple'
          return <li key={i} className="c-sidebar-item links">
            <Link to={n.to} className={active}
              onMouseEnter={() => setHover(n.to)}
              onMouseLeave={() => setHover(null)}
            >
              <i className={`m-0 c-sidebar-nav-icon ${hover === n.to ? n.icon + '-hover' : n.icon}`}></i>
              <div>{n.name}</div>
            </Link>
          </li>
        })}
      </CSidebarNav>
      <ul className="sidebar-nav-bottom m-0 p-0">
        <li className="c-sidebar-item">
          <img src={UserIcon} height="50" alt="logout-icon" />
          <div className=" text-left">
            <div className="user-name">{user.name}</div>
            <div className="user-id">ID: {user.userId} </div>
            <a href="#/" onClick={signOut} className="user-logout"> Logout </a>
          </div>
        </li>
      </ul>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
