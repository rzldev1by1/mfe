import React, { Component } from 'react'
import Logo from '../../assets/img/brand/portal.png';
import './Welcome.css'
class Welcome extends Component{
render(){
    return(
    <div className="portal">
        <div className="icon">
          <img src={Logo}/>
        </div>
    </div>)
  }
}

export default Welcome;