import React, {Component, useState} from 'react'
import '../../StockHolding/StockHolding.css'

const PurchaseOrderSearchExpand = (props) => {
    const [dropDown, setDropDown] = useState(false)
    const dropDownOnClick = () => {
        setDropDown(!dropDown)
    }  
    return (
        <div style={{margin:5, width:'100%'}} className={'animated fadeIn'}>
            {/* if onclick expand, add state to : expand-period-sm */}
            <ul style={{ width:'auto'}} className={"select-sm" + (dropDown ? " expand-period-sm" : "")} id={props.menu} onChange={()=>dropDownOnClick()}>
                <li className="expand-style-sm">
                    <input className="select_close-sm" type="radio" name={props.menu} id={props.menu+"-close"} value=""/>
                    <span className="select_label-sm select_label-placeholder-sm">{props.menu}</span>
                </li>
                
                <li className="select_items-sm">
                    <input className="select_expand-sm" type="radio" name={props.menu} id={props.menu+"-opener"}/>
                    <label className="select_closeLabel-sm" htmlFor={props.menu+"-close"}></label>
                    <ul className="select_options-sm" id={props.menu}>                        
                        {
                           
                            props.subMenu.map(subMenu => 
                                <li className="select_option-sm option-radius list">
                                    <input className="select_input-sm" type="radio" name={props.menu} id={subMenu}></input>
                                    <label className="select_label-sm" htmlFor={subMenu}>{subMenu}</label>
                                </li>
                                )
                        }                        
                    </ul>
                    <label className="select_expandLabel-sm" htmlFor={props.menu+"-opener"}></label>
                </li>
            </ul>                        
        </div>
    )
}

export default PurchaseOrderSearchExpand