import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderTitle from '../../shared/container/TheHeader';
import Logo from '../../assets/img/LOGO1.png';
import LogoWhite from '../../assets/img/LOGO1_WHITE.png';
import endpoints from '../../helpers/endpoints';
import './Welcome.css';

const version = endpoints.env.REACT_APP_VERSION || '';
class Welcome extends Component {

  componentDidMount() {
    localStorage.setItem('version', version);
  }

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
