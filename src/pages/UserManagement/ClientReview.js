import React from 'react'
import './UserManagement.css'

const clientReview = ({clients}) => {
    const disableAll = 'Disable All';
    const enableAll = 'Enable All';
    const enable = 'Enabled';
    const disable = 'Disabled';

  function capitalizeFirstLetter(string) {
      let aText = string.toLowerCase();
      let text = aText.charAt(0).toUpperCase() + aText.slice(1)
      return text;
  }
return (<div>

      <div className="flex-column">
          <div className="row">
              <label className="col-6 text-muted" htmlFor="Client">Client
              </label>
          </div>
      </div>
     
      <div className="client-areas">
      {
         (clients && clients.length)? clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          <div className="row mb-3" key={index}>
                              <label className="col-6 text-muted py-2 " key={item.code}>{ capitalizeFirstLetter(item.name) }</label>

                             <div className="col-6">
                              <button type="button" htmlFor={item.code} className={"px-1 "+((item.status)?"enable-active":"enable-notactive")}>{`${item.status?enable.toUpperCase():disable.toUpperCase()}`}</button>

                             </div>
                              
                          </div>
                    </div>)

          }):null
      }
      </div>
  </div>)

}

export default clientReview;
