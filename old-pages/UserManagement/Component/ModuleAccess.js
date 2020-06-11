import React from 'react'
import '../UserManagement.css'

const moduleAccess = ({moduleAccess, onEnableClick, onSubmitHandler, onModuleEnableAll, isEnableAllModule}) => {
 
return (
  <div>
        <div className="flex-column mr-2">
          <div className="d-flex">
            <label className="col-6 title-label" htmlFor="moduleAccess">Module Access
            </label>
            <input className="checkbox-hidden" type="checkbox" id="moduleAccess"/>
            <div className="col-3">
              <button type="button" className={`btn mb-2 ${isEnableAllModule?'btn-outline-All-notActive':'btn-outline-All-active'} `} onClick={onModuleEnableAll}> {(isEnableAllModule)?"Disable All":"Enabled All"}</button>
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
            moduleAccess.map((item,index) => {

              return (<div className="flex-column mb-3 mr-2" key={index}>
                            <div className="d-flex" key={index}>
                                <label className="col-6 section-value-text" key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order')?'Sales Orders':item.menuname}</label>
                               
                                <input className="checkbox-hidden" type="checkbox" id={item.menuname} />
                                <div className="col-3">
                                    <button type="button" htmlFor={item.menuname}  className={"btn "+((item.status)?"btn-outline-active":"btn-outline-notActive")} onClick={(e)=>{onEnableClick(e,item);}}>{(item.status)?"Enabled":"Disabled"}</button>
                                </div>
                                <div className="col-3">
                                </div>
                            </div>
                      </div>)

            })
        }


  </div>

)



}

export default moduleAccess;
