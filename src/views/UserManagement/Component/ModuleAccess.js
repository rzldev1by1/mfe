import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const moduleAccess = ({moduleAccess, onEnableClick, onSubmitHandler, onModuleEnableAll}) => {

return (
  <div>
        <div className="flex-column mr-2">
          <div className="row">
            <label className="col-6 title-label" htmlFor="moduleAccess">Module Access
            </label>
            <input className="checkbox-hidden" type="checkbox" id="moduleAccess"/>
            <div className="col-3">
                <button type="button" className="btn btn-outline-active mb-2" onClick={onModuleEnableAll}>Enabled All</button>
            </div>

          </div>
          <div className="row mb-2">
            <div className="col-6 line-border ml-3"></div>
            <div className="col-3 line-border"></div>
          </div>
        </div>
        
        {
            moduleAccess.map((item,index) => {

              return (<div className="flex-column mb-3 mr-2" key={index}>
                            <div className="row" key={index}>
                                <label className="col-6 section-value-text" key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order')?'Sales Orders':item.menuname}</label>
                                {
                                  /**
                                  <button type="button" className={"col-2 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive") }
                                  onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>
                                  **/
                                }

                                <input className="checkbox-hidden" type="checkbox" id={item.menuname} />
                                <div className="col-3">
                                    <button type="button" htmlFor={item.menuname}  className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                                </div>
                                <div className="col-3">
                                </div>
                            </div>
                      </div>)

            })
        }


  </div>

)



}

export default moduleAccess;
