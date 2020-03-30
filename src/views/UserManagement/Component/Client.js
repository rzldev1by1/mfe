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

      <div className="flex-column">
          <div className="row mr-2">
              <label className="col-8 text-bolder title-label" htmlFor="Client">Client
              </label>
              <input className="checkbox-hidden" type="checkbox" id="Client"/>
              <label className="col-3 btn btn-outline-active">Enabled All</label>

          </div>
      </div>
      <div className="d-flex border-bottom mr-2 mb-3">
      </div>


      {
          clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          <div className="row mb-3 mr-2" key={index}>
                              <label className="col-8" key={item.code}>{ capitalizeFirstLetter(item.name) }</label>
                              {
                                /**
                                <button type="button" className={"col-2 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")+" float-right" } onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>
                                */
                              }
                              <input className="checkbox-hidden" type="checkbox" id={item.code} />
                              <label htmlFor={item.code}  className={"col-3 btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")}  onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</label>
                              <div className="col-1">
                              </div>
                          </div>
                    </div>)

          })
      }




    {
      /**
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
      **/
    }

  </div>)

}

export default client;
