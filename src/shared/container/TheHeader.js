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
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader className="bg-transparent">

      {/* mobile start*/}
      {/* 
      <CToggler
        inHeader
        title="Toggle Light/Dark Mode"
        className="ml-3 d-lg-none"
        onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
      >
        <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
        <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
      </CToggler> */}
      {/* mobile end*/}

      <CSubheader className="bg-transparent">
        <CToggler inHeader className="p-0 d-lg-none" onClick={toggleSidebarMobile} />
        {/* <CToggler inHeader onClick={toggleSidebar} className="p-0 d-md-down-none" /> */}
        {/* <CBreadcrumbRouter className="border-0 c-subheader-nav mr-auto" routes={routes} /> */}
        <CBreadcrumb className="bg-transparent mr-auto px-2 m-0">
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
          onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler> */}
      </CSubheader>
    </CHeader >
  )
}

export default TheHeader
