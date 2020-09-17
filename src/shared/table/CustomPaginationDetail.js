import React from "react";
import { CCard, CCardGroup, CPagination, CRow, CCol } from "@coreui/react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronBarLeft,
  BsChevronBarRight,
} from "react-icons/bs";
import Export from "./Export"
import "./CustomPagination.css";
import logo_confirm from 'assets/img/LOGO5@2x.png' 

class CustomPaginationDetail extends React.Component {
  state = {
    pagination: { active: 1, show: 10, total: 0, last_page: 1 },
    page: 1,
    notifPaging: false
  };
  componentDidUpdate = (nextProps) => {
    let { pagination } = this.props;
    if (pagination && nextProps.pagination !== pagination) {
      this.setState({ pagination });
    }
  };
  onChange = (e) => {
    if (e.target.value) {
      this.setState({ page: parseInt(e.target.value) });
    }
  };
  closeConfirmDialog = () => {
     this.setState({ notifPaging: false });
  }
  onActivePageChange = (i) => {
    const { pagination } = this.state;
    const active = parseInt(i > 1 ? i : 1);
    if (this.props.goto) {
      this.props.goto(active);
    } else {
      this.setState({ pagination: { ...pagination, active } });
    }
  };
  goToPage = () => {
    const { pagination, page } = this.state;
    const { data } = this.props; 
    if(page==0 || page===null){
      return 0;
    }
    if(page > pagination.last_page)
    {
        this.setState({ notifPaging:true })
        return 0
    }

    if (this.props.goto) {
      this.props.goto(page);
    } else {
      this.setState({ pagination: { ...pagination, active: page } });
    }
  };
  numberCheck = (e) => {  
    var tmpChar = e.key; 
    if (!/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    } 
  }

  render() {
    let { active, show, total } = this.state.pagination;
    let { data, pagination } = this.props;
    
    total = pagination && pagination.total ? pagination.total : data.length;
    const startIndex = (active - 1) * (total < show ? total : show);
    const endIndex = startIndex + (total < show ? total : show);
    const pages = Math.ceil(total / show);
    const tmp_startIndex = (data.length > 0 && startIndex < 1)?1:startIndex
    //pagination
    const x_total = (pagination && pagination.total)?pagination.total:total;
    const x_last_page = (pagination && pagination.last_page)?pagination.last_page:1;
    const x_from = (pagination && pagination.from)?pagination.from:tmp_startIndex;
    const x_to = (pagination && pagination.to)?pagination.to:endIndex;
 
    return (
      // <CContainer fluid>
      <CRow className=" pagination-custom">
        {/* <CCol lg="6" className="px-0 mr-5">
          <CCardGroup style={{width:"max-content"}}> */}
        <CCol lg="7" className="px-0 margin-mr">
          
            <CCard className="col-lg-6 border-right">
              <CPagination
                limit={3}
                activePage={active}
                pages={pages > 0 ? pages : 1}
                onActivePageChange={this.onActivePageChange}
                firstButton={<BsChevronBarLeft />}
                previousButton={<BsChevronLeft />}
                nextButton={<BsChevronRight className="nextBtn" />}
                lastButton={<BsChevronBarRight className="nextBtn" />}
              />
            </CCard>        
        </CCol>

        
      {/* Modal Pagination */}
      <Modal isOpen={this.state.notifPaging} centered={true}  
          onOpened={() => this.state.notifPaging ? setTimeout(() => { this.closeConfirmDialog() }, 36000) : {}}
          contentClassName="modal-content-paging box-er-pagination"
          >
          <ModalBody>
          <div  className="text-right px-0" style={{fontSize: '14px'}}>
            <i className="iconU-close pointer" onClick={this.closeConfirmDialog}></i>
          </div>
          <div className="d-flex d-inline-flex">
              <img src={logo_confirm} alt="logo" style={{ width: "20%", height: "20%" }} />
              <label className="pl-3 font">
              Only {x_last_page} {x_last_page === 1 ? "page is" : "pages are"} available on this screen, please try again. <br />
              
              </label>
          </div>
          </ModalBody> 
      </Modal>

      </CRow>
      // </CContainer>

    );
  }
}
export default CustomPaginationDetail;
