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
    const sidebarShow = useSelector(state => state.sidebarShow)
    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({ type: 'SIDEBAR', data: val })
    }

    return (
        <CHeader withSubheader className="no-border no-shadow" id="stockMovement">
            <CSubheader className="bg-transparent no-border no-shadow my-2">
                <CToggler inHeader className="p-0 d-lg-none" onClick={toggleSidebarMobile} />
                <CBreadcrumb className="no-border no-shadow mr-auto m-0 py-3">
                    {props.breadcrumb ? props.breadcrumb.map((b, i) => {
                        return b.active ? <CBreadcrumbItem key={i} active>{b.label}</CBreadcrumbItem>
                            : <CBreadcrumbItem key={i}><Link to={b.to}>{b.label}</Link></CBreadcrumbItem>
                    }) : ''}
                </CBreadcrumb>
                <div className="c-subheader-nav">
                    {props.button}
                </div >
            </CSubheader>
        </CHeader>
    )
}

export default TheHeader
