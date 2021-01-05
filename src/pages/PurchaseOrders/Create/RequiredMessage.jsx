import React from 'react';
import './style.scss';

const RequiredMessage = ({ isValidation, data, column, columnText }) => {
  const value = data?.value;
  let message = null;

  if (!value) {
    message = columnText + ' must be entered';
  }

  if (column == 'OrderLines') {
    if (!data) {
      message = 'At least one line is required to continue';
    } else {
      message = '';
    }
  }

  if (column == 'orderNo' && value) {
    if (value && value.length < 4) {
      message = columnText + ' must have min 4 characters';
    }
  }

  return <div>{isValidation ? <span className="text-error pl-0 text-danger font-12">{message}</span> : null}</div>;
};

export default RequiredMessage;
