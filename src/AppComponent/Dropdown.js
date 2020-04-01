import React, {Component, useState} from 'react';
import './Dropdown.css';
const Dropdown = ({placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected}) => {
        let optionListData = optionList.includes(",") ? optionList.split(",") : [optionList]; 
        let optionListValue = optionValue.includes(",")? optionValue.split(",") : [optionValue];
        let lastIndex = optionListData.length - 1;
        const no = Math.floor(Math.random() * 100000) + 1;
        return(
            <React.Fragment>
                <ul className="select_dropdown filterDropdown" style={ style }>
                    <input className="select_dropdown_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" onClick={(e) => getValue(e.target.value)} defaultChecked={firstChecked ? false : true}/>
                    <span className={"select_dropdown_label select_dropdown_label-placeholder" + (usedFor == "Datepicker" ? " select_datepicker_label select_datepicker_label-placeholder" : "")}>{placeHolder}</span>
                    
                    <li className="select_dropdown_items">
                        <input className={"select_dropdown_expand" + (usedFor == "Datepicker" ? " select_datepicker_expand" : "")} type="radio" name={"select" + placeHolder + no} value="" onClick={(e) => getValue(e.target.value)} id={"select-opener" + placeHolder + no}/>
                        <label className="select_dropdown_closeLabel" htmlFor={"select-close" + placeHolder + no}></label>
                        
                        <ul className={"select_dropdown_options" + (optionList ? "" : " d-none") + (usedFor == "Datepicker" ? " select_datepicker_options" : "")}>
                            {/* {this.selectOption()} */}
                            {optionList ? optionListData.map((data, idx) => {
                                if(idx == 0){
                                    return(
                                            <li key={idx + data} className="select_dropdown_option">
                                                <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == idx ? true : firstChecked}/>
                                                <label className={"select_dropdown_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no} style={
                                                {borderTopLeftRadius: "5px",
                                                borderTopRightRadius: "5px"}}>{data}</label>
                                            </li>
                                    )
                                }else if(idx == lastIndex){
                                    return(
                                            <li key={idx + data} className="select_dropdown_option">
                                                <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == idx ? true : false} />
                                                <label className={"select_dropdown_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no} style={
                                                {borderBottomLeftRadius: "5px",
                                                borderBottomRightRadius: "5px"}}>{data}</label>
                                            </li>
                                    )
                                }else{
                                    return(
                                            <li key={idx + data} className="select_dropdown_option">
                                                <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == idx ? true : false} />
                                                <label className={"select_dropdown_label" + (usedFor ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no}>{data}</label>
                                            </li>
                                    )
                                }
                            }) : null}
            
                            
                        </ul>
                        <label className="select_dropdown_expandLabel" htmlFor={"select-opener" + placeHolder + no}></label>
                    </li>
                </ul>
            </React.Fragment>
        )
}

export default Dropdown;