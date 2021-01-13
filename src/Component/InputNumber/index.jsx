import React from 'react';
import NumberFormat from 'react-number-format';

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
}) => {
  return (
    <td>
      <NumberFormat
        thousandSeparator
        name={name}
        min={min}
        style={style}
        className={className}
        placeholder={`   ${placeholder}`}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        decimalScale={isDecimal ? 3 : 0}
        isAllowed={(values) => {
          const { value } = values;
          const number = value.split('.');
          console.log(number);
          return number[0].length <= maxLength;
        }}
      />
    </td>
  );
};

export default InputNumber;
