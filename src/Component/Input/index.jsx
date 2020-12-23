import React from 'react';
const Input = ({
  title,
  showTitle = false,
  autoComplete = 'off',
  onChange,
  placeholder,
  maxLength = 99,
  className,
  name,
  required = false,
}) => {
  return (
    <div>
      {!showTitle ? null : <label className={'text-muted mb-0 ' + (required ? 'required' : '')}>{title}</label>}
      <input
        name={name}
        autoComplete={autoComplete}
        onChange={() => this.onChange()}
        className={`form-control ${className}`}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
