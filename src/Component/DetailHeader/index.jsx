import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './index.scss';
import logo_confirm from 'assets/img/LOGO5@2x.png';

const DetailHeader = ({
  module,
  // titleRight
  titleRight,
  titleRightOne,
  titleRightTwo,
  titleRightThree,
  titleRightFour,
  titleRightFive,
  titleRightSix,
  titleRightSeven,
  titleRightEight,
  titleRightNine,
  titleRightTen,
  titleRightEleven,
  // valeuRight
  valeuRightOne,
  valeuRightTwo,
  valeuRightThree,
  valeuRightFour,
  valeuRightFive,
  valeuRightSix,
  valeuRightSeven,
  valeuRightEight,
  valeuRightNine,
  valeuRightTen,
  valeuRightEleven,
  // titleCenter
  titleCenter,
  titleCenterOne,
  titleCenterTwo,
  titleCenterThree,
  titleCenterFour,
  titleCenterFive,
  titleCenterSix,
  titleCenterSeven,
  titleCenterEight,
  titleCenterNine,
  titleCenterTen,
  // valeuCenter
  valeuCenterOne,
  valeuCenterTwo,
  valeuCenterThree,
  valeuCenterFour,
  valeuCenterFive,
  valeuCenterSix,
  valeuCenterSeven,
  valeuCenterEight,
  valeuCenterNine,
  valeuCenterTen,
  // titleLeft
  titleLeft,
  titleLeftOne,
  titleLeftTwo,
  titleLeftThree,
  titleLeftFour,
  titleLeftFive,
  titleLeftSix,
  titleLeftSeven,
  titleLeftEight,
  titleLeftNine,
  titleLeftTen,
  // valeuLeft
  valeuLeftOne,
  valeuLeftTwo,
  valeuLeftThree,
  valeuLeftFour,
  valeuLeftFive,
  valeuLeftSix,
  valeuLeftSeven,
  valeuLeftEight,
  valeuLeftNine,
  valeuLeftTen,
}) => {
  const [ModalShow, setModalShow] = useState(false);

  return (
    <div className="card-group" style={{borderRadius:"0.25rem"}}>
      {titleRight === true ? (
        <CCard className={titleRight === true ? null : ' d-none'}>
          <CCardBody className={`p-0 m-3${titleCenter === true ? ' border-right' : ' d-none'}`}>
            <CRow className={`mx-0 ${titleRightOne ? null : ' d-none'}`}>
              <CCol lg={'auto'} className="px-0 mr-3 text-light-gray">
                <CRow className={`mx-0 ${titleRightOne ? null : ' d-none'}`}>{titleRightOne}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightTwo ? null : ' d-none'}`}>{titleRightTwo}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightThree ? null : ' d-none'}`}>{titleRightThree}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightFour ? null : ' d-none'}`}>{titleRightFour}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightFive ? null : ' d-none'}`}>{titleRightFive}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightSix ? null : ' d-none'}`}>{titleRightSix}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightSeven ? null : ' d-none'}`}>{titleRightSeven}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightEight ? null : ' d-none'}`}>{titleRightEight}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightNine ? null : ' d-none'}`}>{titleRightNine}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightTen ? null : ' d-none'}`}>{titleRightTen}</CRow>
                <CRow className={`mx-0 pt-1 ${titleRightEleven ? null : ' d-none'}`}>{titleRightEleven}</CRow>
              </CCol>
              <CCol className="px-0">
                <CRow className={`mx-0 ${valeuRightOne ? null : ' d-none'}`}>{valeuRightOne}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightTwo ? null : ' d-none'}`}>{valeuRightTwo}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightThree ? null : ' d-none'}`}>{valeuRightThree}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightFour ? null : ' d-none'}`}>{valeuRightFour}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightFive ? null : ' d-none'}`}>{valeuRightFive}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightSix ? null : ' d-none'}`}>{valeuRightSix}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightSeven ? null : ' d-none'}`}>{valeuRightSeven}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightEight ? null : ' d-none'}`}>{valeuRightEight}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightNine ? null : ' d-none'}`}>{valeuRightNine}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuRightTen ? null : ' d-none'}`}>{valeuRightTen}</CRow>
                <CRow className={`mx-0 pt-1  line-camp ${valeuRightEleven ? null : ' d-none'}`}>
                  <CCol className="px-0 line-camp">{valeuRightEleven}</CCol>
                  {valeuRightEleven?.length > 100 ? <Link onClick={() => setModalShow(true)}>Show More</Link> : ''}
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        ' '
      )}

      {titleCenter === true ? (
        <CCard>
          <CCardBody
            className={`mobile-header p-0 my-3 mr-3 ml-0 ${module === 'stockHolding' ? 'pl-3' : ''} ${
              titleLeft === true ? ' border-right' : ' d-none'
            }`}
          >
            <CRow className={`mx-0 ${titleCenter ? null : ' d-none'}`}>
              <CCol lg={'auto'} className="px-0 mr-3 text-light-gray">
                <CRow className={`mx-0 ${titleCenterOne ? null : ' d-none'}`}>{titleCenterOne}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterTwo ? null : ' d-none'}`}>{titleCenterTwo}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterThree ? null : ' d-none'}`}>{titleCenterThree}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterFour ? null : ' d-none'}`}>{titleCenterFour}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterFive ? null : ' d-none'}`}>{titleCenterFive}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterSix ? null : ' d-none'}`}>{titleCenterSix}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterSeven ? null : ' d-none'}`}>{titleCenterSeven}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterEight ? null : ' d-none'}`}>{titleCenterEight}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterNine ? null : ' d-none'}`}>{titleCenterNine}</CRow>
                <CRow className={`mx-0 pt-1 ${titleCenterTen ? null : ' d-none'}`}>{titleCenterTen}</CRow>
              </CCol>
              <CCol className="px-0">
                <CRow className={`mx-0 ${valeuCenterOne ? null : ' d-none'}`}>{valeuCenterOne}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterTwo ? null : ' d-none'}`}>{valeuCenterTwo}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterThree ? null : ' d-none'}`}>{valeuCenterThree}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterFour ? null : ' d-none'}`}>{valeuCenterFour}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterFive ? null : ' d-none'}`}>{valeuCenterFive}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterSix ? null : ' d-none'}`}>{valeuCenterSix}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterSeven ? null : ' d-none'}`}>{valeuCenterSeven}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterEight ? null : ' d-none'}`}>{valeuCenterEight}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterNine ? null : ' d-none'}`}>{valeuCenterNine}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuCenterTen ? null : ' d-none'}`}>{valeuCenterTen}</CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        ''
      )}

      {titleLeft === true ? (
        <CCard>
          <CCardBody className="mobile-header p-0 my-3 mr-3 ml-0">
            <CRow className={`mx-0 ${titleLeft ? null : ' d-none'}`}>
              <CCol lg={'auto'} className="px-0 mr-3 text-light-gray">
                <CRow className={`mx-0 ${titleLeftOne ? null : ' d-none'}`}>{titleLeftOne}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftTwo ? null : ' d-none'}`}>{titleLeftTwo}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftThree ? null : ' d-none'}`}>{titleLeftThree}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftFour ? null : ' d-none'}`}>{titleLeftFour}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftFive ? null : ' d-none'}`}>{titleLeftFive}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftSix ? null : ' d-none'}`}>{titleLeftSix}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftSeven ? null : ' d-none'}`}>{titleLeftSeven}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftEight ? null : ' d-none'}`}>{titleLeftEight}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftNine ? null : ' d-none'}`}>{titleLeftNine}</CRow>
                <CRow className={`mx-0 pt-1 ${titleLeftTen ? null : ' d-none'}`}>{titleLeftTen}</CRow>
              </CCol>
              <CCol className="px-0">
                <CRow className={`mx-0 ${valeuLeftOne ? null : ' d-none'}`}>{valeuLeftOne}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftTwo ? null : ' d-none'}`}>{valeuLeftTwo}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftThree ? null : ' d-none'}`}>{valeuLeftThree}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftFour ? null : ' d-none'}`}>{valeuLeftFour}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftFive ? null : ' d-none'}`}>{valeuLeftFive}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftSix ? null : ' d-none'}`}>{valeuLeftSix}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftSeven ? null : ' d-none'}`}>{valeuLeftSeven}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftEight ? null : ' d-none'}`}>{valeuLeftEight}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftNine ? null : ' d-none'}`}>{valeuLeftNine}</CRow>
                <CRow className={`mx-0 pt-1 ${valeuLeftTen ? null : ' d-none'}`}>{valeuLeftTen}</CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        ''
      )}

      <Modal
        isOpen={ModalShow}
        centered
        contentClassName="modal-content-paging dev-inst"
        style={{
          borderLeft: '2px transparent solid !important',
          borderRight: '2px transparent solid !important',
          borderBottom: '2px transparent solid !important;',
        }}
      >
        <ModalBody className="align-bottom" style={{ paddingBottom: '2.4rem !important' }}>
          <div className="text-right px-0" style={{ fontSize: '14px' }}>
            <i className="iconU-close pointer" onClick={() => setModalShow(false)} />
          </div>
          <div className="d-flex d-inline-flex">
            <img src={logo_confirm} alt="logo" className="px-3" style={{ width: '120px', height: '20%' }} />
            <p className="m-0 pl-3 pr-4" style={{ overflowWrap: 'anywhere' }}>
              {valeuRightEleven}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

DetailHeader.propTypes = {
  titleRight: PropTypes.string.isRequired,
};

export default DetailHeader;
