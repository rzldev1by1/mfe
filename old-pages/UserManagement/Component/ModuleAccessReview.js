import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import '../UserManagement.css'

const moduleAccessReview = ({moduleAccess}) => {

return (
  <div>
        <div className="flex-column mr-2">
          <div className="row">
            <label className="col-6 review-title-label" style={{color:"#D5D8DA"}} htmlFor="moduleAccess">Module Access
            </label>
          </div>
        </div>
       
        {
            moduleAccess.map((item,index) => {

              return (<div className="flex-column mb-3 mr-2" key={index}>
                            <div className="row" style={{height:"40px"}} key={index}>
                                <label className="col-6 section-value-text" key={item.menuid}>{(item.menuname.toLowerCase() === 'create sales order')?'Sales Orders':item.menuname}</label>

                                <label className={"col-3 "+((item.status)?"enable-active":"enable-notactive")}>{(item.status)?"Enabled":"Disabled"}</label>
                                <div className="col-1">
                                </div>
                            </div>
                      </div>)

            })
        }


  </div>

)



}

export default moduleAccessReview;
