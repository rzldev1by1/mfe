import React, {Component, useState} from 'react';
import './AutoComplete.css';
const no = Math.floor(Math.random() * 100000) + 1;
class AutoComplete extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: null,
            datacount: []
        }
    }

    componentWillReceiveProps(){
        const {placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected} = this.props;
        let optionListData = optionList ? optionList.includes(",") ? optionList.split(",") : [optionList] : []; 
        let optionListValue = optionValue ? optionValue.includes(",")? optionValue.split(",") : [optionValue] : [];
        let lastIndex = optionListData.length - 1;
        this.setState({
            content: optionList ? optionListData.map((data, idx) => {
                if(idx == lastIndex){
                    return(
                            <li key={idx + data} className="select_dropdown_option">
                                <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value, data)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                <label className={"select_dropdown_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no} style={
                                {borderBottomLeftRadius: "5px",
                                borderBottomRightRadius: "5px"}}>{data}</label>
                            </li>
                    )
                }else{
                    return(
                            <li key={idx + data} className="select_dropdown_option">
                                <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                <label className={"select_dropdown_label" + (usedFor ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no}>{data}</label>
                            </li>
                    )
                }
            }) : null
        })
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
                                    <li key={idx + data} className="select_dropdown_option">
                                        <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value, data)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                        <label className={"select_dropdown_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no} style={
                                        {borderBottomLeftRadius: "5px",
                                        borderBottomRightRadius: "5px"}}><strong>{data.substr(0, e.target.value.length)}</strong>{data.substr(e.target.value.length)}</label>
                                    </li>
                            )
                        }else{
                            return(
                                    <li key={idx + data} className="select_dropdown_option">
                                        <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                        <label className={"select_dropdown_label" + (usedFor ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no}><strong>{data.substr(0, e.target.value.length)}</strong>{data.substr(e.target.value.length)}</label>
                                    </li>
                            )
                        }
                    }
                }) : null,
                datacount: datacount
            })
        }else{
            this.setState({
                content: optionList ? optionListData.map((data, idx) => {
                    if(idx == lastIndex){
                        return(
                                <li key={idx + data} className="select_dropdown_option">
                                    <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value, data)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                    <label className={"select_dropdown_label" + (usedFor == "Datepicker" ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no} style={
                                    {borderBottomLeftRadius: "5px",
                                    borderBottomRightRadius: "5px"}}>{data}</label>
                                </li>
                        )
                    }else{
                        return(
                                <li key={idx + data} className="select_dropdown_option">
                                    <input className="select_dropdown_input" type="radio" name={"select" + placeHolder + no} value={optionListValue[idx]} onClick={(e) => getValue(e.target.value)} id={"select-" + data + no} defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false} />
                                    <label className={"select_dropdown_label" + (usedFor ? " select_datepicker_label" : "")} htmlFor={"select-" + data + no}>{data}</label>
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
                <ul className="select_dropdown" style={ style }>
                    <input className="select_dropdown_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" onClick={(e) => getValue(e.target.value)} defaultChecked={firstChecked ? false : true}/>
                    <span className={"select_dropdown_label select_dropdown_label-placeholder" + (usedFor == "Datepicker" ? " select_datepicker_label select_datepicker_label-placeholder" : "")}>{placeHolder}</span>
                    
                    <li className="select_dropdown_items">
                        <input className={"select_dropdown_expand" + (usedFor == "Datepicker" ? " select_datepicker_expand" : "")} type="radio" name={"select" + placeHolder + no} value="" onClick={(e) => getValue(e.target.value)} id={"select-opener" + placeHolder + no}/>
                        <label className="select_dropdown_closeLabel" htmlFor={"select-close" + placeHolder + no}></label>
                        
                        <ul className={"select_dropdown_options" + (optionList ? "" : " d-none") + (usedFor == "Datepicker" ? " select_datepicker_options" : "")} 
                        // style={{overflow: "scroll", height: this.state.datacount.length * 40 + "px"}}
                        >
                            {/* {this.selectOption()} */}
                            {optionValue ? 
                                <li className="select_dropdown_option">
                                    <input type="text" id="search" style={ this.props.uppercase ? { textTransform: "uppercase" } : null} name="search" className="form-control search-input" onChange={(e) => this.onChange(e)} autoComplete="off"></input>
                                </li> 
                            : null}
                            {this.state.content}
            
                            
                        </ul>
                        <label className="select_dropdown_expandLabel" htmlFor={"select-opener" + placeHolder + no}></label>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default AutoComplete;