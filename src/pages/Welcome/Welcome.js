import React, { Component } from 'react'
import Logo from 'assets/img/brand/LOGO1.png';
import './Welcome.css'
class Welcome extends Component {
  render() {
    return <div className="welcome">
      <img src={Logo} className="mlslogo" alt="mlslogo" />
    </div>
  }
}

export default Welcome;