import React, { useEffect, useState } from 'react';
import './style.scss';

const RequiredMessage = ({ messageShow, column, data, columnText, value, dropdown = false, customMessage }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage('');
    if (column == 'qty') {
      //if column qty logic
      if (value < 1) setMessage('Qty cannot be 0');
    }

    if (column == 'OrderLines') {
      //if column order lines logic
      if (value < 1) setMessage('At least one line is required to continue');
      else setMessage('');
    }

    //if empty
    if (!value) setMessage(columnText + ' must be entered');

    //if dates
    if (!value) setMessage(columnText + ' must be entered');

    if (column == 'validDates') {
      if (!value) {
        setMessage('Please select a valid date');
      }
    }
  }, [columnText, value, customMessage]);

  return (
    // <div className="text-error position-absolute">
    //   {messageShow ? <span className="pl-0 text-danger font-12">{message}</span> : null}
    // </div>
    <div className={messageShow ? 'text-error' : null}>
     {messageShow ? <p className="pl-0 text-danger font-12">{message}</p> : <p style={{color:'transparent !important'}} className="pl-0 text-tranparent font-12">{'a'}</p>}
   </div>
  );
};

export default RequiredMessage;
