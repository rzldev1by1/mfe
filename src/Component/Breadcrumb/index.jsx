import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CToggler,
  CSubheader,
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'

const TheHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'SIDEBAR', data: val })
  }
  const { button, breadcrumb } = props;

  return (
    <div className="no-border no-shadow pt-5 mt-3" id="stockMovement">
      <CSubheader className="bg-transparent no-border no-shadow my-0">
        <CToggler inHeader className="p-0 d-lg-none" onClick={toggleSidebarMobile} />
        <CBreadcrumb className={`no-border no-shadow mr-auto m-0 py-3 ${breadcrumb[1]?.active ? '' : 'd-flex justify-content-between'} w-100 pr-0`}>
          {breadcrumb ? breadcrumb.map(b => {
            return b.active ? <CBreadcrumbItem key={`key-bred-1-${b.label}`} active>{b.label}</CBreadcrumbItem>
              : <CBreadcrumbItem key={`key-bred-2-${b.label}`}><Link to={b.to}>{b.label}</Link></CBreadcrumbItem>
          }) : ''}
          <div className="c-subheader-nav">
            {button}
          </div>
        </CBreadcrumb>
      </CSubheader>
    </div>
  )
}

export default TheHeader
