import React, { useEffect, useState } from 'react';
import './style.scss';

const RequiredMessage = ({ messageShow, column, data, dropdown = false, customMessage }) => {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState(null);
  const [columnText, setColumnText] = useState(null);

  useEffect(() => {
    if (!data) {
      return null;
    }
    setColumnText(data?.text);
    setValue(data?.value);
  }, [data, data?.value]);

  useEffect(() => {
    setMessage('');
    if (column == 'qty') {
      //if column qty logic
      if (value < 1) setMessage('Qty cannot be 0');
    }

    if (column == 'OrderLines') {
      //if column order lines logic
      if (!data) setMessage('At least one line is required to continue');
      else setMessage('');
    }

    //if empty
    if (!value) setMessage(columnText + ' must be entered');

    if (customMessage?.status === false) {
      //if it use custom message, example: order Number
      setMessage(customMessage?.message);
    }
  }, [columnText, value, customMessage]);

  return (
    <div className="text-error ">
      {messageShow ? <span className="pl-0 text-danger font-12">{message}</span> : null}
    </div>
  );
};

export default RequiredMessage;
