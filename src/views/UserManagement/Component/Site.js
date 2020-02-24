import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const site = ({sites, onEnableClick}) => {

return (<div>
        <label className="text-bolder mr-2">Site</label>

        {
          /**
          {
          sites.map((item,index) => {
          return (<div className="flex-column mb-3 mr-2" key={index}>
          <div className="flex-row" key={index}>
          <label key={item.site}>{item.site}</label>
          <button type="button" className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")+" float-right" }
          onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>

          </div>
          </div>)

        })
      }
          **/
        }

        <div>
          <div className="btn-group btn-group-toggle" data-toggle="buttons" >
          <label className="btn btn-outline-primary active">
              <input type="radio" className="form-control" value="M" autoComplete="off" checked="true"/>  Site one
          </label>
          <label className="btn btn-outline-primary">
              <input type="radio" className="form-control" value="all" autoComplete="off"/> All site
          </label>
          </div>
        </div>


    </div>
)

}

export default site;
