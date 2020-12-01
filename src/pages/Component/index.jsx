import React, { useEffect, useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import Dropdown from 'Component/Dropdown'
import InputNumber from 'Component/InputNumber'

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

const Component = () => {
  
  
    useEffect(() => {
    }, [])

    const dimention = document.documentElement.clientHeight
    const height = dimention - 285
    const emptyItem = dimention - 400
    return (
        <div className="inventory-data">
            <CRow className='pl-3'>
                <CCol lg={2} className="px-0 py-3">
                    <Dropdown
                        showTitle={false}
                        show={true}
                        options={category}
                        placeholder='Tes Dropdown'
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol lg={2}>
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
            <div className="d-flex flex-column justify-content-between mt-3" style={{ minHeight: height, maxHeight: height }}>
            </div>
            <div className='mt-2'>
            </div>
        </div>
    )
}

export default Component