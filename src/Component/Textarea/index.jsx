import React from 'react';

const Textarea = ({
  title,
  autoComplete = 'off',
  onChange,
  placeholder,
  maxLength = 99,
  className,
  name,
  onKeyUp,
  style = null,
  value = null,
  required = false,
  readOnly = false,
}) => {
  return (
    <div>
      {!title ? null : <label className={`text-muted mb-0 ${required ? 'required' : ''}`}>{title}</label>}
      <textarea
        name={name}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e)}
        onKeyUp={(e) => (onKeyUp ? onKeyUp(e) : null)}
        className={`form-control ${className}`}
        placeholder={placeholder || title}
        maxLength={maxLength}
        readOnly={readOnly}
        value={value}
        style={style}
      />
    </div>
  );
};

export default Textarea;
