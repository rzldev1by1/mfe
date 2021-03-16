import React from 'react';
import '../index.scss';
import { onClientStatusClick, onEnabledAllClient } from '../services';

const client = ({ clients, isEnableAllClient, state, setState, isReadOnly, module }) => {
  const disableAll = 'Disable All';
  const enableAll = 'Enable All';
  const enable = 'Enabled';
  const disable = 'Disabled';

  return (
    <div>
      <div className={`flex-column line-border mr-2 my-3`}>
        <div className={`d-flex `}>
          <label className="col-6 text-muted-soft px-0 py-2" htmlFor="Client">
            Client
          </label>
          <div className="col-6 pr-4">
            <button
              type="button"
              className={`btn px-1 float-right mb-2  ${
                isEnableAllClient ? 'btn-outline-All-notActive' : 'btn-outline-All-active'
              } ${isReadOnly ? 'd-none' : ''}`}
              onClick={() => onEnabledAllClient({ state, setState })}
            >
              {`${isEnableAllClient ? disableAll.toUpperCase() : enableAll.toUpperCase()}`}
            </button>
          </div>
        </div>
      </div>

      <div className="client-areas" >
        {clients && client.length
          ? clients.map((item, index) => {
              return (
                <div className="flex-column mb-1" style={{paddingRight:'1.5px'}} key={index}>
                  <div className="d-flex" key={index}>
                    <label className="col-6 text-muted px-0 py-2" key={item.code}>
                      {module === 'detail' ? `${item.code}: ${item.name}` : `${item.name}` }
                    </label>
                    <div className="col-6">
                      <button
                        type="button"
                        htmlFor={item.code}
                        className={
                          'btn px-1 float-right ' +
                          (!isReadOnly && item.status ? 'btn-outline-active' : 'btn-outline-notActive') +
                          (isReadOnly ? ' btn-review' : '')
                        }
                        onClick={(e) => {
                          onClientStatusClick({ e, index, state, setState });
                        }}
                      >
                        {`${item.status ? enable.toUpperCase() : disable.toUpperCase()}`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default client;
