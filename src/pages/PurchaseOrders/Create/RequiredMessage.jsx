import React from 'react';
import './style.scss';

const RequiredMessage = ({ isValidation, data, column, columnText, customMessage }) => {
  const value = data?.value;
  let message = null;
  if (!value) {
    message = `${columnText} must be entered`;
  }

  if (column === 'qty') {
    if (value < 1) {
      message = 'Qty cannot be 0';
    }
  }

  if (column === 'OrderLines') {
    if (!data) {
      message = 'At least one line is required to continue';
    } else {
      message = '';
    }
  }

  if (customMessage?.status === false) {
    message = customMessage?.message;
  }

  return (
    <div className="text-error">
      {isValidation ? <span className="pl-0 text-danger font-12">{message}</span> : null}
    </div>
  );
};

export default RequiredMessage;
