import React from 'react'
import Dropdown from '../Dropdown'
import './index.scss'
import {Col} from 'reactstrap'

export default function Dropdowns(props){
    const {data, placeHolder,zIndexes} = props 
    const [expand, setExpand] = React.useState(false)
    const [selected, setSelected] = React.useState(placeHolder) 

    const setExpandHandler = () => {
        setExpand(!expand)
    }

    const setSelectedHandler = (e) => {
        const code = e.target.textContent
        setSelected(code)
        setExpandHandler()
    }

    return(
        <React.Fragment>
            <div className='dd-title'>Title</div>
            <Col onClick={setExpandHandler} className='h-100 border rounded-lg align-middle form-control d-flex align-items-center font-medium mb-1 dd-main'>
            {selected}
            <div className={'select_dropdown_expand ' +(expand ? 'flip' : 'no-flip')}/>
            </Col>
            
            <div style={{zIndex:zIndexes}} className={expand ? 'border rounded-lg scroll dd-list ' : 'dd-list-hidden scroll'}>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
                <div onClick={(e) => setSelectedHandler(e)} className={expand ? 'dd-list-item' : 'dd-list-item-hidden'}>asdasd</div>
            </div>
        </React.Fragment>
    )
}