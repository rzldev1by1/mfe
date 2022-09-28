import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  CHeader,
  CSubheader,
  CSwitch,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import endpoints from '../../helpers/endpoints';
import { DarkModeChange } from '../../apiService';
import LogoDarkMode from '../../assets/img/logo-white.png';
import Logo from '../../assets/img/logo_export.png';

const TheHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.darkModeMLS);

  const signOut = async () => {
    dispatch({ type: 'LOGOUT' });
    const payload = { last_access: new Date().toLocaleString() };
    const ret = await axios.post('auth/logout', payload);
    return ret;
  };

  useMemo(async () => {
    const dataMode = await axios.get(`${endpoints.drakMode}/${user.webUser}`);
    dispatch({ type: 'DARKMODE', data: dataMode.data });
  }, []);
  const dataMode = darkMode?.map((d) => {
    return d.dark_mode;
  });
  return (
    <CHeader withSubheader className="no-border no-shadow">
      <div className="header-mls-text">
        <Link to="/" className="text-logo text-header pt-2 d-flex align-items-center">
          <div className="pr-3">
            {dataMode == '1' ? (
              <img src={LogoDarkMode} height="35" alt="logo" />
            ) : (
              <img src={Logo} height="48" alt="logo" />
            )}
          </div>
          Microlistics
        </Link>
      </div>

      <CSubheader className="bg-transparent acount-mls">
        <div className="mfe-2 c-subheader-nav">
          <CDropdown className="d-flex align-items-center" style={{ height: '69px' }}>
            <CDropdownToggle className="no-shadow alig-items-center pr-0 d-flex align-items-center">
              <div className="d-flex" style={{ marginLeft: '14%' }}>
                <span className="icon-group_4690 icon-profil-user" />
                <div className="mx-3 text-left ">
                  <p className="my-0 " style={{ fontSize: '118%' }}>
                    {user?.name}
                  </p>
                  <p className="my-0 ">{`${user.email} . ${user?.name}`}</p>
                </div>
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="drop-menu-profil p-0">
              <Link to={`/users-management/${user.webUser}/detail`} className="user-detail-link menu-item-profil p-0">
                <div className="menu-item-profil d-flex p-2">
                  <div className="d-flex" style={{ paddingRight: '45%' }}>
                    <span className="icon-icon_feather_users icon-drop-menu" />
                    <div>User Details</div>
                  </div>
                  <div>{user?.name} </div>
                </div>
              </Link>
              <div className="m-info">
                <p className="my-0 py-2" style={{ paddingLeft: '2%' }}>
                  <div className=" d-flex align-items-md-center">
                    <span className="icon-group_4799 icon-drop-menu" />
                    DarkMode
                    <div style={{ marginLeft: '40%' }}>
                      <CSwitch
                        shape="pill"
                        color="secondary"
                        variant="outline"
                        defaultChecked
                        className="switch-profil"
                        onClick={() => DarkModeChange({ darkMode, dispatch })}
                      />
                    </div>
                  </div>
                </p>
              </div>
              <CDropdownItem onClick={() => signOut()} className="menu-item-profil p-0">
                <div className="menu-item-profil d-flex p-2">
                  <span className="icon-log-out icon-drop-menu" />
                  <div className="d-flex align-items-md-center" style={{ paddingRight: '17rem' }}>
                    Logout
                  </div>
                </div>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
