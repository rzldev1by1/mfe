import React from 'react'
import './UserManagement.css'

const site = ({sites, onEnableClick, onSiteEnableAll, isEnableAllSite}) => {

return (<div>
        <div className="flex-column mr-2">
            <div className="d-flex">
                <label className="col-6 title-label px-0" htmlFor="Site">Site
                </label>
                {/* <input className="checkbox-hidden" type="checkbox" id="Site"/> */}
                <div className="col-3">
                  <button type="button" className={`btn mb-2 ${isEnableAllSite?'btn-outline-All-notActive':'btn-outline-All-active'} `} onClick={onSiteEnableAll}>{(isEnableAllSite)?"Disable All":"Enabled All"}</button>
                </div>
                <div className="col-3">

                </div>
            </div>
            <div className="d-flex mb-2">
              <div className="col-6 line-border ml-3"></div>
              <div className="col-3 line-border"></div>
            </div>
        </div>
        

          {
            (sites && sites.length) ? sites.map((item,index) => {
            return (<div className="flex-column mb-3 mr-2" key={index}>
            <div className="d-flex" key={index}>
                <label className="col-6 section-value-text px-0" key={item.site}>{`${item.site} : ${item.name}`}</label>
                
                {/* <input className="checkbox-hidden" type="checkbox" id={item.site} /> */}
                <div className="col-3">
                    <button type="button" htmlFor={item.site}  className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                </div>
                <div className="col-3">
                  
                </div>
            </div>
            </div>)
          }) : null
        } 
    </div>
)

}

export default site;
