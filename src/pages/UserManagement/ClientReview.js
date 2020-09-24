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

      <div className="flex-column line-border my-3">
          {/* <div className="row">
              <label className="col-6 text-muted" htmlFor="Client">Client
              </label>
          </div> */}
          <div className={`d-flex `}>
                <label className="text-muted-soft col-6 p-0 py-2" htmlFor="Client">Client
              </label>

                <div className="col-6 client-enableall-padding sub-header-review">
                    {/* <button type="button" className={`btn float-right px-1 mb-2 ${isEnableAllClient ? 'btn-outline-All-notActive' : 'btn-outline-All-active'} `} onClick={onClientEnableAll}>{`${isEnableAllClient ? disableAll.toUpperCase() : enableAll.toUpperCase()}`}</button> */}
                </div>

            </div>
      </div>

      <div className="client-areas">
      {
         (clients && clients.length)? clients.map((item,index) => {
            return (<div className="flex-column" key={index}>
                          {/* <div className="row mb-1" key={index}>
                              <label className="col-6 text-muted py-2 " key={item.code}>{`${item.code}: ${item.name}`}</label>

                             <div className="col-6">
                              <button type="button" htmlFor={item.code} className={"px-1 no-outline "+((item.status)?"enable-active":"enable-notactive")}>{`${item.status?enable.toUpperCase():disable.toUpperCase()}`}</button>

                             </div>

                          </div> */}
                            <div className="d-flex mb-1" key={index}>
                                <label className="text-muted col-6 section-value-text p-0 py-2 " key={item.code}>{`${item.code}: ${item.name}`}</label>

                                <div className="col-6">
                                    <button type="button" htmlFor={item.code} className={"btn px-1 float-right btn-review " + ("btn-outline-notActive")}>
                                        {`${item.status ? enable.toUpperCase() : disable.toUpperCase()}`}
                                    </button>
                                </div>

                            </div>
                    </div>)

          }):null
      }
      </div>
  </div>)

}

export default clientReview;
