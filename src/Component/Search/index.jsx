/* eslint-disable max-len */
import React, { useState } from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'
import {useSelector, useDispatch} from 'react-redux'
import Dropdown from '../Dropdown'


const Search = ({
    placeholder = '',
    searchHandler = null, // function when search button clicked
    filterSite,
    filterClient,
    filterStatus,
    filterOrderType,
    filterTask
}) => {
    // params
    const [desc, setDesc] = useState(null)

    const search = (e) => {
        if (e.key === 'Enter') searchHandler(desc)
    }

    const dispatch = useDispatch()
    const site = useSelector(state => state.site)
    const client = useSelector(state => state.client)
    return (
      <CCard className="mb-3">
        <CCardBody className="p-3">
          <CRow className="mx-0">
            <CCol lg={3} className="pr-3 pl-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white">
                    <i className="iconU-search" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border-left-0 input-height"
                  placeholder={placeholder}
                  onChange={(e) => setDesc(e.target.value)}
                  onKeyPress={(e) => search(e)}
                  style={{ height: "100%" }}
                />
              </div>
            </CCol>
            <CCol lg={9} className="px-0">
              <CRow className="mx-0">
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterSite === true ? null : " d-none"}`}
                    show
                    placeholder='Site'
                    options={site}
                    onChange={(val) => dispatch({site: val})}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-3 ${filterClient === true ? null : " d-none"}`}
                    show
                    placeholder='Client'
                    options={client}
                    onChange={(val) => dispatch({client: val})}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterStatus === true ? null : " d-none"}`}
                    show
                    placeholder='Status'
                    // options={clientData}
                    // onChange={(val) => this.setClient(val)}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterOrderType === true ? null : " d-none"}`}
                    show
                    placeholder='Order Type'
                    // options={clientData}
                    // onChange={(val) => this.setClient(val)}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterTask === true ? null : " d-none"}`} 
                    show
                    placeholder='Task'
                    // options={clientData}
                    // onChange={(val) => this.setClient(val)}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <button
                    type="button"
                    className="btn btn-search btn-primary float-right"
                    onClick={() => searchHandler()}
                  >
                    SEARCH
                  </button>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    )
}

export default Search