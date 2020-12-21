/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'
import Dropdown from '../Dropdown'
import {getSite, getClient, getStatus, getOrderType, getTask} from '../../apiService/dropdown'


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
    const dispatch = useDispatch()
    const [desc, setDesc] = useState(null)
    const siteData = useSelector(state => state.site)
    const clientData = useSelector(state => state.client)
    const statusData = useSelector(state => state.status)
    const orderTypeData = useSelector(state => state.orderType)
    const taskData = useSelector(state => state.task)
    const user = useSelector(state => state.user)
    const {company, client, site} = user

    const search = (e) => {
        if (e.key === 'Enter') searchHandler(desc)
    }

    useEffect(async () =>{
      if (!site) {
        await getSite({dispatch})
        await getClient({dispatch})
      }
      getStatus({dispatch})
      await getOrderType({dispatch, company, client})
      await getTask({dispatch, client, site})
    },[])

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
                    options={siteData}
                    onChange={(val) => dispatch({site: val})}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-3 ${filterClient === true ? null : " d-none"}`}
                    show
                    placeholder='Client'
                    options={clientData}
                    onChange={(val) => dispatch({client: val})}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterStatus === true ? null : " d-none"}`}
                    show
                    placeholder='Status'
                    options={statusData}
                    // onChange={(val) => this.setClient(val)}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterOrderType === true ? null : " d-none"}`}
                    show
                    placeholder='Order Type'
                    options={orderTypeData}
                    // onChange={(val) => this.setClient(val)}
                  />
                </CCol>
                <CCol sm={4} lg={2}>
                  <Dropdown
                    className={`px-0 ${filterTask === true ? null : " d-none"}`} 
                    show
                    placeholder='Task'
                    options={taskData}
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

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  filterSite: PropTypes.bool.isRequired,
  filterClient : PropTypes.bool.isRequired
}

export default Search