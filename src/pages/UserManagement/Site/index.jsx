import React from 'react';
import '../index.scss';
import { onSiteStatusClick, onEnabledAllSite } from '../services';

const site = ({ sites, isEnableAllSite, state, setState, isReadOnly, module }) => {
  const disableAll = 'Disable All';
  const enableAll = 'Enable All';
  const enable = 'Enabled';
  const disable = 'Disabled';

  const heightFirst = window.innerHeight - 680;
  const heightDetail = window.innerHeight - 510;

  return (
    <div>
      <div className='flex-column line-border mr-2 my-3'>
        <div className='d-flex '>
          <span className="col-6 text-muted-soft px-0 py-2" htmlFor="Site">
            Site
          </span>
          <div className="col-6 pr-4">
            <button
              type="button"
              className={`btn px-1 float-right mb-2 ${isEnableAllSite ? 'btn-outline-All-notActive' : 'btn-outline-All-active'
                } ${isReadOnly ? 'd-none' : ''}`}
              onClick={() => onEnabledAllSite({ state, setState })}
            >
              {`${isEnableAllSite ? disableAll.toUpperCase() : enableAll.toUpperCase()}`}
            </button>
          </div>
        </div>
      </div>

      <div
        className="client-areas pr-3"
        style={module === 'detail' ?
          { height: heightDetail, minHeight: heightDetail } :
          { height: heightFirst, minHeight: heightFirst }}
      >
        {sites && sites.length
          ? sites.map((item, index) => {
            return (
              <div className="flex-column mb-1" key={item.site}>
                <div className="d-flex">
                  <span className="col-6 text-muted px-0 py-2">{module === 'detail' ? `${item.site}: ${item.name}` : `${item.name}`}</span>
                  <div className="col-6">
                    <button
                      type="button"
                      htmlFor={item.site}
                      className={`btn px-1 float-right + ${!isReadOnly && item.status ? 'btn-outline-active' : 'btn-outline-notActive'} ${isReadOnly ? ' btn-review' : ''}`}
                      onClick={(e) => {
                        if (!isReadOnly) onSiteStatusClick({ e, index, state, setState });
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

export default site;
