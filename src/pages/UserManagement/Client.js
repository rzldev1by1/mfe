import React from 'react'
import './UserManagement.css'

const client = ({ clients, onEnableClick, onClientEnableAll, isEnableAllClient }) => {

    const disableAll = 'Disable All';
    const enableAll = 'Enable All';
    const enable = 'Enabled';
    const disable = 'Disabled';

    function capitalizeFirstLetter(string) {
        let aText = string.toLowerCase();
        let text = aText.charAt(0).toUpperCase() + aText.slice(1)
        return text;
    }
    return (<div className="client-areas">
        <div className="flex-column line-border my-3">
            <div className="d-flex mr-2">
                <label className="text-muted col-6 p-0" htmlFor="Client">Client
              </label>
                {/* <input className="checkbox-hidden" type="checkbox" id="Client"/> */}
                <div className="col-6">
                    <button type="button" className={`btn float-right px-1 mb-2 ${isEnableAllClient ? 'btn-outline-All-notActive' : 'btn-outline-All-active'} `} onClick={onClientEnableAll}>{`${isEnableAllClient?disableAll.toUpperCase():enableAll.toUpperCase()}`}</button>
                </div>
               
            </div>
           
        </div>
        {
            (clients && client.length) ? clients.map((item, index) => {
                return (<div className="flex-column" key={index}>
                    <div className="d-flex mb-3 mr-2" key={index}>
                        <label className="text-muted col-6 section-value-text p-0" key={item.code}>{capitalizeFirstLetter(item.name)}</label>

                        {/* <input className="checkbox-hidden" type="checkbox" id={item.code} /> */}
                        <div className="col-6">
                            <button type="button" htmlFor={item.code} className={"btn px-1 float-right " + ((item.status) ? "btn-outline-active" : "btn-outline-notActive")} onClick={(e) => { onEnableClick(e, index); }}>
                                {`${item.status? enable.toUpperCase():disable.toUpperCase()}`}
                            </button>
                        </div>
                        {/* <div className="col-3">
                        </div> */}
                    </div>
                </div>)

            }) : null
        }

    </div>)

}

export default client;
