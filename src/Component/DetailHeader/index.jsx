import React from 'react'
import PropTypes from 'prop-types';
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
} from '@coreui/react'

const DetailHeader = ({
    // titleRight
    titleRight,
    titleRightOne, titleRightTwo, titleRightThree, titleRightFour, titleRightFive,
    titleRightSix, titleRightSeven, titleRightEight, titleRightNine, titleRightTen,
    // valeuRight
    valeuRightOne, valeuRightTwo, valeuRightThree, valeuRightFour, valeuRightFive,
    valeuRightSix, valeuRightSeven, valeuRightEight, valeuRightNine, valeuRightTen,
    // titleCenter
    titleCenter,
    titleCenterOne, titleCenterTwo, titleCenterThree, titleCenterFour, titleCenterFive,
    titleCenterSix, titleCenterSeven, titleCenterEight, titleCenterNine, titleCenterTen,
    // valeuCenter
    valeuCenterOne, valeuCenterTwo, valeuCenterThree, valeuCenterFour, valeuCenterFive,
    valeuCenterSix, valeuCenterSeven, valeuCenterEight, valeuCenterNine, valeuCenterTen,
    // titleLeft
    titleLeft,
    titleLeftOne, titleLeftTwo, titleLeftThree, titleLeftFour, titleLeftFive,
    titleLeftSix, titleLeftSeven, titleLeftEight, titleLeftNine, titleLeftTen,
    // valeuLeft
    valeuLeftOne, valeuLeftTwo, valeuLeftThree, valeuLeftFour, valeuLeftFive,
    valeuLeftSix, valeuLeftSeven, valeuLeftEight, valeuLeftNine, valeuLeftTen,
}) => {
    return (
      <div className="card-group">
        <CCard className={titleRight === true ? null : " d-none"}>
          <CCardBody className={`p-0 m-3${  titleCenter === true ? " border-right" : " d-none"}`}>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightOne}</CCol> 
              <CCol>{valeuRightOne || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightTwo}</CCol> 
              <CCol>{valeuRightTwo || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightThree}</CCol> 
              <CCol>{valeuRightThree || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightFour}</CCol> 
              <CCol>{valeuRightFour || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightFive}</CCol> 
              <CCol>{valeuRightFive || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightSix}</CCol> 
              <CCol>{valeuRightSix || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightSeven}</CCol> 
              <CCol>{valeuRightSeven || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightEight}</CCol> 
              <CCol>{valeuRightEight || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightNine}</CCol> 
              <CCol>{valeuRightNine || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleRightOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleRightTen}</CCol> 
              <CCol>{valeuRightTen || '-'}</CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard className={titleCenter === true ? null : " d-none"}>
          <CCardBody 
            className={`p-0 my-3 mx-0 ${  titleLeft === true ? " border-right" : " d-none"}`}
          >
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterOne}</CCol> 
              {' '}
              <CCol>{valeuCenterOne || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterTwo}</CCol> 
              {' '}
              <CCol>{valeuCenterTwo || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterThree}</CCol> 
              {' '}
              <CCol>{valeuCenterThree || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterFour}</CCol> 
              {' '}
              <CCol>{valeuCenterFour || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterFive}</CCol> 
              {' '}
              <CCol>{valeuCenterFive || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterSix}</CCol> 
              {' '}
              <CCol>{valeuCenterSix || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterSeven}</CCol> 
              {' '}
              <CCol>{valeuCenterSeven || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterEight}</CCol> 
              {' '}
              <CCol>{valeuCenterEight || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterNine}</CCol> 
              {' '}
              <CCol>{valeuCenterNine || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleCenterOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleCenterTen}</CCol> 
              {' '}
              <CCol>{valeuCenterTen || '-'}</CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard className={titleLeft === true ? null : " d-none"}>
          <CCardBody className="p-0 m-3">
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftOne}</CCol> 
              {' '}
              <CCol>{valeuLeftOne || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftTwo}</CCol> 
              {' '}
              <CCol>{valeuLeftTwo || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftThree}</CCol> 
              {' '}
              <CCol>{valeuLeftThree || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftFour}</CCol> 
              {' '}
              <CCol>{valeuLeftFour || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftFive}</CCol> 
              {' '}
              <CCol>{valeuLeftFive || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftSix}</CCol> 
              {' '}
              <CCol>{valeuLeftSix || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftSeven}</CCol> 
              {' '}
              <CCol>{valeuLeftSeven || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftEight}</CCol> 
              {' '}
              <CCol>{valeuLeftEight || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftNine}</CCol> 
              {' '}
              <CCol>{valeuLeftNine || '-'}</CCol>
            </CRow>
            <CRow className={`mx-0 ${  titleLeftOne ? null : " d-none"}`}>
              <CCol lg={3} className="text-light-gray px-0">{titleLeftTen}</CCol> 
              {' '}
              <CCol>{valeuLeftTen || '-'}</CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </div>
    )
}

DetailHeader.propTypes = {
    titleRight : PropTypes.string.isRequired
}

export default DetailHeader