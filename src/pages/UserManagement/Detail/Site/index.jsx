import React from 'react'
import '../index.scss';
import { onSiteStatusClick,
         onEnabledAllSite, } from '../service';

const site = ({sites, isEnableAllSite, state, setState}) => {

const disableAll = 'Disable All';
const enableAll = 'Enable All';
const enable = 'Enabled';
const disable = 'Disabled';

return (<div>
        <div className={`flex-column line-border mr-2 my-3 `}>
            <div className={`d-flex `}>
                <label className="col-6 text-muted-soft px-0 py-2" htmlFor="Site">Site</label>
                <div className="col-6">
                  <button 
                    type="button" 
                    className={`btn px-1 float-right mb-2 ${isEnableAllSite?'btn-outline-All-notActive':'btn-outline-All-active'} `} 
                    onClick={() => onEnabledAllSite({state, setState})}>
                        {`${isEnableAllSite ? disableAll.toUpperCase() : enableAll.toUpperCase()}`}
                    </button>
                </div>
            </div>
        </div>

          {(sites && sites.length) ? sites.map((item,index) => {
            return (<div className="flex-column mb-1 mr-2" key={index}>
            <div className="d-flex" key={index}>
                <label className="col-6 text-muted px-0 py-2" key={item.site}>{`${item.site}: ${item.name}`}</label>
                <div className="col-6">
                    <button 
                        type="button" 
                        htmlFor={item.site}  
                        className={"btn px-1 float-right " + ((item.status) ? "btn-outline-active" : "btn-outline-notActive")} 
                        onClick={(e)=>{onSiteStatusClick({e, index, state, setState });}}>
                      {`${item.status?enable.toUpperCase():disable.toUpperCase()}`}
                    </button>
                </div>
            </div>
            </div>)
          }) : null
        }
    </div>
)

}

export default site;
