import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  CSidebar,
  // CSidebarBrand,
  CSidebarNav,
} from '@coreui/react'
import Logo from 'assets/img/logo-white.png'
import nav from './_nav'
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
  let userMenu = user.userModules.map(item => (item.menu_id));
  const adminRoutes = ['/users-management']
  let navigation = nav
  if (user.userLevel === 'Regular') {
    navigation = navigation.filter(n => {
      console.log();
      return ((adminRoutes.includes(n.to) ? false : true) && (userMenu.includes(n.key) ? true : false))
    })
  }
  return (
    <CSidebar
      id="theSidebar"
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
        <Link to="/" className='text-logo'>
          <li className="c-sidebar-item logo-text text-white">
            Microlistics
          </li>
        </Link>
        <li>

        </li>
      </ul>
      <CSidebarNav className="sidebar-nav-menu">
        {navigation.map((n, i) => {
          // const isActive = location.pathname === n.to
          let string = location.pathname
          const isActive = string.includes(n.to)
          const isHover = hover === n.to
          let icon = `nav/${isHover ? n.icon + '-hover' : isActive ? n.icon + '-active' : n.icon}.png`
          return (
            <Link to={n.to} className={isActive} style={{ textDecoration: 'none' }} >
              <li key={i} className="c-sidebar-item links" onMouseEnter={() => setHover(n.to)} onMouseLeave={() => setHover(null)} >

                <img className={`m-0 mb-1 c-sidebar-nav-icon ${n.icon}`} src={icon} alt="" />
                <div className={isHover || isActive ? 'text-white' : 'text-blue'}>{n.name}</div>

              </li>
            </Link>
          )
        })}
      </CSidebarNav>
      <ul className="sidebar-nav-bottom m-0 p-0">
        <li className="c-sidebar-item" onMouseEnter={() => setHover('logout')} onMouseLeave={() => setHover(null)}>
          <img className="m-0 c-sidebar-nav-icon-profile" src="nav/profile.png" alt="" />
          <div className=" text-left text-blue">
            <div>{user.name}</div>
            <div>ID: {user.userId} </div>
            <a href="#/" onClick={signOut} className='logOutHover'> LOGOUT </a>
          </div>
        </li>
      </ul>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
