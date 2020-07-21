import React from 'react'
import './UserManagement.css'

const site = ({sites, onEnableClick, onSiteEnableAll, isEnableAllSite}) => {

const disableAll = 'Disable All';
const enableAll = 'Enable All';
const enable = 'Enabled';
const disable = 'Disabled';

return (<div>
        <div className="flex-column line-border mr-2 my-3">
            <div className="d-flex">
                <label className="col-6 text-muted px-0 py-2" htmlFor="Site">Site
                </label>
                {/* <input className="checkbox-hidden" type="checkbox" id="Site"/> */}
                <div className="col-6">
                  <button type="button" className={`btn px-1 float-right mb-2 ${isEnableAllSite?'btn-outline-All-notActive':'btn-outline-All-active'} `} onClick={onSiteEnableAll}>{`${isEnableAllSite?disableAll.toUpperCase():enableAll.toUpperCase()}`}</button>
                </div>               
            </div>           
        </div>
        

          {
            (sites && sites.length) ? sites.map((item,index) => {
            return (<div className="flex-column mb-3 mr-2" key={index}>
            <div className="d-flex" key={index}>
                <label className="col-6 text-muted px-0 py-2" key={item.site}>{`${item.site}: ${item.name}`}</label>
                
                {/* <input className="checkbox-hidden" type="checkbox" id={item.site} /> */}
                <div className="col-6">
                    <button type="button" htmlFor={item.site}  className={"btn px-1 float-right "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,index);}}>
                      {`${item.status?enable.toUpperCase():disable.toUpperCase()}`}
                    </button>
                </div>
                {/* <div className="col-1">
                  
                </div> */}
            </div>
            </div>)
          }) : null
        } 
    </div>
)

}

export default site;
