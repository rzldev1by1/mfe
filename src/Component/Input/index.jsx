import React from 'react';
import RequiredMessage from 'Component/RequiredMessage';

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
  required,
  readOnly,
  onKeyUp,
  alphaNumeric,
  messageRequired,
  messageParam = { messageShow: false, messageData: {}, messageCustom: {} },
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
      {!messageRequired ? null : (
        <RequiredMessage
          column={name}
          messageShow={messageParam?.messageShow}
          data={messageParam?.messageData}
          customMessage={messageParam?.customMessage}
        />
      )}
    </div>
  );
};

export default Input;
