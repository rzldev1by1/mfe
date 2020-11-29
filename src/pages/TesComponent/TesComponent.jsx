import React, { useEffect, useState } from 'react'
import Search from 'Component/Search'
import Dropdown from 'Component/Dropdown'
import InputNumber from 'Component/InputNumber'
import Select from 'react-select'

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
        <InputNumber
            name="qty"
            autoComplete="off"
            type="text"
            min="0"
            className="form-control c-150"
            placeholder="Qty"
            maxLength="11"
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
        //Paging
        currentPage: 1,
        startIndex: 0,
        lastIndex: 10,
        displayPage: 10,
        totalRows: 0,
        maxPage: 0,
        value: [],
        notifPaging: false,
        // data: datax,
        show: false,

        // edit Columns
        showEdit: false,
        editColumn: {},
        editColumnTemp: {},

        //Drag and Drop
        reorder: localStorage.getItem("tables") ? JSON.parse(localStorage.getItem("tables")) : [],
        no: Math.floor(Math.random() * 100000) + 1
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
            <div >
                a
                <Search
                    filterSite={filterSite}
                    filterClient={filterClient}
                    filterStatus={filterStatus}
                    // filterOrderType={filterOrderType}
                    // filterTask={filterTask}
                    placeholder={'Enter SKU'}
                    filter={true}
                />
            </div>
            <div className="d-flex flex-column justify-content-between mt-3" style={{ minHeight: height, maxHeight: height }}>
                b
            </div>
            <div className='mt-2'>
                c
            </div>
        </div>
    )
}

export default TesComponent