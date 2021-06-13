import React from 'react';
import RequiredMessage from 'Component/RequiredMessage';

const Input = ({
  id,
  title,
  showTitle = false,
  autoComplete = 'off',
  onChange,
  placeholder,
  maxLength = 99,
  className,
  name,
  style = null,
  value,
  required,
  readOnly,
  onKeyUp,
  alphaNumeric,
  messageRequired,
  messageParam = { messageShow: false, messageData: {}, customMessage: {} },
}) => {
  return (
    <div>
      {!title ? null : <label className={'text-muted mb-0 ' + (required ? 'required' : '')}>{title}</label>}
      <input
        id={id}
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
          columnText={title || placeholder}
          value={messageParam?.value}
          customMessage={messageParam?.customMessage}
        />
      )}
    </div>
  );
};

export default Input;
