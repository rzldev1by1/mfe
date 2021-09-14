import React from 'react';
import { useSelector } from 'react-redux';
import HeaderTitle from 'shared/container/TheHeader';
import Logo from '../../assets/img/LOGO1.png';
import LogoWhite from '../../assets/img/LOGO1_WHITE.png';
import './Welcome.css';

const Welcome = () => {
  const darkMode = useSelector((state) => state.darkModeMLS);
  const dataMode = darkMode?.map(d => { return d.dark_mode })
  return (
    <div className="welcome">
      <div className="darkLayer"></div>
      <HeaderTitle />
      <img src={dataMode == "1" ? LogoWhite : Logo} className="logo" alt="logo" />
    </div>
  );
};

export default Welcome;
