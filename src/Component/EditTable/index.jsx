import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { showColumn, saveEdit, changedColumn, renameSubmit, headerRename } from './service';
import './index.scss';

const EditTable = ({ setEditColumnTemp, setTabActive, user, module, columnHidden, fields, setFields, splitModule }) => {
  const UrlHeader = () => {
    return `/settings/field-label/${splitModule}?client=ALL`;
  };

  const UrlAll = () => {
    return `/settings/field-label/${splitModule}?client=all`;
  };

  //Demesion
  const height = window.innerHeight - 420;

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState(1);
  const [state, setState] = React.useState({
    error: {},
    editColumn: [],
    sameColumns: [],
    sameColumnsIdx: [],
    changedColumns: [],
    columnsPayload: [],
  });

  // Error Massage
  const Required = ({ error, id }) => {
    const object = Object.keys(error);
    if (object.includes(id))
      return <span className="text-danger position-absolute font-rename-error">{error && error[id]}</span>;
    else return <div></div>;
  };

  // Use Effect
  useEffect(() => {
    headerRename({ UrlHeader, state, setState, fields, setFields });
  }, []);
  useEffect(() => {
    let newState = { ...state };
    newState.editColumn = columnHidden || [];
    setState(newState);
  }, [columnHidden]);
  return (
    <div>
      <CCard className={'mb-0'}>
        <CCardBody>
          <CRow>
            <CCol xs={12} style={{ color: '#B4B9BB', fontSize: '123%' }}>
              Edit Column
            </CCol>
          </CRow>
          <CRow className="px-3 py-2">
            <CCol xs={12}>
              <CRow className="tabContent">
                <CCol
                  xs={6}
                  className={`${activeTab == 1 ? 'tabActive' : 'tabNonActive'} py-2`}
                  onClick={() => setActiveTab(1)}
                >
                  TOGGLE COLUMN
                </CCol>
                <CCol
                  xs={6}
                  className={`${activeTab == 2 ? 'tabActive' : 'tabNonActive'} py-2`}
                  onClick={() => setActiveTab(2)}
                >
                  RENAME COLUMN
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          {activeTab == 1 ? (
            <div>
              <CRow style={{ height: height, overflowY: 'overlay' }}>
                {fields &&
                  fields.map((item) => {
                    return (
                      <CCol xs={12} className={`py-1`}>
                        <button
                          type
                          className={`text-left btn btn-block btn-toggle px-2 align-items-center d-flex
                                            ${
                                              !state.editColumn?.includes(item.accessor)
                                                ? 'btn-outline-primary'
                                                : 'btn-nonActive'
                                            }`}
                          onClick={() =>
                            showColumn({ header: item.accessor, length: fields.length, setState, state, module })
                          }
                        >
                          {!state.editColumn?.includes(item.accessor) ? (
                            <AiOutlineEye size={25} />
                          ) : (
                            <AiOutlineEyeInvisible size={25} style={{ color: 'rgb(151, 149, 149)' }} />
                          )}
                          <b
                            className="p-0 pl-1"
                            style={
                              !state.editColumn?.includes(item.accessor)
                                ? { color: '#3366ff' }
                                : { color: 'rgb(151, 149, 149)' }
                            }
                          >
                            {' '}
                            {item.Header}{' '}
                          </b>
                        </button>
                      </CCol>
                    );
                  })}
              </CRow>
            </div>
          ) : (
            <div>
              <CRow style={{ height: height, overflowY: 'overlay' }}>
                {fields &&
                  fields.map((item, index) => {
                    return (
                      <CCol key={index} xs={12} className={`py-1`}>
                        <input
                          type
                          id={index}
                          autoComplete="off"
                          className={
                            'text-left form-rename' +
                            (state.sameColumnsIdx?.includes(index.toString()) ? ' input-danger' : '')
                          }
                          placeholder={item.placeholder}
                          onChange={(e) => changedColumn({ e, state, setState, fields })}
                          name={item.Header}
                        />
                      </CCol>
                    );
                  })}
              </CRow>
              <CRow>
                <CCol xs={12}>
                  {fields &&
                    fields.map((item) => {
                      return <Required id={item.Header} error={state.error} />;
                    })}
                </CCol>
              </CRow>
            </div>
          )}
        </CCardBody>
      </CCard>
      {activeTab == 1 ? (
        <CRow className="pt-2">
          <CCol xs={12}>
            <button
              type
              className={`btn btn-save-edit w-100`}
              onClick={() => saveEdit({ state, title: module, user, setEditColumnTemp, setTabActive, dispatch })}
            >
              SAVE
            </button>
          </CCol>
        </CRow>
      ) : (
        <CRow>
          <CCol xs={12} className="pt-2">
            <button
              type
              className={`btn btn-save-edit w-100`}
              onClick={() => renameSubmit({ state, setState, setTabActive, UrlAll, fields, setFields })}
            >
              SAVE
            </button>
          </CCol>
        </CRow>
      )}
    </div>
  );
};

export default EditTable;
