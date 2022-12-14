import React, { useState, useEffect } from 'react';
import { CRow, CCol, CContainer } from '@coreui/react';
import './MessageTab.css';
import attention from 'assets/img/Attention.png';
import complete from 'assets/img/Complete.png';
import error from 'assets/img/Error.png';

const MessageTab = ({ module, submitReturn, back, exit }) => {
  let status = submitReturn?.status;
  let message = submitReturn?.message;
  const [imgSrc, setImgSrc] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [imgClass, setImgClass] = useState('');
  const [title, setTitle] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status == 'ok' || message === 'Successfully added' || message === 'create successfully') {
      setStatusMessage('The ' + module + ' ' + submitReturn.orderNo + ' has successfully submitted for processing.');
      setImgSrc(complete);
      setImgClass('msg-Icon_Complete');
      setTitle('Success');
      setIsSuccess(true);
    } else if (message == 'No Internet Connection') {
      setStatusMessage('Check your Internet Connection');
      setImgClass('msg-Icon_Reload');
      setTitle('');
    } else if (module == 'UM' && message === 'User created') {
      setStatusMessage(
        'You have created a new ' +
          submitReturn.role +
          ' User for ' +
          submitReturn.name +
          '. The ' +
          submitReturn.role +
          ' User ' +
          submitReturn.name +
          ' will receive an email shortly with their user ID and password to access the portal',
      );
      setImgSrc(complete);
      setImgClass('msg-Icon_Complete');
      setTitle('Thank You');
      setIsSuccess(true);
    } else {
      setStatusMessage(
        'The ' + (module == 'UM' ? 'user' : 'order') + ' that you tried to create could not be saved to the system.',
      );
      setImgSrc(attention);
      setImgClass('msg-Icon_Caution');
      setTitle('Sorry');
    }
  }, [submitReturn]);

  return (
    <CContainer className="px-5 py-5 tab-content">
      <CCol className="pl-4 pb-4 mb-1">
        <i style={{ color: '#cccccc' }} className={'img-msg ' + imgClass}></i>
        <div className="h1 bold text-gray-title font-2xl mt-4">{title}</div>
        <div className="h4 text-gray w-75 msg-tab text-gray-md font-2xl">
          {statusMessage}
          <span className="h4 text-gray w-50 font-2xl">{isSuccess ? null : 'Please try again.'}</span>
        </div>
        <CRow className="flex justify-content-between align-items-center">
          {isSuccess ? (
            <button
              className="font-lg font-md font-sm btn mr-5 mb-4 ml-n2"
              style={{ marginTop: '-20px' }}
              onClick={() => exit()}
            >
              <i className="reset-done" style={{ color: '#81efdd' }}></i>
            </button>
          ) : message === 'No Internet Connection' ? (
            <button
              className="font-lg font-md font-sm btn mr-5 mb-4 ml-n2"
              style={{ marginTop: '-20px' }}
              onClick={() => back()}
            >
              <i className="reload_button" style={{ color: '#fcb0b0' }}></i>
            </button>
          ) : (
            <button className="btn btn-primary mb-2" onClick={() => back()}>
              BACK
            </button>
          )}

          <div className="text-right vertical-middle h-fit-content e-text-color">{`${
            isSuccess ? 'Code 200' : status == 200 ? 'Error Code 400' : 'Error Code ' + status
          }`}</div>
        </CRow>
      </CCol>
    </CContainer>
  );
};

export default MessageTab;
