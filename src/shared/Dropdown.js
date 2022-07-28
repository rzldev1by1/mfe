import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no: Math.floor(Math.random() * 100000) + 1,
      close: true
    }
  }

  componentDidMount() {
    if (this.props.isOpen) { this.props.isOpen(false) }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected, className = "", tabIndex = "" } = this.props;
    let optionListData = ''
    if (optionList) {
      if (optionList.includes(",")) optionListData = optionList.split(",")
      else optionListData = [optionList]
    } else optionListData = []

    let optionListValue = ''
    if (optionValue) {
      if (optionValue.includes(",")) optionListValue = optionValue.split(",")
      else optionListValue = [optionValue]
    } else optionListValue = []

    const lastIndex = optionListData.length - 1;
    let selectDropdownRef = null;
    return (
      <>
        <ul
          ref={(selectDropdown) => selectDropdownRef = selectDropdown}
          style={style}
          tabIndex={tabIndex}
          className={`select_dropdown dropdown_closed ${className} ${!this.state.close && (this.props.usedFor == "SalesOrderCreate") ? " dropDownForOrderLine" : ""}`}
          onKeyDown={(e) => { if (e.key == "Escape") this.refs.closeDropdown.checked = true }}
          aria-hidden="true"
        >
          <input
            ref="closeDropdown"
            value=""
            className="select_dropdown_close"
            type="radio"
            name={`select${placeHolder}${this.state.no}`}
            id={`select-close${placeHolder}${this.state.no}`}
            onClick={(e) => {
              getValue(e.target.value);
              if (this.props.isOpen) this.props.isOpen(false);
              this.setState({ close: true });
              selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
            }}
            defaultChecked={firstChecked ? false : true}
          />

          <span className={`select_dropdown_label select_dropdown_label-placeholder ${usedFor == "Datepicker" ? " select_datepicker_label select_datepicker_label-placeholder" : ""}`}>
            {placeHolder}
          </span>

          <li className="select_dropdown_items">
            <input
              type="radio"
              id={`select-opener${placeHolder}${this.state.no}`}
              name={`select${placeHolder}${this.state.no}`}
              value=""
              className={`select_dropdown_expand  ${(usedFor == "Datepicker" ? " select_datepicker_expand" : "")}`}
              onClick={(e) => {
                getValue(e.target.value);
                if (this.props.isOpen) this.props.isOpen(true)
                selectDropdownRef.className = `select_dropdown ${className} ${!this.state.close && (this.props.usedFor == "SalesOrderCreate") ? " dropDownForOrderLine" : ""}`
              }}
            />
            <label className="select_dropdown_closeLabel" htmlFor={`select-close${placeHolder}${this.state.no}`} />

            <ul className={`select_dropdown_options ${optionList ? "" : " d-none"} ${usedFor == "Datepicker" ? " select_datepicker_options" : ""} ${this.props.showAll ? " showAllLists" : ""}`}>
              {optionList ? optionListData.map((data, idx) => {
                if (idx == 0) {
                  return (
                    <li key={data} className="select_dropdown_option">
                      <input
                        className="select_dropdown_input"
                        type="radio"
                        id={`select-${data}${this.state.no}`}
                        name={`select${placeHolder}${this.state.no}`}
                        value={optionListValue[idx]}
                        onClick={(e) => {
                          getValue(e.target.value, data);
                          if (this.props.isOpen) { this.props.isOpen(false) }
                          selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
                        }}
                        defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : firstChecked}
                      />
                      <label
                        className={`select_dropdown_label ${usedFor == "Datepicker" ? " select_datepicker_label" : ""}`}
                        htmlFor={`select-${data}${this.state.no}`}
                        style={{
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px"
                        }}
                      >
                        {data}
                      </label>
                    </li>
                  )
                }
                if (idx == lastIndex) {
                  return (
                    <li key={data} className="select_dropdown_option">
                      <input
                        className="select_dropdown_input"
                        type="radio"
                        id={`select-${data}${this.state.no}`}
                        name={`select${placeHolder}${this.state.no}`}
                        value={optionListValue[idx]}
                        onClick={(e) => {
                          getValue(e.target.value, data);
                          if (this.props.isOpen) { this.props.isOpen(false) }
                          selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
                        }}
                        defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false}
                      />
                      <label
                        className={`select_dropdown_label ${usedFor == "Datepicker" ? " select_datepicker_label" : ""}`}
                        htmlFor={`select-${data}${this.state.no}`}
                        style={{
                          borderBottomLeftRadius: "5px",
                          borderBottomRightRadius: "5px"
                        }}
                      >
                        {data}
                      </label>
                    </li>
                  )
                }
                return (
                  <li key={data} className="select_dropdown_option">
                    <input
                      className="select_dropdown_input"
                      type="radio"
                      id={`select-${data}${this.state.no}`}
                      name={`select${placeHolder}${this.state.no}`}
                      value={optionListValue[idx]}
                      onClick={(e) => {
                        getValue(e.target.value, data);
                        if (this.props.isOpen) { this.props.isOpen(false) }
                        selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
                      }}
                      defaultChecked={optionSelected == data || optionSelected == optionListValue[idx] ? true : false}
                    />
                    <label
                      className={`select_dropdown_label ${usedFor == "Datepicker" ? " select_datepicker_label" : ""}`}
                      htmlFor={`select-${data}${this.state.no}`}
                    >
                      {data}
                    </label>
                  </li>
                )
              }) : null}
            </ul>
            <label
              className="select_dropdown_expandLabel"
              htmlFor={`select-opener${placeHolder}${this.state.no}`}
              onClick={() => this.setState({ close: false })}
              aria-hidden="true"
            />
          </li>
        </ul>
      </>
    )
  }

}

export default Dropdown;