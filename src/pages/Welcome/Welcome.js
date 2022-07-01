import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderTitle from '../../shared/container/TheHeader';
import Logo from '../../assets/img/LOGO1.png';
import LogoWhite from '../../assets/img/LOGO1_WHITE.png';
import './Welcome.css';

class Welcome extends Component {

  render() {
    const { darkMode } = this
    return (
      <div className="welcome">
        <div className="darkLayer" />
        <HeaderTitle />
        <img src={darkMode ? LogoWhite : Logo} className="logo" alt="logo" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkModeMLS,
  };
};
export default connect(mapStateToProps)(Welcome);
