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
    <div className="card-group">
      {titleRight === true ? (
        <CCard className={titleRight === true ? null : ' d-none'}>
          <CCardBody className={`p-0 m-3${titleCenter === true ? ' border-right' : ' d-none'}`}>
            <CRow className={`mx-0 ${titleRightOne ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightOne}
              </CCol>
              <CCol className={`px-0 ${valeuRightOne ? null : ' d-none'}`}>{valeuRightOne}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightTwo ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightTwo}
              </CCol>
              <CCol className={`px-0 ${valeuRightTwo ? null : ' d-none'}`}>{valeuRightTwo}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightThree ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightThree}
              </CCol>
              <CCol className={`px-0 ${valeuRightThree ? null : ' d-none'}`}>{valeuRightThree}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightFour ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightFour}
              </CCol>
              <CCol className={`px-0 ${valeuRightFour ? null : ' d-none'}`}>{valeuRightFour}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightFive ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightFive}
              </CCol>
              <CCol className={`px-0 ${valeuRightFive ? null : ' d-none'}`}>{valeuRightFive}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightSix ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightSix}
              </CCol>
              <CCol className={`px-0 ${valeuRightSix ? null : ' d-none'}`}>{valeuRightSix}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightSeven ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightSeven}
              </CCol>
              <CCol className={`px-0 ${valeuRightSeven ? null : ' d-none'}`}>{valeuRightSeven}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightEight ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightEight}
              </CCol>
              <CCol className={`px-0 ${valeuRightEight ? null : ' d-none'}`}>{valeuRightEight}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightNine ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightNine}
              </CCol>
              <CCol className={`px-0 ${valeuRightNine ? null : ' d-none'}`}>{valeuRightNine}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightTen ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightTen}
              </CCol>
              <CCol className={`px-0 ${valeuRightTen ? null : ' d-none'}`}>{valeuRightTen}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleRightEleven ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleRightEleven}
              </CCol>
              {valeuRightEleven ? (
                <CCol className="px-0">
                  <CCol className="px-0 line-camp">{valeuRightEleven}</CCol>
                  {valeuRightEleven.length > 100 ? <Link onClick={() => setModalShow(true)}>Show More</Link> : ''}
                </CCol>
              ) : (
                <CCol className="px-0">-</CCol>
              )}
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
            <CRow className={`mx-0 ${titleCenterOne ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterOne}
              </CCol>
              <CCol className={`px-0 ${valeuCenterOne ? null : ' d-none'}`}>{valeuCenterOne}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterTwo ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterTwo}
              </CCol>
              <CCol className={`px-0 ${valeuCenterTwo ? null : ' d-none'}`}>{valeuCenterTwo}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterThree ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterThree}
              </CCol>
              <CCol className={`px-0 ${valeuCenterThree ? null : ' d-none'}`}>{valeuCenterThree}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterFour ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterFour}
              </CCol>
              <CCol className={`px-0 ${valeuCenterFour ? null : ' d-none'}`}>{valeuCenterFour}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterFive ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterFive}
              </CCol>
              <CCol className={`px-0 ${valeuCenterFive ? null : ' d-none'}`}>{valeuCenterFive}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterSix ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterSix}
              </CCol>
              <CCol className={`px-0 ${valeuCenterSix ? null : ' d-none'}`}>{valeuCenterSix}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterSeven ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterSeven}
              </CCol>
              <CCol className={`px-0 ${valeuCenterSeven ? null : ' d-none'}`}>{valeuCenterSeven}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterEight ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterEight}
              </CCol>
              <CCol className={`px-0 ${valeuCenterEight ? null : ' d-none'}`}>{valeuCenterEight}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterNine ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterNine}
              </CCol>
              <CCol className={`px-0 ${valeuCenterNine ? null : ' d-none'}`}>{valeuCenterNine}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleCenterTen ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleCenterTen}
              </CCol>
              <CCol className={`px-0 ${valeuCenterTen ? null : ' d-none'}`}>{valeuCenterTen}</CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        ''
      )}

      {titleLeft === true ? (
        <CCard>
          <CCardBody className="mobile-header p-0 my-3 mr-3 ml-0">
            <CRow className={`mx-0 ${titleLeftOne ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftOne}
              </CCol>
              <CCol className={`px-0 ${valeuLeftOne ? null : ' d-none'}`}>{valeuLeftOne}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftTwo ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftTwo}
              </CCol>
              <CCol className={`px-0 ${valeuLeftTwo ? null : ' d-none'}`}>{valeuLeftTwo}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftThree ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftThree}
              </CCol>
              <CCol className={`px-0 ${valeuLeftThree ? null : ' d-none'}`}>{valeuLeftThree}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftFour ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftFour}
              </CCol>
              <CCol className={`px-0 ${valeuLeftFour ? null : ' d-none'}`}>{valeuLeftFour}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftFive ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftFive}
              </CCol>
              <CCol className={`px-0 ${valeuLeftFive ? null : ' d-none'}`}>{valeuLeftFive}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftSix ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftSix}
              </CCol>
              <CCol className={`px-0 ${valeuLeftSix ? null : ' d-none'}`}>{valeuLeftSix}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftSeven ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftSeven}
              </CCol>
              <CCol className={`px-0 ${valeuLeftSeven ? null : ' d-none'}`}>{valeuLeftSeven}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftEight ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftEight}
              </CCol>
              <CCol className={`px-0 ${valeuLeftEight ? null : ' d-none'}`}>{valeuLeftEight}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftNine ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftNine}
              </CCol>
              <CCol className={`px-0 ${valeuLeftNine ? null : ' d-none'}`}>{valeuLeftNine}</CCol>
            </CRow>
            <CRow className={`mx-0 pt-1 ${titleLeftTen ? null : ' d-none'}`}>
              <CCol lg={3} className="col-4 text-light-gray px-0">
                {titleLeftTen}
              </CCol>
              <CCol className={`px-0 ${valeuLeftTen ? null : ' d-none'}`}>{valeuLeftTen}</CCol>
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
