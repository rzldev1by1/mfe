/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Dropdown.scss';
import RequiredMessage from 'Component/RequiredMessage';

const Dropdown = ({
  name,
  isEmpty,
  placeholder,
  options,
  selectedValue,
  entryListIdx,
  onChangeDropdown,
  poListIdx,
  isDisabled,
  className,
  onMenuOpen,
  onMenuClose,
  showTitle,
  title = null,
  required,
  readOnly,
  messageRequired,
  messageParam = { messageShow: false, messageData: {}, messageCustom: {} },
}) => {
  const [isOpen, setIsOpen] = useState();
  const onChangeHandler = (selected, action) => {
    setIsOpen(false);
    if (action === 'clear') {
      onChangeDropdown(null);
    } else {
      onChangeDropdown(selected);
    }
  };
  useEffect(() => {
    if (selectedValue === 'empty') setIsOpen(true);
  }, [selectedValue, isEmpty]);
  const elem = document?.getElementById(`dropdown${entryListIdx}${poListIdx}`);
  let position = elem?.getBoundingClientRect();

  useEffect(() => {
    position = elem?.getBoundingClientRect();

    if (onMenuOpen && isOpen === false) {
      onMenuClose();
    } else if (onMenuClose && isOpen === true) {
      onMenuOpen();
    }
  }, [isOpen]);
  
  return (
    <div>
      {!showTitle ? null : <label className={`text-muted mb-0 ${required ? 'required' : ''}`}>{title}</label>}
      <Select
        className={className}
        isDisabled={isDisabled || false}
        isClearable={!readOnly}
        isSearchable={!readOnly}
        openMenuOnClick={!readOnly}
        // id={entryListIdx`dropdown${entryListIdx}${poListIdx}`}
        value={selectedValue?.value ? selectedValue : false}
        menuIsOpen={isOpen}
        menuPortal
        placeholder={placeholder}
        options={options}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        onChange={(val, { action }) => onChangeHandler(val, action)}
        // menuPortalTarget={document.body}
        maxMenuHeight={200}
        menuPlacement={`${position?.bottom > 600 ? 'top' : 'bottom'}`}
        filterOption={(option, inputVal) => {
          return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase();
        }}
        styles={{
          option: (provided) => ({
            ...provided,
            textAlign: 'left',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            display: readOnly || selectedValue ? 'none' : 'flex',
          }),
          control: (provided) => ({
            ...provided,
            backgroundColor: readOnly ? '#e4e7ea !important' : 'white',
            pointerEvents: readOnly ? 'none' : 'auto',
            border: readOnly ? 0 : '',
            borderColor: '#e4e7ea !important',
            height: 50,
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
        })}
      />

      {!messageRequired ? null : (
        <RequiredMessage column={name} messageShow={messageParam?.messageShow} data={messageParam?.messageData} />
      )}
    </div>
  );
};

export default Dropdown;
