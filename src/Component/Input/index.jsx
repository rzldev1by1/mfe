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
  style = null,
  value = null,
  required = false,
  readOnly = false,
  onKeyUp,
  alphaNumeric = false,
}) => {
  return (
    <div>
      {!showTitle ? null : <label className={'text-muted mb-0 ' + (required ? 'required' : '')}>{title}</label>}
      <input
        name={name}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e)}
        onKeyUp={(e) => (onKeyUp ? onKeyUp(e) : null)}
        className={`form-control ${className}`}
        placeholder={placeholder}
        maxLength={maxLength}
        readOnly={readOnly}
        value={value}
        style={style}
        onKeyPress={(e) => {
          if (alphaNumeric) {
            if (!/^[a-zA-Z0-9-_]+$/.test(e.key)) e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default Input;
