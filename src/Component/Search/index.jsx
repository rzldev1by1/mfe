import React, { useState } from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'

const Search = ({
    placeholder = '',
    searchHandler = null, //function when search button clicked

    // filter 
    filterSite = null,
    filterClient = null,
    filterStatus = null,
    filterOrderType = null,
    filterTask = null
}) => {
    //params
    const [desc, setDesc] = useState(null)

    const search = (e) => {
        if (e.key === 'Enter') searchHandler(desc)
    }
    return (
        <CCard className="mb-3">
            <CCardBody className="p-3">
                <CRow className="mx-0">
                    <CCol lg={3} className="pr-3 pl-0">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
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
                            <CCol sm={4} lg={2} className='px-0'>
                                {filterSite}
                            </CCol>
                            <CCol sm={4} lg={2} className='px-3'>
                                {filterClient}
                            </CCol>
                            <CCol sm={4} lg={2} className='px-0'>
                                {filterStatus}
                            </CCol>
                            <CCol sm={4} lg={2} className='px-3'>
                                {filterOrderType}
                            </CCol>
                            <CCol sm={4} lg={2} className='px-0'>
                                {filterTask}
                            </CCol>
                            <CCol sm={4} lg={2} className="px-0">
                                <button className="btn btn-search btn-primary float-right" onClick={() => searchHandler()}>SEARCH</button>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default Search