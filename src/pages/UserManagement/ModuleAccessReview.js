import React, { Component } from 'react'
import './UserManagement.css'

const moduleAccessReview = ({moduleAccess}) => {
  
  const disableAll = 'Disable All';
  const enableAll = 'Enable All';
  const enable = 'Enabled';
  const disable = 'Disabled';
return (
  <div>
        <div className="flex-column mr-2">
          <div className="row">
              <label className="col-6 text-muted" htmlFor="moduleAccess">Module Access
              </label>
          </div>
        </div>
       
        {
            (moduleAccess && moduleAccess.length)?moduleAccess.map((item,index) => {

              return (<div className="flex-column mb-3 mr-2" key={index}>
                            <div className="row" style={{height:"40px"}} key={index}>
                                <label className="col-6 text-muted " key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order')?'Sales Orders':item.menuname}</label>

                                <div className="col-6">
                                  <button type="button" className={"px-1 "+((item.status)?"enable-active":"enable-notactive")}>{`${item.status?enable.toUpperCase():disable.toUpperCase()}`}</button>
                                </div>
                            </div>
                      </div>)

            }):null
        }


  </div>

)



}

export default moduleAccessReview;
