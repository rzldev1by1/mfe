import React from 'react';
import NumberFormat from 'react-number-format';
import RequiredMessage from '../RequiredMessage';

const InputNumber = ({
  name,
  placeholder,
  min,
  className,
  value,
  maxLength,
  style,
  onChange,
  isReadOnly,
  isDecimal,
  messageRequired,
  messageParam = { messageShow: false, messageData: {}, messageCustom: {} },
}) => {
  return (
    <div>
      <NumberFormat
        thousandSeparator
        name={name}
        min={min}
        style={style}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        decimalScale={isDecimal ? 3 : 0}
        isAllowed={(values) => {
          const number = values.split('.');
          return number[0].length <= maxLength;
        }}
      />

      {!messageRequired ? null : (
        <RequiredMessage
          column={name}
          messageShow={messageParam?.messageShow}
          columnText={placeholder}
          value={messageParam?.value}
        />
      )}
    </div>
  );
};

export default InputNumber;
