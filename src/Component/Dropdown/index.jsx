/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const Dropdown = ({
    isEmpty,
    placeholder,
    options,
    selectedValue,
    entryListIdx,
    onChangeDropdown,
    poListIdx,
    isDisabled,
    className
}) => {
    const onChangeHandler = (selected) => {
        onChangeDropdown(selected)
        setIsOpen(false)
    }

    const [isOpen, setIsOpen] = useState()
    useEffect(() => {
        if (selectedValue === 'empty') setIsOpen(true)
    }, [selectedValue, isEmpty])

    const elem = document?.getElementById(`dropdown${entryListIdx}${poListIdx}`);
    let position = elem?.getBoundingClientRect()

    useEffect(() => {
        position = elem?.getBoundingClientRect()
    }, [isOpen])
    return (
      <Select
        className={className}
        isDisabled={isDisabled || false}
        id={`dropdown${entryListIdx}${poListIdx}`}
        value={selectedValue?.value ? selectedValue : false}
        menuIsOpen={isOpen}
        menuPortal
        placeholder={placeholder}
        options={options}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        onChange={onChangeHandler}
        menuPortalTarget={document.body}
        maxMenuHeight={200}
        menuPlacement={`${position?.bottom > 600 ? 'top' : 'bottom'}`}
            // isClearable={true}
        styles={{
                option: (provided) => ({
                    ...provided,
                    textAlign: 'left',
                    paddingLeft: '1rem'
                }),
                dropdownIndicator: (base, state) => ({
                    ...base,
                    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                    display: "flex",
                })
            }}
        theme={(theme) => ({
                ...theme,
                borderRadius: 4,
            })}
      />
    )
}

export default Dropdown