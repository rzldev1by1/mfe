import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const moduleAccess = ({moduleAccess, onEnableClick, isLoaded}) => {

return (
  <div>
      <label className="text-bolder mr-2">Module Access
      </label>
      <i className= {(!isLoaded)?"fa fa-refresh fa-spin":"fa fa-refresh fa-spin d-none"}></i>
      {
          moduleAccess.map((item,index) => {
            return (<div className="flex-column mb-3 mr-2" key={index}>
                          <div className="flex-row" key={index}>
                              <label key={item.menuid}>{item.menuname}</label>
                              <button type="button" className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")+" float-right" }
                              onClick={(e)=>{onEnableClick(e);}}>{(item.status)?"Enable":"Disable"}</button>

                          </div>
                    </div>)

          })
      }
  </div>

)



}

export default moduleAccess;
