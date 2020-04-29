import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const site = ({sites, onEnableClick}) => {

return (<div>
        <div className="flex-column mr-2">
            <div className="row">
                <label className="col-7 header-text-form" htmlFor="Site">Site
                </label>
                <input className="checkbox-hidden" type="checkbox" id="Site"/>
                <button type="button" className="col-4 btn btn-outline-active mb-2">Enabled All</button>

            </div>
        </div>
        <div className="d-flex border-bottom mr-2 mb-3">
        </div>

          {
            sites.map((item,index) => {
            return (<div className="flex-column mb-3 mr-2" key={index}>
            <div className="row" key={index}>
                <label className="col-7 section-value-text" key={item.site}>{item.site}</label>
                
                <input className="checkbox-hidden" type="checkbox" id={item.site} />
                <button type="button" htmlFor={item.site}  className={"col-4 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                <div className="col-1">
                </div>
            </div>
            </div>)
          })
        }


        

    </div>
)

}

export default site;
