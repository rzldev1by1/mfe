/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CHeader, CToggler, CSubheader, CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
// import CIcon from '@coreui/icons-react'

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch({ type: 'SIDEBAR', data: val });
  };
  const { button, breadcrumb } = props;

  return (
    <CHeader withSubheader className="no-border no-shadow" id="stockMovement">
      <CSubheader className="bg-transparent no-border no-shadow my-0">
        <CToggler inHeader className="p-0 d-lg-none" onClick={toggleSidebarMobile} />
        <CBreadcrumb
          className={`no-border no-shadow mr-auto m-0 py-3 ${
            breadcrumb[1]?.active ? '' : 'd-flex justify-content-between'
          } w-100 pr-0`}
        >
          {breadcrumb
            ? breadcrumb.map((b, i) => {
                return b.active ? (
                  <CBreadcrumbItem key={i} active>
                    {b.label}
                  </CBreadcrumbItem>
                ) : (
                  <CBreadcrumbItem key={i}>
                    <Link to={b.to}>{b.label}</Link>
                  </CBreadcrumbItem>
                );
              })
            : ''}
          {/* {userInfo ? (
              <CDropdown>
                <CDropdownToggle color="secondary" className="d-flex align-items-center p-3 border" style={{backgroundColor:"white", color:"black", boxShadow:"none"}}>
                  <i className="fa fa-user" aria-hidden="true" />
                  <div className="pl-2 text-left">
                    <p className="mb-0">{user.name}</p>
                    <h6 className="mb-0" style={{fontSize: "0.675rem"}}>
                      {user.email} 
                      {' '}
                      <span>.</span>
                      {' '}
                      <span>{user.userId}</span>
                    </h6>
                  </div>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Log Out</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            ) :  (
              <div className="c-subheader-nav">
                {button}
              </div>
            )} */}
          <div className="c-subheader-nav">{button}</div>
        </CBreadcrumb>
        {/* <div className="c-subheader-nav">
            {button}
          </div> */}
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
