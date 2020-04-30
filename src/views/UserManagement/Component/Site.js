import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const site = ({sites, onEnableClick}) => {

return (<div>
        <div className="flex-column mr-2">
            <div className="row">
                <label className="col-6 title-label" htmlFor="Site">Site
                </label>
                <input className="checkbox-hidden" type="checkbox" id="Site"/>
                <div className="col-3">
                  <button type="button" className="btn btn-outline-active mb-2">Enabled All</button>
                </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 line-border ml-3"></div>
              <div className="col-3 line-border"></div>
            </div>
        </div>
        

          {
            sites.map((item,index) => {
            return (<div className="flex-column mb-3 mr-2" key={index}>
            <div className="row" key={index}>
                <label className="col-7 section-value-text" key={item.site}>{item.site}</label>
                
                <input className="checkbox-hidden" type="checkbox" id={item.site} />
                <div className="col-3">
                    <button type="button" htmlFor={item.site}  className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
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

export default site;
