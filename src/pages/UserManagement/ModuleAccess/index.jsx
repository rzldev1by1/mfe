import React from 'react';
import '../index.scss';
import { onModuleAccessClick, onEnabledAllModuleAccess } from '../services';

const isDevelopment = process.env.REACT_APP_SUPPLIER;

const moduleAccess = ({ moduleAccess, isEnableAllModule, state, setState, isReadOnly, module }) => {
  const disableAll = 'Disable All';
  const enableAll = 'Enable All';
  const enable = 'Enabled';
  const disable = 'Disabled';

  const height = window.innerHeight - 700;
  const heightDetail = window.innerHeight - 530;

  // const filterModuleAccess = moduleAccess.filter((item) => { return isDevelopment === 'true' ? item : item.menu_id !== "menu_manageUsers_supplierUsers" })
  const filterModuleAccess = moduleAccess
  return (
    <div>
      <div className={`flex-column line-border mr-2 my-3`}>
        <div className={`d-flex `}>
          <label className="col-6 text-muted-soft px-0 py-2" htmlFor="moduleAccess">
            Module Access
          </label>
          <div className="col-6 pr-4">
            <button
              type="button"
              className={`btn px-1 float-right mb-2 ${isEnableAllModule ? 'btn-outline-All-notActive' : 'btn-outline-All-active'
                }  ${isReadOnly ? 'd-none' : ''} `}
              onClick={() => onEnabledAllModuleAccess({ state, setState })}
            >
              {`${isEnableAllModule ? disableAll.toUpperCase() : enableAll.toUpperCase()}`}
            </button>
          </div>
        </div>
      </div>

      <div className="client-areas pr-3"
        style={module === 'detail' ? { height: heightDetail, minHeight: heightDetail } : { height: height, minHeight: height }}>
        {moduleAccess && moduleAccess.length
          ? filterModuleAccess.map((item, index) => {
              return (
                <div className="flex-column mb-1" key={index}>
                  <div className="d-flex" key={index}>
                    <label className="col-6 text-muted px-0 py-2" key={item.menu_id}>
                      { item.menu_name.toLowerCase() === 'create sales order' ? 'Sales Orders' : 
                        item.menu_name.toLowerCase() === 'manage supplier users' ? 'Supplier Management' : item.menu_name}
                    </label>
                    <div className="col-6">
                      <button
                        type="button"
                        htmlFor={item.menu_name}
                        className={
                          'btn px-1 float-right ' +
                          (!isReadOnly && item.status ? 'btn-outline-active' : 'btn-outline-notActive') +
                          (isReadOnly ? ' btn-review' : '')
                        }
                        onClick={(e) => {
                          if (!isReadOnly) onModuleAccessClick({ e, index, state, setState });
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

export default moduleAccess;
