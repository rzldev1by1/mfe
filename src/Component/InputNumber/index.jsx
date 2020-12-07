import React from 'react'
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
}) => {
    return (
      <td>
        <NumberFormat
          thousandSeparator
          name={name}
          min={min}
          style={style}
          className={className}
          placeholder={`   ${  placeholder}`}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />
      </td>
    )
}

export default InputNumber