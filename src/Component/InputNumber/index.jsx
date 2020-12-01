import { min } from 'moment'
import React, { useState, useEffect } from 'react'
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
                thousandSeparator={true}
                name={name}
                min={min}
                style={style}
                className={className}
                placeholder={'   ' + placeholder}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
            />
        </td>
    )
}

export default InputNumber