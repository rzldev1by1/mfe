import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import { Modal, ModalBody } from 'reactstrap';
import numeral from 'numeral';
import './index.scss';
import logoConfirm from '../../assets/img/LOGO5@2x.png';

const DetailHeader = ({ headerDetailRight, headerDetailCenter, headerDetailLeft, data, module, valueModal }) => {
  const [ModalShow, setModalShow] = useState(false);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);

  const headerDetailCenterCss = headerDetailCenter ? ' border-right' : ' d-none';
  const headerDetailLeftCss = headerDetailLeft ? ' border-right' : ' d-none';
  const moduleCss = module === 'stockHolding' ? 'pl-3' : '';

  const idAndDetail = ({ val, detail }) => {
    let ret = null;
    if (val) {
      detail.forEach((detailData) => {
        if (!detailData?.value !== val) ret = detailData.label;
      });
    } else {
      ret = '-';
    }
    return ret;
  };

  return (
    <div className="card-group" style={{ borderRadius: '0.25rem' }}>
      {headerDetailRight ? (
        <CCard>
          <CCardBody className={`p-0 m-3 ${headerDetailCenterCss}`}>
            <CRow className="mx-0">
              <CCol lg="12" className="px-0">
                {headerDetailRight.map((id) => {
                  const { accessor } = id;
                  if (data) {
                    switch (accessor) {
                      case 'site':
                        <CRow className="mx-0 pt-1">
                          <CCol xs={4} className="text-light-gray">
                            {id.Header}
                          </CCol>
                          <CCol xs={8}>{idAndDetail({ val: data[accessor], detail: siteData })}</CCol>
                        </CRow>;
                        break;
                      case 'client':
                        <CRow className="mx-0 pt-1">
                          <CCol xs={4} className="text-light-gray">
                            {id.Header}
                          </CCol>
                          <CCol xs={8}>{idAndDetail({ val: data[accessor], detail: clientData })}</CCol>
                        </CRow>;
                        break;
                      case 'deliverydescription':
                        <CRow className="mx-0 pt-1">
                          <CCol xs={4} className="text-light-gray">
                            {id.Header}
                          </CCol>
                          <CCol xs={8} className="px-0 line-camp">
                            {data[accessor] ? data[accessor] : '-'}
                          </CCol>
                          {data[accessor]?.length > 100 ? (
                            <div className="link-custom" onClick={() => setModalShow(true)} aria-hidden="true">
                              Show More
                            </div>
                          ) : (
                            ''
                          )}
                        </CRow>;
                        break;
                      default:
                    }
                    return (
                      <CRow className="mx-0 pt-1">
                        <CCol xs={4} className="text-light-gray">
                          {id.Header}
                        </CCol>
                        <CCol xs={8}>{data[accessor] ?? '-'}</CCol>
                      </CRow>
                    );
                  }
                  return false
                })}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        ' '
      )}

      {headerDetailCenter && (
        <CCard>
          <CCardBody className={`mobile-header p-0 my-3 mr-3 ml-0 ${moduleCss} ${headerDetailLeftCss}`}>
            <CRow className="mx-0">
              <CCol lg="12" className="px-0">
                {headerDetailCenter.map((id) => {
                  const { accessor } = id;
                  if (data) {
                    return (
                      <CRow className="mx-0 pt-1">
                        <CCol xs={4} className="text-light-gray">
                          {id.Header}
                        </CCol>
                        <CCol xs={8}>{data[accessor] ?? '-'}</CCol>
                      </CRow>
                    );
                  }
                  return false
                })}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}

      {headerDetailLeft ? (
        <CCard>
          <CCardBody className="mobile-header p-0 my-3 mr-3 ml-0">
            <CRow className="mx-0">
              <CCol lg="12" className="px-0">
                {headerDetailLeft.map((id) => {
                  const { accessor } = id;
                  const formatQty = [
                    'stock_on_hand',
                    'projected_available_qty',
                    'expected_in_qty',
                    'expected_out_qty',
                    'rotadate_type',
                  ];
                  if (data) {
                    if (formatQty.includes(accessor)) {
                      return (
                        <CRow className="mx-0 pt-1">
                          <CCol xs={4} className="text-light-gray">
                            {id.Header}
                          </CCol>
                          <CCol xs={8}>{data[accessor] ? numeral(data[accessor]).format('0,0') : '-'}</CCol>
                        </CRow>
                      );
                    }
                    return (
                      <CRow className="mx-0 pt-1">
                        <CCol xs={4} className="text-light-gray">
                          {id.Header}
                        </CCol>
                        <CCol xs={8}>{data[accessor] ?? '-'}</CCol>
                      </CRow>
                    );
                  }
                  return false
                })}
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
            <i className="iconU-close pointer" aria-hidden="true" onClick={() => setModalShow(false)} />
          </div>
          <div className="d-flex d-inline-flex">
            <img src={logoConfirm} alt="logo" className="px-3" style={{ width: '120px', height: '20%' }} />
            <p className="m-0 pl-3 pr-4" style={{ overflowWrap: 'anywhere' }}>
              {valueModal}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DetailHeader;
