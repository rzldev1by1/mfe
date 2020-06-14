import React, { Component } from 'react'
import Logo from 'assets/img/LOGO1.png';
import './Welcome.css'

class Welcome extends Component {
  render() {
    return <div className="welcome">
      <img src={Logo} className="logo" alt="logo" />
    </div>
  }
}

export default Welcome;