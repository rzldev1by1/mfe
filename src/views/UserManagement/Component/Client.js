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
      <label className="text-bolder">Client</label>
      {
          clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          <div className="flex-row mb-2" key={index}>
                              <label key={item.code}>{ capitalizeFirstLetter(item.name) }</label>
                              <button type="button" className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")+" float-right" } onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enable":"Disable"}</button>
                          </div>
                    </div>)

          })
      }
  </div>)

}

export default client;
