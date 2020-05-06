import React from 'react'
import '../UserManagement.css'

const client = ({clients, onEnableClick, onClientEnableAll}) => {
  function capitalizeFirstLetter(string) {
      let aText = string.toLowerCase();
      let text = aText.charAt(0).toUpperCase() + aText.slice(1)
      return text;
  }
return (<div>

      <div className="flex-column">
          <div className="row mr-2">
              <label className="col-6 title-label p-0" htmlFor="Client">Client
              </label>
              <input className="checkbox-hidden" type="checkbox" id="Client"/>
              <div className="col-3">
                  <button type="button" className="btn btn-outline-active mb-2" onClick={onClientEnableAll}>Enabled All</button>
              </div>
          </div>
          <div className="row mb-2">
              <div className="col-6 line-border"></div>
              <div className="col-3 line-border"></div>
            
          </div>
      </div>
      {
          clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          <div className="row mb-3 mr-2" key={index}>
                              <label className="col-6 section-value-text p-0" key={item.code}>{ capitalizeFirstLetter(item.name) }</label>
                             
                              <input className="checkbox-hidden" type="checkbox" id={item.code} />
                              <div className="col-3">
                                <button type="button" htmlFor={item.code}  className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")}  onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                              </div>
                              <div className="col-3">
                              </div>
                          </div>
                    </div>)

          })
      }

  </div>)

}

export default client;
