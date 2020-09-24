import React, { Component } from 'react'
import './UserManagement.css'

const moduleAccessReview = ({moduleAccess}) => {

  const disableAll = 'Disable All';
  const enableAll = 'Enable All';
  const enable = 'Enabled';
  const disable = 'Disabled';
return (
  <div>
        <div className="flex-column mr-2 line-border my-3">
          {/* <div className="row">
              <label className="col-6 text-muted font-lg" htmlFor="moduleAccess">Module Access
              </label>
          </div> */}

        <div className="d-flex">
            <label className="col-6 text-muted-soft px-0 py-2" htmlFor="moduleAccess">Module Access
                </label>

            <div className="col-6 sub-header-review">
                {/* <button type="button" className={`btn float-right px-1 mb-2 ${isEnableAllModule ? 'btn-outline-All-notActive' : 'btn-outline-All-active'} `} onClick={onModuleEnableAll}> {`${isEnableAllModule ? disableAll.toUpperCase():enableAll.toUpperCase()}`}</button> */}
            </div>

        </div>
        </div>

        {
            (moduleAccess && moduleAccess.length)?moduleAccess.map((item,index) => {

              return (<div className="flex-column mb-1 mr-2" key={index}>
                            {/* <div className="row height-40" key={index}>
                                <label className="col-6 text-muted py-2 font-lg " key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order')?'Sales Orders':item.menuname}</label>

                                <div className="col-6">
                                  <button type="button" className={"px-1 float-right font-lg no-outline "+((item.status)?"enable-active":"enable-notactive")}>{`${item.status?enable.toUpperCase():disable.toUpperCase()}`}</button>
                                </div>
                            </div> */}
                            <div className="d-flex" key={index}>
                                <label className="col-6 text-muted px-0 py-2" key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order') ? 'Sales Orders' : item.menuname}</label>


                                <div className="col-6">
                                    <button type="button" htmlFor={item.menuname} className={"btn float-right px-1 btn-review " + ("btn-outline-notActive")}>{`${item.status?enable.toUpperCase():disable.toUpperCase()}`}</button>
                                </div>

                            </div>

                      </div>)

            }):null
        }


  </div>

)



}

export default moduleAccessReview;
