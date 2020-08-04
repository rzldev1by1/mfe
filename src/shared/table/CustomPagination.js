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

class CustomPagination extends React.Component {
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
        <CCol lg="7" className="px-0 margin-mr">
          <CCardGroup>
            <CCard className="col-lg-6 border-right">
              <CPagination
                limit={3}
                activePage={active}
                pages={pages > 0 ? pages : 1}
                onActivePageChange={this.onActivePageChange}
                firstButton={<BsChevronBarLeft />}
                previousButton={<BsChevronLeft />}
                nextButton={<BsChevronRight />}
                lastButton={<BsChevronBarRight />}
              />
            </CCard>
            <CCard className="col-lg-5" style={{maxWidth: "39.36667%"}}>
              <div className="page-2 d-flex justify-content-center">
                <span className="text-muted mt-1 mr-3">Go to page</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  onChange={this.onChange}
                  min="1"
                  max={pages > 0 ? pages : 1}
                  onKeyPress={(e) => this.numberCheck(e)}
                  style={{textAlign:'center'}}
                />
                <span
                  className="text-muted mt-1 ml-3 pointer"
                  onClick={this.goToPage}
                >
                  {"Go >"}
                </span>
              </div>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol lg="5" className="mt-3">
          <span>
            Showing{" "}
            <b> &nbsp; {`${x_from} to ${x_to} of ${x_total} `} </b>{" "}
            &nbsp; entries
          </span>
        </CCol>
        {/* <CCol lg="4" className="px-0 ml-5">
          {this.props.export}
        </CCol> */}

        
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
              Only {x_last_page} page are available on this screen, please try again. <br />
              
              </label>
          </div>
          </ModalBody> 
      </Modal>

      </CRow>
      // </CContainer>

    );
  }
}
export default CustomPagination;
