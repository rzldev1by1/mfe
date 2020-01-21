import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const moduleAccess = ({moduleAccess, onEnableClick}) => {

return (
  <div>
      <label className="text-bolder">Module Access</label>
      {
          moduleAccess.map((item,index) => {
            return (<div className="flex-column mb-2" key={index}>
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
