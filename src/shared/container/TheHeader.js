import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom'
import {
  CHeader,
  CSubheader,
  CSwitch,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CToggler
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import { DarkModeChange } from '../../apiService';

const TheHeader = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const darkModes = useSelector(state => state.darkModeMLS)
  // const [changeMode, setChangeMode] = useState(null);
  // const [valueMode, setValueMode] = useState(null);

  const signOut = async (e) => {
    dispatch({ type: 'LOGOUT' });
    const payload = { last_access: new Date().toLocaleString() };
    const ret = await axios.post('auth/logout', payload);
    return ret;
  };

  // useEffect(() => {
  //   if (changeMode) {
  //     const localMode = localStorage.getItem("darkModeLocal")
  //   }
  // }, [changeMode]);


  return (
    <CHeader withSubheader className="no-border no-shadow">
      <div className="header-mls-text">
        <Link to="/" className="text-logo text-white">Microlistics </Link>
        <div class="v-header-mls"></div>
      </div>

      <CSubheader className="bg-transparent acount-mls">
        <div className="mfe-2 c-subheader-nav">
          <CDropdown>
            <CDropdownToggle className="no-shadow alig-items-center pr-0 d-flex align-items-center">
              <div class="v-header-mls"></div>
              <div className="d-flex">
                <CIcon name="cil-user" className="icon-profil-user pl-2" />
                <div className="mx-3 text-left ">
                  <p className="my-0 ">{user?.name}</p>
                  <p className="my-0 ">{`${user.email} . ${user?.name}`}</p>
                </div>
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="drop-menu-profil p-0">
              <CDropdownItem className="menu-item-profil">User Details</CDropdownItem>
              <CDropdownItem className="menu-item-profil">Company License</CDropdownItem>
              <CDropdownItem className="menu-item-profil">Notification</CDropdownItem>
              <div className="m-info">
                <p className="my-0 py-2" style={{ paddingLeft: "6%" }}>
                  <div className=" d-flex pr-2 align-items-md-center">
                    <CIcon name="cil-moon" className="c-d-dark-none mr-2" alt="CoreUI Icons Moon" />
                    DarkMode
                    <div style={{ marginLeft: "53%" }}>
                      {/* <button onClick={() => DarkModeChange({ changeMode, setChangeMode })}>tes</button> */}
                      <CSwitch shape={'pill'} color={'secondary'} onClick={() => dispatch({ type: 'DARKMODE', data: !darkModes })} defaultChecked />
                    </div>
                  </div>
                </p>
              </div>
              <CDropdownItem className="menu-item-profil">Language</CDropdownItem>
              <CDropdownItem className="menu-item-profil" onClick={() => props.history.push('/settings')}>Settings</CDropdownItem>
              <CDropdownItem className="menu-item-profil" onClick={() => signOut()}>Logout</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
