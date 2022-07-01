import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CHeader,
  CToggler,
  CSubheader,
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'

const TheHeader = (props) => {
  const { breadcrumb, button } = props
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'SIDEBAR', data: val })
  }

  return (
    <CHeader withSubheader className="no-border no-shadow" id="stockMovement">
      {/* 
      <CToggler
        inHeader
        title="Toggle Light/Dark Mode"
        className="ml-3 d-lg-none"
        onClick={() => dispatch({ type: 'DARKMODE', data: !darkMode })}
      >
        <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
        <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
      </CToggler> */}

      <CSubheader className="bg-transparent no-border no-shadow my-2">
        <CToggler inHeader className="p-0 d-lg-none" onClick={toggleSidebarMobile} />
        {/* <CToggler inHeader onClick={toggleSidebar} className="p-0 d-md-down-none" /> */}
        {/* <CBreadcrumbRouter className="border-0 c-subheader-nav mr-auto" routes={routes} /> */}
        <CBreadcrumb className="no-border no-shadow mr-auto m-0 py-3">
          {breadcrumb ? breadcrumb.map((b) => {
            return b.active ? <CBreadcrumbItem key={b.to} active>{b.label}</CBreadcrumbItem>
              : <CBreadcrumbItem key={b.to}><Link to={b.to}>{b.label}</Link></CBreadcrumbItem>
          }) : ''}
        </CBreadcrumb>
        <div className="c-subheader-nav">
          {button}
        </div>
        {/* <CToggler
          inHeader
          title="Toggle Light/Dark Mode"
          className="ml-3"
          onClick={() => dispatch({ type: 'DARKMODE', data: !darkMode })}
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler> */}
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
