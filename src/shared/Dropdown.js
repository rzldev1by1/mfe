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
    const { isOpen } = this.props
    if (isOpen) { isOpen(false) }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { placeHolder, optionList, optionValue, style, getValue, firstChecked = false, usedFor, optionSelected, className = "", tabIndex = "", isOpen, showAll } = this.props;
    const { close, no } = this.state
    let optionListData = [];
    if (optionList) {
      if (optionList.includes(",")) optionListData = optionList.split(",")
      else optionListData = [optionList]
    }
    let optionListValue = [];
    if (optionList) {
      if (optionValue.includes(",")) optionListValue = optionValue.split(",")
      else optionListValue = [optionList]
    }
    const lastIndex = optionListData.length - 1;
    let selectDropdownRef = null;
    return (
      <>
        <ul
          className={`select_dropdown ${className} dropdown_closed ${!close && (usedFor === "SalesOrderCreate") ? " dropDownForOrderLine" : ""}`}
          ref={(selectDropdown) => { selectDropdownRef = selectDropdown }}
          style={style}
          tabIndex={tabIndex}
          onKeyDown={(e) => { if (e.key === "Escape") { this.refs.closeDropdown.checked = true } }}
          aria-hidden="true"
        >
          <input
            ref="closeDropdown"
            className="select_dropdown_close"
            type="radio"
            name={`select ${placeHolder} ${no}`}
            id={`select-close ${placeHolder} ${no}`}
            value=""
            onClick={(e) => {
              getValue(e.target.value); if (isOpen) { isOpen(false) } this.setState({ close: true });
              selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
            }}
            defaultChecked={firstChecked !== false}
          />
          <span
            className={`select_dropdown_label select_dropdown_label-placeholder ${usedFor === "Datepicker" ? "select_datepicker_label select_datepicker_label-placeholder" : ""}`}
          >
            {placeHolder}
          </span>

          <li className="select_dropdown_items">
            <input
              className={`select_dropdown_expand ${usedFor === "Datepicker" ? "select_datepicker_expand" : ""}`}
              type="radio"
              name={`select ${placeHolder} ${no}`}
              value=""
              onClick={(e) => {
                getValue(e.target.value); if (isOpen) { isOpen(true) }
                selectDropdownRef.className = `select_dropdown ${className} ${!close && (usedFor === "SalesOrderCreate") ? " dropDownForOrderLine" : ""}`
              }}
              id={`select-opener ${placeHolder} ${no}`}
            />
            <label className="select_dropdown_closeLabel" htmlFor={`select-close ${placeHolder} ${no}`} />

            <ul
              className={`select_dropdown_options ${optionList ? "" : "d-none"} ${usedFor === "Datepicker" ? "select_datepicker_options" : ""} ${showAll ? "showAllLists" : ""}`}
            >
              {optionList ? optionListData.map((data, idx) => {
                if (idx === 0) {
                  return (
                    <li key={data} className="select_dropdown_option">
                      <input
                        className="select_dropdown_input"
                        type="radio"
                        name={`select ${placeHolder} ${no}`}
                        value={optionListValue[idx]}
                        onClick={(e) => {
                          getValue(e.target.value, data);
                          if (isOpen) { isOpen(false) }
                          selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
                        }}
                        id={`select-${data}${no}`}
                        defaultChecked={optionSelected === data || optionSelected === optionListValue[idx] ? true : firstChecked}
                      />
                      <label
                        className={`select_dropdown_label ${usedFor === "Datepicker" ? "select_datepicker_label" : ""}`}
                        htmlFor={`select-${data}${no}`}
                        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
                      >
                        {data}
                      </label>
                    </li>
                  )
                } else if (idx === lastIndex) {
                  return (
                    <li key={data} className="select_dropdown_option">
                      <input
                        className="select_dropdown_input"
                        type="radio"
                        name={`select${placeHolder}${no}`}
                        value={optionListValue[idx]}
                        onClick={(e) => {
                          getValue(e.target.value, data);
                          if (isOpen) { isOpen(false) }
                          selectDropdownRef.className = `select_dropdown ${className} dropdown_closed"`
                        }}
                        id={`select-${data}${no}`}
                        defaultChecked={optionSelected === data || optionSelected === optionListValue[idx] ? true : false}
                      />
                      <label
                        className={`select_dropdown_label ${usedFor === "Datepicker" ? " select_datepicker_label" : ""}`}
                        htmlFor={`select-${data}${no}`}
                        style={{ borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}
                      >
                        {data}
                      </label>
                    </li>
                  )
                } else {
                  return (
                    <li key={data} className="select_dropdown_option">
                      <input
                        className="select_dropdown_input"
                        type="radio"
                        name={`select${placeHolder}${no}`}
                        value={optionListValue[idx]}
                        onClick={(e) => {
                          getValue(e.target.value, data);
                          if (isOpen) { isOpen(false) }
                          selectDropdownRef.className = `select_dropdown ${className} dropdown_closed`
                        }}
                        id={`select-${data}${no}`}
                        defaultChecked={optionSelected === data || optionSelected === optionListValue[idx] ? true : false}
                      />
                      <label
                        className={`select_dropdown_label ${usedFor === "Datepicker" ? "select_datepicker_label" : ""}`}
                        htmlFor={`select-${data}${no}`}
                      >
                        {data}
                      </label>
                    </li>
                  )
                }
              }) : null}


            </ul>
            <label
              className="select_dropdown_expandLabel"
              htmlFor={`select-opener${placeHolder}${no}`}
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