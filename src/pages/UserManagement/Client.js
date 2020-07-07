import React from 'react'
import './UserManagement.css'

const client = ({clients, onEnableClick, onClientEnableAll, isEnableAllClient}) => {

  function capitalizeFirstLetter(string) {
      let aText = string.toLowerCase();
      let text = aText.charAt(0).toUpperCase() + aText.slice(1)
      return text;
  }
return (<div>

      <div className="flex-column">
          <div className="d-flex mr-2">
              <label className="col-6 p-0" htmlFor="Client">Client
              </label>
              {/* <input className="checkbox-hidden" type="checkbox" id="Client"/> */}
              <div className="col-3">
                    <button type="button" className={`btn mb-2 ${isEnableAllClient?'btn-outline-All-notActive':'btn-outline-All-active'} `} onClick={onClientEnableAll}>{(isEnableAllClient)?"Disable All":"Enabled All"}</button>
              </div>
              <div className="col-3">

              </div>
          </div>
          <div className="d-flex mb-2">
              <div className="col-6 line-border"></div>
              <div className="col-3 line-border"></div>
            
          </div>
      </div>
      {
         (clients && client.length)? clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          <div className="d-flex mb-3 mr-2" key={index}>
                              <label className="col-6 section-value-text p-0" key={item.code}>{ capitalizeFirstLetter(item.name) }</label>
                             
                              {/* <input className="checkbox-hidden" type="checkbox" id={item.code} /> */}
                              <div className="col-3">
                                <button type="button" htmlFor={item.code}  className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")}  onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                              </div>
                              <div className="col-3">
                              </div>
                          </div>
                    </div>)

          }):null
      }

  </div>)

}

export default client;
