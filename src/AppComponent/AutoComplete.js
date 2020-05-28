import React, {Component, useState} from 'react';
import './AutoComplete.css';
class AutoComplete extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: null,
            datacount: [],
            no: Math.floor(Math.random() * 100000) + 1,
            data: "closeAutocomplete",
            optionSelected: null
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.optionSelected){
            if(this.state.data != "openAutocomplete"){
                this.setState({ data: "closeAutocomplete", optionSelected: newProps.optionSelected });
            }
        }
        if(newProps.optionList == this.props.optionList){
            return false
        }else{
            const {placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected} = newProps;
            let optionListData = optionList ? optionList.includes(",") ? optionList.split(",") : [optionList] : []; 
            let optionListValue = optionValue ? optionValue.includes(",")? optionValue.split(",") : [optionValue] : [];
            let lastIndex = optionListData.length - 1;
            this.setState({
                content: optionList ? optionListData.map((data, idx) => {
                    if(idx == lastIndex){
                        return(
                                <li key={idx + data} className="select_autocomplete_option">
                                    <input className="select_autocomplete_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} checked={this.state.data == optionListValue[idx] ? true : false} onChange={(e) => {getValue(e.target.value, data); this.setState({ data: e.target.value })}} id={"select-" + data + this.state.no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                    <label className={"select_autocomplete_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no} style={
                                    {borderBottomLeftRadius: "5px",
                                    borderBottomRightRadius: "5px"}}>{data}</label>
                                </li>
                        )
                    }else{
                        return(
                                <li key={idx + data} className="select_autocomplete_option">
                                    <input className="select_autocomplete_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} checked={this.state.data == optionListValue[idx] ? true : false} onChange={(e) => {getValue(e.target.value, data); this.setState({ data: e.target.value })}} id={"select-" + data + this.state.no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                    <label className={"select_autocomplete_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no}>{data}</label>
                                </li>
                        )
                    }
                }) : null
            })
        }
    }

    onChange = (e) => {
        const {placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected} = this.props;
        let optionListData = optionList ? optionList.includes(",") ? optionList.split(",") : [optionList] : []; 
        let optionListValue = optionValue ? optionValue.includes(",")? optionValue.split(",") : [optionValue] : [];
        let lastIndex = optionListData.length - 1;
        if(e){
            let datacount = []
            this.setState({
                content: optionList ? optionListData.map((data, idx) => {
                    if(data.substr(0, e.target.value.length).toUpperCase() == e.target.value.toUpperCase()){
                        datacount.push(data.substr(0, e.target.value.length))
                        if(idx >= (datacount.length - 1)){
                            return(
                                    <li key={idx + data} className="select_autocomplete_option">
                                        <input className="select_autocomplete_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} checked={this.state.data == optionListValue[idx] ? true : false} onChange={(e) => {getValue(e.target.value, data); this.setState({ data: e.target.value })}} id={"select-" + data + this.state.no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                        <label className={"select_autocomplete_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no} style={
                                        {borderBottomLeftRadius: "5px",
                                        borderBottomRightRadius: "5px"}}><strong>{data.substr(0, e.target.value.length)}</strong>{data.substr(e.target.value.length)}</label>
                                    </li>
                            )
                        }else{
                            return(
                                    <li key={idx + data} className="select_autocomplete_option">
                                        <input className="select_autocomplete_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} checked={this.state.data == optionListValue[idx] ? true : false} onChange={(e) => {getValue(e.target.value, data); this.setState({ data: e.target.value })}} id={"select-" + data + this.state.no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                        <label className={"select_autocomplete_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no}><strong>{data.substr(0, e.target.value.length)}</strong>{data.substr(e.target.value.length)}</label>
                                    </li>
                            )
                        }
                    }
                }) : null,
                datacount: datacount,
            })
            getValue(e.target.value);
        }else{
            this.setState({
                content: optionList ? optionListData.map((data, idx) => {
                    if(idx == lastIndex){
                        return(
                                <li key={idx + data} className="select_autocomplete_option">
                                    <input className="select_autocomplete_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} checked={this.state.data == optionListValue[idx] ? true : false} onChange={(e) => {getValue(e.target.value, data); this.setState({ data: e.target.value })}} id={"select-" + data + this.state.no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                    <label className={"select_autocomplete_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no} style={
                                    {borderBottomLeftRadius: "5px",
                                    borderBottomRightRadius: "5px"}}>{data}</label>
                                </li>
                        )
                    }else{
                        return(
                                <li key={idx + data} className="select_autocomplete_option">
                                    <input className="select_autocomplete_input" type="radio" name={"select" + placeHolder + this.state.no} value={optionListValue[idx]} checked={this.state.data == optionListValue[idx] ? true : false} onChange={(e) => {getValue(e.target.value, data); this.setState({ data: e.target.value })}} id={"select-" + data + this.state.no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                    <label className={"select_autocomplete_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + this.state.no}>{data}</label>
                                </li>
                        )
                    }
                }) : null
            })
        }
    }

    render(){
        const {placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected} = this.props;
        return(
            <React.Fragment>
                <ul className={"select_autocomplete " + (this.state.data == "closeAutocomplete" ? "autocomplete_closed" : "" ) + ((this.state.data == "openAutocomplete") && (this.props.usedFor == "SalesOrderCreate") ? " autoCompleteForOrderLine" : "" )} style={ style } tabIndex={this.props.tabIndex}>
                    <input type="text" ref="searchInput" id="search" style={ this.props.uppercase ? { textTransform: "uppercase" } : null} name="search" className={"form-control search-input-placeholder " + (this.state.data == "openAutocomplete" ? "search-input search-input-focus" : "")} onChange={(e) => {this.onChange(e);}} autoComplete="off" onFocus={(e) => {if(this.props.optionList == undefined) {getValue("")}; this.setState({ data: "openAutocomplete" });}} placeHolder={placeHolder} value={(this.state.data != "openAutocomplete") && (this.state.data != "closeAutocomplete") ? this.state.data : (this.props.optionSelected ? this.props.optionSelected : null)}/>
                    <input className="select_autocomplete_close" type="radio" name={"select" + placeHolder + this.state.no} id={"select-close" + placeHolder + this.state.no} checked={this.state.data == "closeAutocomplete" ? true : false} onChange={(e) => {this.setState({ data: "closeAutocomplete" })}} defaultChecked={firstChecked ? false : true}/>
                    {/* <span className={"select_autocomplete_label select_autocomplete_label-placeholder" + (usedFor == "Datepicker" ? " select_datepicker_label select_datepicker_label-placeholder" : "")}>{placeHolder}</span> */}
                    
                    <li className={"select_autocomplete_items" + (this.state.data != "openAutocomplete" ? " select_autocomplete_items_closed" : "")}>
                        <input className={"select_autocomplete_expand" + (usedFor == "Datepicker" ? " select_datepicker_expand" : "")} type="radio" checked={this.state.data == "openAutocomplete" ? true : false} name={"select" + placeHolder + this.state.no} value="" onChange={(e) => {this.setState({ data: e.target.value })}} id={"select-opener" + placeHolder + this.state.no}/>
                        <label className="select_autocomplete_closeLabel" htmlFor={"select-close" + placeHolder + this.state.no}></label>
                        
                        <ul className={"select_autocomplete_options" + (optionList ? "" : " d-none") + (usedFor == "Datepicker" ? " select_datepicker_options" : "")} 
                        // style={{overflow: "scroll", height: this.state.datacount.length * 40 + "px"}}
                        >
                            {/* {this.selectOption()} */}
                            {/* {optionValue ? 
                                <li className="select_autocomplete_option">
                                    <input type="text" id="search" style={ this.props.uppercase ? { textTransform: "uppercase" } : null} name="search" className="form-control search-input" onChange={(e) => this.onChange(e)} autoComplete="off">
                                    </input>
                                </li> 
                            : null} */}
                            {this.state.content}
            
                            {/* {console.log(this.state.data)} */}
                        </ul>
                        {/* <label className="select_autocomplete_expandLabel" htmlFor={"select-opener" + placeHolder + this.state.no}></label> */}
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default AutoComplete;