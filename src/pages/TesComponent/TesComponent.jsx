import React, { useEffect, useState } from 'react'
import Search from 'Component/Search'
import Dropdown from 'Component/Dropdown'
import InputNumber from 'Component/InputNumber'
import { CRow, CCol } from '@coreui/react'
import Breadcrumb from 'Component/Breadcrumb'

export const category = [
    {
        label: 'VEGETABLES',
        value: '1',
    }, {
        label: 'FRUIT',
        value: '2',
    },
    {
        label: 'MEAT',
        value: '3',
    }
]

const TesComponent = () => {
    const filterSite = (
        <Dropdown
            showTitle={false}
            show={true}
            options={category}
            placeholder='site'
        />
    )
    const filterClient = (
        <Dropdown
            showTitle={false}
            show={true}
            options={category}
            placeholder='Client'
        />
    )
    const filterStatus = (
        <Dropdown showTitle={false}
            show={true}
            options={category}
            placeholder='Status'
        />
    )
    const filterOrderType = (
        <Dropdown showTitle={false}
            show={true}
            options={category}
            placeholder='Order Type'
        />
    )
    const filterTask = (
        <Dropdown showTitle={false}
            show={true}
            options={category}
            placeholder='Task'
        />
    )
    const [page, setPage] = useState({
        NumberFormat: [{}],

    })

    useEffect(() => {
        // setPaging({ page, setPage })
    }, [])

    let newPage = { ...page }
    // let data = datax.slice(newPage.startIndex, newPage.lastIndex);
    const dimention = document.documentElement.clientHeight
    const height = dimention - 285
    const emptyItem = dimention - 400
    return (
        <div className="inventory-data">
            <div>
                <Breadcrumb breadcrumb={[
                    { to: '/sales-orders', label: 'Tes Component' },
                    { to: '/purchase-order', label: 'wadidau', },
                    { to: '', label: 20, active: true },
                ]} />
            </div>
            <div >
                <Search
                    filterSite={filterSite}
                    filterClient={filterClient}
                    filterStatus={filterStatus}
                    filterOrderType={filterOrderType}
                    filterTask={filterTask}
                    placeholder={'Enter SKU'}
                    filter={true}
                />
            </div>
            <CRow className='pl-3'>
                <CCol lg={2} className="px-0">
                    <Dropdown
                        showTitle={false}
                        show={true}
                        options={category}
                        placeholder='Tes Dropdown'
                    />
                </CCol>
                <CCol lg={2} className="px-3">
                    <InputNumber
                        name="qty"
                        autoComplete="off"
                        type="text"
                        min="0"
                        className="form-control c-150"
                        placeholder="Qty"
                        maxLength="11"
                    />
                </CCol>
            </CRow>
            <div>
            </div>
            <div className="d-flex flex-column justify-content-between mt-3" style={{ minHeight: height, maxHeight: height }}>
            </div>
            <div className='mt-2'>
            </div>
        </div>
    )
}

export default TesComponent