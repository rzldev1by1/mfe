import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const moduleAccess = ({moduleAccess, onEnableClick}) => {

return (
  <div>
      <label className="text-bolder mr-2 title-label">Module Access
      </label>
      {
          moduleAccess.map((item,index) => {
            return (<div className="flex-column mb-3 mr-2" key={index}>
                          <div className="row" key={index}>
                              <label className="col-8" key={item.menuid}>{item.menuname}</label>
                              <button type="button" className={"col-2 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive") }
                              onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>
                              <div className="col-2">
                              </div>
                          </div>
                    </div>)

          })
      }
  </div>

)



}

export default moduleAccess;
