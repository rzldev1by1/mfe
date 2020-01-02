import React, {Component} from 'react';
import AppComponent from '../../../AppComponent';
import {
    Button
} from 'reactstrap';
import './Logins.css'
import axios from 'axios';
import centerLogo from '../../../assets/img/brand/login_microlisticslogo@2x.png';
import videobg from '../../../assets/img/brand/microlisticsvideos.mp4';

class Logins extends Component{
    constructor(props) {
        super(props)

        this.state = {
            username: null, 
            password:null,
            loginClicked:false,
            loginValidation:true,
            
            logininputusername:'logininput',
            logininputpassword: 'logininput',

            iconusername:null,
            iconpassword:null
        }
    }
    loginValidation = () => {
        this.setState({loginValidation:false})
        this.setState({logininputusername:'logininputrequired'})
        this.setState({logininputpassword:'logininputrequired'})
        this.setState({iconusername:'iconU-i'})
        this.setState({iconpassword:'iconU-i'})
    }

    authenticateUser = () => {
			let usrIn = this.state.username;
            let pwdIn = this.state.password;
            var self = this
            // "userid":"MLS12345",
            // "password":"password"
            axios({
                method: 'post',
                url: AppComponent.getBaseUrl() + "userlogin",
                data: {
                    "userid": usrIn,
                    "password":pwdIn
                }
            })
            .then(res => {
              // console.log(res.data);
                localStorage.setItem("companyCode",res.data.data.companyCode);
                localStorage.setItem("userLevel",res.data.data.userLevel);
                localStorage.setItem('token',res.data.data.token);
                self.props.history.push('/stock')
            })
            .catch(function (error) {
                if(error){
                    self.loginValidation()
                }
                
            });        
    }

    direct = () => {
        this.inputCheck()        
        }

    onUserNameChange = (e) => {
        this.setState({username: e.target.value})
        this.setState({loginClicked:false})
        this.setState({loginValidation:true})
        this.setState({logininputusername:'logininput'})
        this.setState({iconusername:null})
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
        this.setState({loginClicked:false})
        this.setState({loginValidation:true})
        this.setState({logininputpassword:'logininput'})
        this.setState({iconpassword:null})
    }

    required = (props) => {
        return(
        <div className='textAlert'>{props.value + ' is required'}</div>
        )
    }

    inputCheck = () => {
        let username = this.state.username
        let password = this.state.password
        if(!username && !password)
        {
            this.setState({loginClicked:true})
            this.setState({logininputusername:'logininputrequired'})
            this.setState({logininputpassword:'logininputrequired'})
            this.setState({iconusername:'iconU-i'})
            this.setState({iconpassword:'iconU-i'})
        }
        else if(!username)
        {
            this.setState({loginClicked:true})
            this.setState({logininputusername:'logininputrequired'})
            this.setState({iconusername:'iconU-i'})
        }
        else if(!password)
        {
            this.setState({loginClicked:true})
            this.setState({logininputpassword:'logininputrequired'})
            this.setState({iconpassword:'iconU-i'})
        }
        else{
            this.authenticateUser()
        }
    }

    classalerthandler = () => {        
        this.setState({logininputclass:'logininputrequired'})
    }

    alertComponent = () => {
        let value = null

        if(!this.state.username && !this.state.password)
        {
            value = 'Username and Password'
        }
        else if(!this.state.username)
        {
            value = 'Username'
        }
        else if(!this.state.password)
        {
            value = 'Password'
        }
        if(this.state.loginClicked)
        {
            if(!this.state.username || !this.state.password)
            {
                return(
                    <div className='alertFadeIn' style={{display:'flex'}}>
                       <div className=' iconU-i'/><div style={{marginLeft:'0.5%'}}>{value + ' is required'}</div>
                    </div>
                )
            }
        }
        else if(this.state.username && this.state.password && this.state.loginValidation == false )
        {
            
            return(
                <div className='alertFadeIn' style={{display:'flex'}}>
                   <div className=' iconU-i'/><div style={{marginLeft:'0.5%'}}>{'Invalid username or password'}</div>
                </div>
            )
        }

        else{
            return(
                <div className='errormessage'/>
            )
        }
        
    }
    render(){             
        return(
            <div className="background fontstyle">
                <video autoPlay muted loop id='bgvideo'>
                    <source src={videobg} type='video/mp4'/>
                </video>
                <div className="leftSide content">
                    <img src={centerLogo} className='mlslogo'/>
                    <div className="loginInput">
                        <div style={{marginBottom:'2%'}}><h1>Login</h1></div>
                        <div className={this.state.logininputusername +' inputWrap'}><input type="text" className='inputlog' placeholder="Username" value={this.state.username} onChange={this.onUserNameChange}/><label className={this.state.iconusername + ' requiredlabel'}/></div>
                        <br/>
                        <div className={this.state.logininputpassword +' inputWrap'}><input type="password" className='inputlog' placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}/><label className={this.state.iconpassword + ' requiredlabel'}/></div>
                        <this.alertComponent/>
                        <input onClick={this.inputCheck} type="button" value="Login"/>                            
                        <div className="footer">
                            <div>help@microlistics.co.au</div>
                            <div style={{width:'78%',float:'right'}}>© Microlistics Logistics {new Date().getFullYear()}</div>
                        </div>              
                    </div>
                     
                </div>
            </div>
        )
    }
}

export default Logins