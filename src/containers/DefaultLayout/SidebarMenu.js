import React from 'react'
import { Redirect, Route, Switch, NavLink } from 'react-router-dom'


const SidebarMenu = (props) => {
    const {menuItems} = props;

  return (
    <div className="scrollbar-container sidebar-nav">
      <ul className="nav">
      {
       (menuItems)? menuItems.items.map((item,index)=>{
          return <li className="nav-item" key={item.key}>
          <NavLink className="nav-link"  activeClassName="active" to={item.url} >
              <i className={"nav-icon "+ item.icon}>
              </i>
              {item.name}
          </NavLink>
          </li>
        }):""
      }
      </ul>
    </div>
  )
}

export default SidebarMenu;
