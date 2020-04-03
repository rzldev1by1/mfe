import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const moduleAccess = ({moduleAccess, onEnableClick, onSubmitHandler, onModuleEnableAll}) => {

return (
  <div>
        <div className="flex-column mr-2">
          <div className="row">
            <label className="col-8 header-text-form" htmlFor="moduleAccess">Module Access
            </label>
            <input className="checkbox-hidden" type="checkbox" id="moduleAccess"/>
            <button type="button" className="col-3 btn btn-outline-active mb-2" onClick={onModuleEnableAll}>Enabled All</button>

          </div>
        </div>
        <div className="d-flex border-bottom mr-2 mb-3">
        </div>
        {
            moduleAccess.map((item,index) => {

              return (<div className="flex-column mb-3 mr-2" key={index}>
                            <div className="row" key={index}>
                                <label className="col-8 section-value-text" key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order')?'Sales Orders':item.menuname}</label>
                                {
                                  /**
                                  <button type="button" className={"col-2 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive") }
                                  onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>
                                  **/
                                }

                                <input className="checkbox-hidden" type="checkbox" id={item.menuname} />
                                <button type="button" htmlFor={item.menuname}  className={"col-3 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                                <div className="col-1">
                                </div>
                            </div>
                      </div>)

            })
        }


  </div>

)



}

export default moduleAccess;
