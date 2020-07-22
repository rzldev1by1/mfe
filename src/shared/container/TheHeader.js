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
// import CIcon from '@coreui/icons-react'

const TheHeader = (props) => {
  const dispatch = useDispatch()
  // const darkMode = useSelector(state => state.darkMode)
  const sidebarShow = useSelector(state => state.sidebarShow)

  // const toggleSidebar = () => {
  //   const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
  //   dispatch({ type: 'set', sidebarShow: val })
  // }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'SIDEBAR', data: val })
  }

  return (
    <CHeader withSubheader className="no-border no-shadow">
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
          {props.breadcrumb ? props.breadcrumb.map((b, i) => {
            return b.active ? <CBreadcrumbItem key={i} active>{b.label}</CBreadcrumbItem>
              : <CBreadcrumbItem key={i}><Link to={b.to}>{b.label}</Link></CBreadcrumbItem>
          }) : ''}
        </CBreadcrumb>
        <div className="c-subheader-nav">
          {props.button}
        </div >
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
