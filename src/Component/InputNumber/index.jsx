import React from 'react';
import NumberFormat from 'react-number-format';

const InputNumber = ({ name, placeholder, min, className, value, maxLength, style, onChange, isReadOnly }) => {
  return (
    <td>
      <NumberFormat
        thousandSeparator
        name={name}
        min={min}
        style={style}
        className={className}
        placeholder={`   ${placeholder}`}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
      />
    </td>
  );
};

export default InputNumber;
