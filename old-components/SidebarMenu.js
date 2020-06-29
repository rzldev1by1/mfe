import React from 'react'
import { Redirect, Route, Switch, NavLink } from 'react-router-dom'


const SidebarMenu = (props) => {
    const {menuItems} = props;

  // return (
  //     <ul className="nav">
  //     {
  //      (menuItems)? menuItems.items.map((item,index)=>{
  //         return <li className="nav-item" key={item.key}>
  //         <NavLink className="nav-link"  activeClassName="active" to={item.url} >
  //             <i className={"nav-icon "+ item.icon}>
  //             </i> <i className={"nav-icon "}>
  //             </i>
  //             <div className="nav-name">{item.name}</div>
  //         </NavLink>
  //         </li>
  //       }):""
  //     }
  //     </ul> 
  // )

  return (
    <ul style={{listStyleType:"none", paddingLeft:'0px', textAlign:'center', paddingTop: '30px'}}>
    {
     (menuItems)? menuItems.items.map((item,index)=>{
        return <li className="nav-item" key={item.key}>
        <NavLink className="nav-link" activeClassName="active" to={item.url} >
            <i className={"nav-icon "+ item.icon}> </i>  
            <br /> 
            <div className="nav-name">{item.name}</div>
        </NavLink>
        </li>
      }):""
    }
    </ul> 
)

}

export default SidebarMenu;
