import React, {Component} from 'react';
//import './Dropdown.css';
class Dropdown extends Component{
        constructor(props){
            super(props);
            this.state = {
                no: Math.floor(Math.random() * 100000) + 1,
                close: true
            }
        }

        shouldComponentUpdate(){
            return true
        }

        render(){
            const {placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected,className="", tabIndex=""} = this.props;
            let optionListData = optionList ? optionList.includes(",") ? optionList.split(",") : [optionList] : []; 
            let optionListValue = optionValue ? optionValue.includes(",")? optionValue.split(",") : [optionValue] : [];
            let lastIndex = optionListData.length - 1;
            let selectDropdownRef = null;
            const no = Math.floor(Math.random() * 100000) + 1;
            return(
                <React.Fragment>
                    <ul className={"select_dropdown "+className + " dropdown_closed" + (!this.state.close && (this.props.usedFor === "SalesOrderCreate") ? " dropDownForOrderLine" : "" )} ref={(selectDropdown) => { selectDropdownRef = selectDropdown }} style={ style } tabIndex={tabIndex} onKeyDown={(e) => {if(e.key === "Escape"){ this.refs["closeDropdown"].checked = true }}}>
                        <input ref="closeDropdown" className="select_dropdown_close" type="radio" name={"select" + placeHolder + this.state.no} id={"select-close" + placeHolder + this.state.no} value="" onClick={(e) => {getValue(e.target.value); this.setState({ close: true }); selectDropdownRef.className = "select_dropdown "+className + " dropdown_closed"}}  defaultChecked={firstChecked ? false : true}/>
                        <span className={"select_dropdown_label select_dropdown_label-placeholder" + (usedFor === "Datepicker" ? " select_datepicker_label select_datepicker_label-placeholder" : "")}>{placeHolder}</span>
                        
                        <li className="select_dropdown_items">
                            <input className={"select_dropdown_expand" + (usedFor === "Datepicker" ? " select_datepicker_expand" : "")} type="radio" name={"select" + placeHolder + this.state.no} value="" onClick={(e) => {getValue(e.target.value); selectDropdownRef.className = "select_dropdown "+className + (!this.state.close && (this.props.usedFor === "SalesOrderCreate") ? " dropDownForOrderLine" : "" )}} id={"select-opener" + placeHolder + this.state.no}/>
                            <label className="select_dropdown_closeLabel" htmlFor={"select-close" + placeHolder + this.state.no}></label>
                            
                            <ul className={"select_dropdown_options" + (optionList ? "" : " d-none") + (usedFor === "Datepicker" ? " select_datepicker_options" : "")}>
                                {/* {this.selectOption()} */}
                                {optionList ? optionListData.map((data, idx) => {
                                    if(idx === 0){
                                        return(
                                                <li key={idx + data} className="select_dropdown_option">
                                                    <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} onClick={(e) => {getValue(e.target.value, data); selectDropdownRef.className = "select_dropdown "+className + " dropdown_closed"}} id={"select-" + data + this.state.no} defaultChecked={optionSelected === data || optionSelected === optionListValue[idx] ? true : firstChecked}/>
                                                    <label className={"select_dropdown_label" + (usedFor === "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no} style={
                                                    {borderTopLeftRadius: "5px",
                                                    borderTopRightRadius: "5px"}}>{data}</label>
                                                </li>
                                        )
                                    }else if(idx === lastIndex){
                                        return(
                                                <li key={idx + data} className="select_dropdown_option">
                                                    <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} onClick={(e) => {getValue(e.target.value, data); selectDropdownRef.className = "select_dropdown "+className + " dropdown_closed"}} id={"select-" + data + this.state.no} defaultChecked={optionSelected === data || optionSelected === optionListValue[idx] ? true : false} />
                                                    <label className={"select_dropdown_label" + (usedFor === "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no} style={
                                                    {borderBottomLeftRadius: "5px",
                                                    borderBottomRightRadius: "5px"}}>{data}</label>
                                                </li>
                                        )
                                    }else{
                                        return(
                                                <li key={idx + data} className="select_dropdown_option">
                                                    <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} onClick={(e) => {getValue(e.target.value, data); selectDropdownRef.className = "select_dropdown "+className + " dropdown_closed"}} id={"select-" + data + this.state.no} defaultChecked={optionSelected === data || optionSelected === optionListValue[idx] ? true : false} />
                                                    <label className={"select_dropdown_label" + (usedFor  === "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no}>{data}</label>
                                                </li>
                                        )
                                    }
                                }) : null}
                
                                
                            </ul>
                            <label className="select_dropdown_expandLabel" htmlFor={"select-opener" + placeHolder + this.state.no} onClick={() => this.setState({ close: false })}></label>
                        </li>
                    </ul>
                </React.Fragment>
            )  
        }
        
}

export default Dropdown;