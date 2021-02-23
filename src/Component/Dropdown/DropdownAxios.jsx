/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { onChangeHandler } from './services';
import RequiredMessage from 'Component/RequiredMessage';

const DropdownAxios = ({
  name,
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
  messageRequired,

  messageParam = { messageShow: false, messageData: {}, messageCustom: {} },
  parentDivClassName,
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
    <div className={parentDivClassName}>
      {!title ? null : <label className={'text-muted mb-0 ' + (required ? 'required' : '')}>{title}</label>}
      <Select
        isClearable={!readOnly}
        isSearchable={!readOnly}
        openMenuOnClick={!readOnly}
        value={selectedValue ? selectedValue : false}
        options={options && isOpen ? options : []}
        getOptionLabel={(option) => option.value + ' : ' + option.label}
        isLoading={isLoading}
        onInputChange={(val) => {
          setIsValue(val);
        }}
        menuIsOpen={isOpen}
        onChange={(val) => onChangeDropdown(val)}
        className={`c-400 ${isOpen ? 'absolute' : null} ${className}`}
        placeholder={placeholder || title}
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
            maxHeight: 210,
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 210,
          }),
          control: (provided, state) => ({
            ...provided,
            backgroundColor: readOnly ? '#e4e7ea !important' : 'white',
            pointerEvents: readOnly ? 'none' : 'auto',
            border: readOnly ? 0 : '',
            borderColor: '#e4e7ea !important',
            height: 50,
            boxShadow: 'none',
          }),
        }}
      />

      {!messageRequired ? null : (
        <RequiredMessage
          column={name}
          messageShow={messageParam?.messageShow}
          columnText={title || placeholder}
          value={messageParam?.value}
        />
      )}
    </div>
  );
};

export default DropdownAxios;
