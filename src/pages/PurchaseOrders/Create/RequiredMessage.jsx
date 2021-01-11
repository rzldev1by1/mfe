import React from 'react';
import './style.scss';

const RequiredMessage = ({ isValidation, data, column, columnText, customMessage }) => {
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

  if (customMessage?.status === false) {
    message = customMessage?.message;
  }

  return <div>{isValidation ? <span className="text-error pl-0 text-danger font-12">{message}</span> : null}</div>;
};

export default RequiredMessage;
