import React, { Component } from 'react'
import { Table, Button, Card, CardBody, Label } from 'reactstrap'
import './UserManagement.css'

const siteReview = ({ sites }) => {
    const disableAll = 'Disable All';
    const enableAll = 'Enable All';
    const enable = 'Enabled';
    const disable = 'Disabled';
    return (<div>
        <div className="flex-column mr-2">
            <div className="row">
                <label className="col-6 text-muted" htmlFor="Site">Site
                </label>
            </div>
        </div>


        {
           (sites && sites.length)? sites.map((item, index) => {
                return (<div className="flex-column mb-1 mr-2" key={index}>
                    <div className="row height-40" key={index}>
                        <label className="col-6 text-muted py-2" key={item.site}>{`${item.site} : ${item.name}`}</label>

                        <div className="col-6">
                            <button type="button" className={"px-1 no-outline " + ((item.status) ? "enable-active" : "enable-notactive")}>{`${item.status?enable.toUpperCase():disable.toUpperCase()}`}</button>
                        </div>
                    </div>
                </div>)
            }):null
        }
    </div>
    )

}

export default siteReview;
