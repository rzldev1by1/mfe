import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  CSidebar,
  // CSidebarBrand,
  CSidebarNav,
} from '@coreui/react'
import Logo from 'assets/img/LOGO2.png'
import UserIcon from 'assets/img/User-Icon.png';
import navigation from './_nav'
import './TheSidebar.css'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const show = useSelector(state => state.sidebarShow)
  const user = useSelector(state => state.user)
  const signOut = (e) => {
    dispatch({ type: 'set', user: null })
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
      <CSidebarNav>
        <li className="c-sidebar-item my-2">
          <Link to="/"><img src={Logo} height="40" alt="logo" /></Link>
        </li>
        <li className="c-sidebar-item my-2 mb-4 logo-text">
          MICROLISTICS
        </li>

        {navigation.map((n, i) => {
          const active = location.pathname === n.to ? 'text-white' : ''
          return <li key={i} className="c-sidebar-item links my-2">
            <Link to={n.to} className={active}>
              <i className={`m-0 c-sidebar-nav-icon ${n.icon}`}></i>
              <div>{n.name}</div>
            </Link>
          </li>
        })}
      </CSidebarNav>
      <ul className="sidebar-nav-bottom">
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
