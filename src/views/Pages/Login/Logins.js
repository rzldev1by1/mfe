import React, {Component} from 'react';
import AppComponent from '../../../AppComponent';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Row,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback
} from 'reactstrap';
import './Logins.css'
import axios from 'axios';
import centerLogo from '../../../assets/img/brand/Microlistics_WTG_White_Medium.png';
import userLogo from "../../../assets/img/brand/u.png";
import pricing from "../../../assets/img/brand/p.png";
import bookDemo from "../../../assets/img/brand/b.png";
import search from "../../../assets/img/brand/search.png";

class Logins extends Component{
    constructor(props) {
        super(props)

        this.state = {
            username: null, 
            password:null,
            userNull: false,
            passNull: false
        }
    }

    authenticateUser = () => {
			let usrIn = this.state.username;
            let pwdIn = this.state.password;
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
                this
                    .props
                    .history
                    .push('/stock')
            })
            .catch(function (error) {
                if(error)
                {
                    alert("Invalid Username/password");
                }
            });        
    }

    direct = () => {
        this.inputCheck()        
        }

    onUserNameChange = (e) => {
        this.setState({username: e.target.value})
        this.setState({userNull:false})
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
        this.setState({passNull:false})
    }

    required = (props) => {
        return(
        <div>{props.value + ' is required'}</div>
        )
    }

    inputCheck = () => {
        let username = this.state.username
        let password = this.state.password
        if(!username && !password)
        {
            this.setState({userNull:true})
            this.setState({passNull:true})
        }
        else if(!username)
        {
            this.setState({userNull:true})
        }
        else if(!password)
        {
            this.setState({passNull:true})
        }
        else{
            this.authenticateUser()
        }
    }
    render(){             
        return(
            <div className="background fontstyle">
                <table className="menu">
                    <tr>
                        <td><p>ABOUT</p></td>
                        <td><p>TECHNOLOGY</p></td>
                        <td><p>CONTACT</p></td>
                        <td><p>PRICING</p></td>
                        <td><p> | </p></td>
                        <td align="center"><img style={{width:'23%', marginTop:-20}} src={search}/></td>
                        <td><p>EN</p></td>
                    </tr>
                </table>
                <div className="leftSide">
                    <img src={centerLogo} style={{marginLeft:'3%', marginTop:'11%'}}/>
                    <h4 className="p" style={{marginLeft:'6%', marginRight:60, color:'white'}}>As such we can handle any size and/or type of warehouse</h4>
                    <h4 className="p" style={{marginLeft:'6%', marginRight:60, color:'white'}}>with the one system and allow the customer to grow without</h4>
                    <h4 className="p" style={{marginLeft:'6%', marginRight:60, color:'white'}}>needing to ever change the core application.</h4>

                    <div className="loginInput">
                        <input type="text" className="logininput" placeholder="Username" value={this.state.username} onChange={this.onUserNameChange}/>                        
                        {this.state.userNull ? <this.required value="username"/> : null}
                        <br/>
                        <input type="password" className="logininput" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}/>
                        {this.state.passNull ? <this.required value="password"/> : null}
                        <br/>
                        <input onClick={this.inputCheck} type="button" value="LOGIN"/>                        
                    </div>
                </div>

                <div style={{display:'flex', marginLeft:60}}>
                            <table className="labels">
                                <tr>
                                    <td rowSpan="2" className="icon" align="center"><img src={userLogo}/></td>
                                    <td className="texttop">Sign up</td>
                                </tr>
                                <tr>
                                    <td className="textbottom">Create an Account</td>
                                </tr>
                            </table>

                            <table className="labels">
                                <tr>
                                    <td rowSpan="2" className="icon" align="center"><img src={pricing}/></td>
                                    <td className="texttop">Pricing</td>
                                </tr>
                                <tr>
                                    <td className="textbottom">Pricing Option</td>
                                </tr>
                            </table>

                            <table className="labels">
                                <tr>
                                    <td rowSpan="2" className="icon" align="center"><img src={bookDemo}/></td>
                                    <td className="texttop">Book Demo</td>
                                </tr>
                                <tr>
                                    <td className="textbottom">See the products</td>
                                </tr>
                            </table>
                        </div>
                        <div className="footer">
                           Need more information?
                           <div style={{fontSize:30}}>help@microlistics.co.au</div>
                        </div>
                        <div style={{fontSize:15, color:'white', marginTop:'6%', marginLeft:'3%'}}>© Microlistics Logistics {new Date().getFullYear()}</div>
            </div>
        )
    }
}

export default Logins