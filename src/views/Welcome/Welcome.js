import React, { Component } from 'react'
import Logo from '../../assets/img/brand/portal.png';
class Welcome extends Component{
render(){
    return(<div style={{marginLeft:"20%" , marginTop:"10%"}}>
        <img src={Logo}/>
    </div>)
  }
}

export default Welcome;