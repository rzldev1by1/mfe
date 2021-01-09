/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { onChangeHandler } from './services';

const DropdownAxios = ({
  isEmpty,
  placeholder,
  options,
  selectedValue,
  entryListIdx,
  onChangeDropdown,
  poListIdx,
  isDisabled,
  isLoading,
  className,
  onInputChange,
  showTitle = false,
  title = null,
  minChar = 3,
  required = false,
  readOnly,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isValue, setIsValue] = useState('');
  const elem = document?.getElementById(`dropdown${entryListIdx}${poListIdx}`);
  let position = elem?.getBoundingClientRect();

  useEffect(() => {
    if (selectedValue === 'empty') setIsOpen(true);
  }, [selectedValue, isEmpty]);

  useEffect(() => {
    if (isValue.length >= minChar) {
      onInputChange(isValue);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isValue]);

  return (
    <div>
      {!showTitle ? null : <label className={'text-muted mb-0 ' + (required ? 'required' : '')}>{title}</label>}
      <Select
        isClearable={!readOnly}
        isSearchable={!readOnly}
        openMenuOnClick={!readOnly}
        // isClearable={true}
        options={options && isOpen ? options : []}
        getOptionLabel={(option) => option.value + ' : ' + option.label}
        isLoading={isLoading}
        onInputChange={(val) => {
          setIsValue(val);
        }}
        menuIsOpen={isOpen}
        onChange={(val) => onChangeDropdown(val)}
        className={`c-400 ${isOpen ? 'absolute' : null}`}
        placeholder={placeholder}
        required={required}
        filterOption={(option, inputVal) => {
          return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase();
        }}
        styles={{
          option: (provided, state) => ({
            ...provided,
            textAlign: 'left',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            transform: isOpen ? 'rotate(180deg)' : null,
            display: isOpen ? 'flex' : 'none',
          }),
          menu: (base) => ({
            ...base,
            maxHeight: 230,
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 230,
          }),
          control: (provided, state) => ({
            ...provided,
            backgroundColor: readOnly ? '#e4e7ea !important' : 'white',
            pointerEvents: readOnly ? 'none' : 'auto',
            border: readOnly ? 0 : '',
            borderColor: '#e4e7ea !important',
            height: 50,
          }),
        }}
      />
    </div>
  );
};

export default DropdownAxios;