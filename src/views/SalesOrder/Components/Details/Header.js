import React, { Component } from 'react'

const Header = (props) => {

    return (
      <div className="d-flex">
          <div className="col border-right">
          <div className="row">
          <label className="col title-text">Site</label>
          <label className="col">A</label>
          </div>
          <div className="row">
           <label className="col title-text">Client</label>
           <label className="col">MLS </label>
          </div>
          <div className="row">
           <label className="col title-text">Order No</label>
           <label className="col">Order No </label>
          </div>
          <div className="row">
           <label className="col title-text">Date Due</label>
           <label className="col">A</label>
          </div>
          <div className="row">
            <label className="col title-text">Order Type</label>
            <label className="col">MLS </label>
          </div>
          <div className="row">
            <label className="col title-text">Supplied In Full</label>
            <label className="col">Order No </label>
          </div>
          <div className="row">
            <label className="col title-text">Consigment No</label>
            <label className="col">A</label>
          </div>
           <div className="row">
             <label className="col title-text">Freight Charge</label>
             <label className="col">MLS </label>
           </div>
           <div className="row">
             <label className="col title-text">Customer Order No</label>
             <label className="col">Order No </label>
           </div><div className="row">
             <label className="col title-text">Customer PO No</label>
             <label className="col">A</label>
           </div>
            <div className="row">
              <label className="col title-text">Ship To Name</label>
              <label className="col">MLS </label>
            </div>
          </div>

          <div className="col border-right">
                <div className="row">
                <label className="col title-text">Date Received</ label>
                <label className="col">A</label>
                </div>
                <div className="row">
                 <label className="col title-text">Date Released</label>
                 <label className="col">MLS </label>
                </div>
                <div className="row">
                 <label className="col title-text">Pick Start</label>
                 <label className="col">Order No </label>
                </div>
                <div className="row">
                 <label className="col title-text">Date Completed</label>
                 <label className="col">A</label>
                </div>
                <div className="row">
                  <label className="col title-text">Area</label>
                  <label className="col">MLS </label>
                </div>
                <div className="row">
                  <label className="col title-text">Customer Name</label>
                  <label className="col">Order No </label>
                </div>
                <div className="row">
                  <label className="col title-text">POD</label>
                  <label className="col">A</label>
                </div>
                 <div className="row">
                   <label className="col title-text">Arrival Date Scheduled</label>
                   <label className="col">MLS </label>
                 </div>
                 <div className="row">
                   <label className="col title-text">Arrival Date Actual</label>
                   <label className="col">Order No </label>
                 </div><div className="row">
                   <label className="col title-text">Departure Date Scheduled</label>
                   <label className="col">A</label>
                 </div>
                  <div className="row">
                    <label className="col title-text">Departure Date Actual</label>
                    <label className="col">MLS </label>
                  </div>
          </div>

          <div className="col">
              <div className="row">
                <label className="col title-text">Status</label>
                <label className="col">A</label>
              </div>
               <div className="row">
                 <label className="col title-text">Delivery Account</label>
                 <label className="col">MLS </label>
               </div>
               <div className="row">
                 <label className="col title-text">Accepted By</label>
                 <label className="col">Order No </label>
               </div>
               <div className="row">
                 <label className="col title-text">Signature Time</label>
                 <label className="col">A</label>
               </div>
                <div className="row">
                  <label className="col title-text">Data Loaded</label>
                  <label className="col">MLS </label>
                </div>
                <div className="row">
                  <label className="col title-text">Load Release</label>
                  <label className="col">Order No </label>
                </div>
                <div className="row">
                  <label className="col title-text">Loadout Start</label>
                  <label className="col">A</label>
                </div>
                 <div className="row">
                   <label className="col title-text">Loadout Finish</label>
                   <label className="col">MLS </label>
                 </div>
                 <div className="row">
                   <label className="col title-text">Line Count</label>
                   <label className="col">Order No </label>
                 </div>

            </div>

      </div>


    )
}

export default Header;
