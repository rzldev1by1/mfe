import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  // CHeaderBrand,
  // CHeaderNav,
  // CHeaderNavItem,
  // CHeaderNavLink,
  // CLink,
  CSubheader,
  CBreadcrumbRouter,
  // CBreadcrumb,
  // CBreadcrumbItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import Logo from 'assets/img/LOGO.png'

// routes config
import routes from '../../routes'

const TheHeader = () => {
  const dispatch = useDispatch()
  // const asideShow = useSelector(state => state.asideShow)
  const darkMode = useSelector(state => state.darkMode)
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader>

      <CToggler
        inHeader
        className="d-lg-none mr-auto"
        onClick={toggleSidebarMobile}
      />
      {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <img src={Logo} height="48" alt="logo" />
      </CHeaderBrand> */}
      <CToggler
        inHeader
        title="Toggle Light/Dark Mode"
        className="ml-3 d-lg-none"
        onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
      >
        <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
        <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
      </CToggler>

      {/* <TheHeaderDropdownNotif />
      <TheHeaderDropdownTasks />
      <TheHeaderDropdownMssg />
      <TheHeaderDropdown /> */}

      {/* <CToggler
        inHeader
        className="d-md-down-none"
        onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
      >
        <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
      </CToggler> */}

      <CSubheader className="px-3">
        <CToggler
          inHeader
          className="d-md-down-none"
          onClick={toggleSidebar}
        />
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3 mr-auto" routes={routes} />
        <CToggler
          inHeader
          title="Toggle Light/Dark Mode"
          className="ml-3 d-md-down-none"
          onClick={() => dispatch({ type: 'set', darkMode: !darkMode })}
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
