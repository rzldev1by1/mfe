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
              <div class="v-header-mls pr-3"></div>
              <div className="d-flex">
                <span className="icon-group_4690 icon-profil-user" />
                <div className="mx-3 text-left ">
                  <p className="my-0 ">{user?.name}</p>
                  <p className="my-0 ">{`${user.email} . ${user?.name}`}</p>
                </div>
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="drop-menu-profil p-0">
              <CDropdownItem className="menu-item-profil">
                <div className="menu-item-profil d-flex">
                  <span className="icon-icon_feather_users icon-drop-menu" />
                  <div className="d-flex align-items-md-center" style={{ paddingRight: "6rem" }}>User Details
                    <div style={{ marginLeft: "100%" }}>TTL </div>
                  </div>
                </div>
              </CDropdownItem>
              <CDropdownItem className="menu-item-profil">
                <div className="menu-item-profil d-flex">
                  <span className="icon-group_8 icon-drop-menu" />
                  <div className="d-flex pr-2 align-items-md-center">Company License
                    <div style={{ marginLeft: "45%" }} >Free</div>
                  </div>
                </div>
              </CDropdownItem>
              <CDropdownItem className="menu-item-profil">
                <div className="menu-item-profil d-flex">
                  <span className="icon-bell icon-drop-menu" />
                  <div className="d-flex align-items-md-center" style={{ paddingRight: "17rem" }}>Notification
                    <div style={{ marginLeft: "104%" }}> 445</div>
                  </div>
                </div>
              </CDropdownItem>
              <div className="m-info">
                <p className="my-0 py-2" style={{ paddingLeft: "6%" }}>
                  <div className=" d-flex align-items-md-center">
                    <span className="icon-group_4799 icon-drop-menu" />DarkMode
                    <div style={{ marginLeft: "40%" }}>
                      {/* <button onClick={() => DarkModeChange({ changeMode, setChangeMode })}>tes</button> */}
                      <CSwitch shape={'pill'} color={'secondary'} onClick={() => dispatch({ type: 'DARKMODE', data: !darkModes })} defaultChecked />
                    </div>
                  </div>
                </p>
              </div>
              <CDropdownItem>
                <div className="menu-item-profil d-flex">
                  <span className="icon-group_9 icon-drop-menu" />
                  <div className="d-flex  align-items-md-center">Language
                    <div style={{ marginLeft: "57%" }}> English US </div>
                  </div>
                </div>
              </CDropdownItem>
              <CDropdownItem onClick={() => signOut()}>
                <div className="menu-item-profil d-flex">
                  <span className="icon-log-out icon-drop-menu" />
                  <div className="d-flex align-items-md-center" style={{ paddingRight: "21rem" }}>Logout</div>
                </div>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
