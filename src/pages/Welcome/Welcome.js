import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderTitle from 'shared/container/TheHeader';
import Logo from '../../assets/img/LOGO1.png';
import LogoWhite from '../../assets/img/LOGO1_WHITE.png';
import './Welcome.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="welcome">
        <div className="darkLayer"></div>
        <HeaderTitle />
        <img src={this.props.customDarkMode ? LogoWhite : Logo} className="logo" alt="logo" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customDarkMode: state.customDarkMode,
  };
};
export default connect(mapStateToProps)(Welcome);
