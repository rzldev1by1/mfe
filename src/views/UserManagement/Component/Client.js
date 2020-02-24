import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const client = ({clients, onEnableClick}) => {
  function capitalizeFirstLetter(string) {
      let aText = string.toLowerCase();
      let text = aText.charAt(0).toUpperCase() + aText.slice(1)
      return text;
  }
return (<div>
      <label className="text-bolder mr-2">Client</label>
      {
        /**

      {
          clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          <div className="flex-row mb-3 mr-2" key={index}>
                              <label key={item.code}>{ capitalizeFirstLetter(item.name) }</label>
                              <button type="button" className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")+" float-right" } onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>
                          </div>
                    </div>)

          })
      }

      **/
    }



      <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons" >
        <label className="btn btn-outline-primary active">
            <input type="radio" className="form-control" value="aeosop" autoComplete="off" checked="true"/>  Client one
        </label>
        <label className="btn btn-outline-primary">
            <input type="radio" className="form-control" value="all" autoComplete="off"/> All client
        </label>
        </div>
      </div>

  </div>)

}

export default client;
