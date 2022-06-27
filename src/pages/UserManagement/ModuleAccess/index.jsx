import React from 'react';
import '../index.scss';
import { onModuleAccessClick, onEnabledAllModuleAccess } from '../services';

const ModuleAccess = ({ moduleAccess, isEnableAllModule, state, setState, isReadOnly, module }) => {
  const disableAll = 'Disable All';
  const enableAll = 'Enable All';
  const enable = 'Enabled';
  const disable = 'Disabled';

  const heightFirst = window.innerHeight - 680;
  const heightDetail = window.innerHeight - 510;

  // const filterModuleAccess = moduleAccess.filter((val) => val.menu_name !== 'Manage Supplier Users');
  return (
    <div>
      <div className='flex-column line-border mr-2 my-3'>
        <div className='d-flex'>
          <span className="col-6 text-muted-soft px-0 py-2" htmlFor="moduleAccess">
            Module Access
          </span>
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

      <div
        className="client-areas pr-3"
        style={
          module === 'detail'
            ? { height: heightDetail, minHeight: heightDetail }
            : { height: heightFirst, minHeight: heightFirst }
        }
      >
        {moduleAccess && moduleAccess.length
          ? moduleAccess.map((item, index) => {
            return (
              <div className="flex-column mb-1" key={index}>
                <div className="d-flex" key={index}>
                  <span className="col-6 text-muted px-0 py-2" key={item.menu_id}>
                    {item.menu_name.toLowerCase() === 'create sales order' ? 'Sales Orders' : item.menu_name}
                  </span>
                  <div className="col-6">
                    <button
                      type="button"
                      htmlFor={item.menu_name}
                      className={`btn px-1 float-right + ${!isReadOnly && item.status ? 'btn-outline-active' : 'btn-outline-notActive'} ${isReadOnly ? ' btn-review' : ''}`}
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

export default ModuleAccess;
