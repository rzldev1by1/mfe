import React, { Component } from 'react'
import Logo from 'assets/img/brand/LOGO1.png';
import BackgroundHome from 'assets/img/brand/Home-Background.png';
import './Welcome.css'
class Welcome extends Component{
render(){
    return(
      <div>
          <img src={BackgroundHome} className="login-background" /> 
          <div className="leftSide content"> 
            <img src={Logo} className="mlslogo" /> 
          </div>
    </div>)
  }
}

export default Welcome;