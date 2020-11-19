import React, { Component, Fragment } from 'react';
import { InputGroup } from 'reactstrap'
import './Export.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportExl from 'react-html-table-to-excel'
import loading from "assets/icons/loading/LOADING-MLS.gif"
import { Modal, ModalBody, ModalHeader, Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import logo_confirm from 'assets/img/LOGO5@2x.png'

class Export extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      exportExpand: false,
      value: "",
      dropdownOpen: new Array(19).fill(false),
      exportPdf: this.props.pdf || true,
      exportExcel: this.props.excel || true,
      exportStatus: 'ready',
      notifExport: false
    };
  }
  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  Date = () => {
    let dateNow = ""
    let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let date1 = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear();
    return dateNow = (date1 + "-" + arrmonth[month] + "-" + year)
  }
  closeConfirmDialog = () => {
    this.setState({ notifExport: false });
  }
  exportPDF = async () => {
    this.changeExportStatus('wait');
    if (this.props.pagination && this.props.pagination.total > 75000) {
      this.setState({
        notifExport: true
      })
      this.changeExportStatus('ready')
      return 0;
    }

    await this.props.getExportData()
    const marginLeft = 40;

    const doc = this.examples();
    const data = this.props.ExportData()

    doc.save(this.props.ExportName() + ".pdf")
    this.changeExportStatus('ready')
  }
  exportXLS = async () => {
    if (this.props.pagination && this.props.pagination.total > 75000) {
      this.setState({
        notifExport: true
      })
      this.changeExportStatus('ready')
      return 0;
    }
    this.changeExportStatus('wait');

    await this.props.getExportData()
    document.getElementById("button-download-as-xls").click();
    this.changeExportStatus('ready')
  }

  

  examples = () => {
    console.log(this.props.ExportData())
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    // From Javascript
    var finalY = doc.previousAutoTable.finalY || 10
    doc.text(this.props.ExportPDFName + " Data Microlistics  " + this.Date(), 14, finalY + 15)
// var base64String= Convert.ToBase64String(File.ReadAllBytes(logo_confirm));
// console.log(base64String);
//     doc.addImage(base64String, 'PNG', 0, 0, 0, 0)

const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
    
      };

      img.src = logo_confirm;
      doc.addImage(img, 'PNG', 15, -40, 180, 160)


    // function loadImage(url) {

    //   return new Promise((resolve) => {
    //     let img = new Image();
    //     img.onload = () => resolve(img);
    //     img.src = url;
    //   })
    // }
    // loadImage = ('assets/img/LOGO.png').then((logo) => {
    //   doc.addImage(logo, 'PNG', 10, 10);
    //   doc.save('report.pdf');
    // });
    
    doc.autoTable({
      margin: 
        {
          left: 20,
          right: 20,
          bottom: 20
        },
        // elem: imgData,
      startY: finalY + 40,
      head: [this.props.ExportHeader()],
      body: this.props.ExportData(),
      styles: { cellPadding: 0.5, fontSize: this.props.ExportFont },
    })

    finalY = doc.previousAutoTable.finalY
    doc.autoTable({
      margin: 
        {
          left: 20,
          right: 20,
          bottom: 20
        },
      html: '.table',
      useCss: true,
    })

    return doc
  }

  changeExportStatus = (status) => {
    this.setState({
      exportStatus: status
    })
  }

  render = () => {
    const { exportPdf, exportExcel, exportStatus } = this.state
    let styleButton = {}
    if (exportStatus == 'wait') {
      styleButton = { pointerEvents: 'none' }
    }
    console.log(exportExcel)
    return (
      <div>
        {/* <div style={{marginTop:"-3rem"}}> */}
        <ButtonDropdown direction="up" style={styleButton} className=" d-flex float-right align-items-center" isOpen={this.state.dropdownOpen[13]} toggle={() => { this.toggle(13); }}>
          <DropdownToggle className="Dropdown-toggel btn-primary align-items-center" >
            {/* <span className='export-export' style={{paddingRight:"6px"}}/> */}
            <div style={{ fontSize: "0.875rem", letterSpacing: "1px" }} >
              {exportStatus == 'ready' ? 'EXPORT' : <img src={loading} className='mt-min-5' width='45' height='45' />}
            </div>
          </DropdownToggle>
          <DropdownMenu style={{ top: "1px", left: "5px" }} className={"no-shadow " + ((exportPdf == 'false' || exportExcel == 'false') ? ' dropdown-single ' : ' Dropdown-menu ')} >
            {(exportPdf == 'false') ? '' :
              <DropdownItem className="export-pdf px-3" onClick={() => this.exportPDF()}>
                <span className="exp-PDF" style={{ paddingRight: "0.28rem" }} /> EXPORT TO PDF
                        </DropdownItem>
            }
            {(exportExcel == 'false') ? '' :
              <div>
                <DropdownItem className="export-excel" style={{ paddingLeft: "1.15rem" }} onClick={() => this.exportXLS()} >
                  <span className="exp-XLS" style={{ paddingRight: "0.3rem" }} /> EXPORT TO XLS
                          </DropdownItem>
                <div style={{ display: 'none' }}>
                  <ExportExl className="Excel-bottom"
                    table={this.props.secondTable == 'true' ? "excel2" : "excel"}
                    filename={this.props.ExportName()}
                    sheet="sheet 1"
                    buttonText="EXPORT TO XLS" />
                </div>
              </div>
            }
          </DropdownMenu>
        </ButtonDropdown>

        <Modal isOpen={this.state.notifExport} centered={true}
          onOpened={() => this.state.notifExport ? setTimeout(() => { this.closeConfirmDialog() }, 36000) : {}}
          contentClassName="modal-content-paging box-er-pagination"
        >
          <ModalBody>
            <div className="text-right px-0" style={{ fontSize: '14px' }}>
              <i className="iconU-close pointer" onClick={this.closeConfirmDialog}></i>
            </div>
            <div className="d-flex d-inline-flex">
              <img src={logo_confirm} alt="logo" style={{ width: "20%", height: "20%" }} />
              <label className="pl-3 font">
                <div><b>Export Unsuccessful</b><br />
                      Please try to export the report again.</div>
                <div style={{ paddingTop: '12px' }}>Note the maximum you <br /> can download are: <br /></div>
                <div style={{ color: '#b4b9bb' }}>Maximum 75,000 records</div>
              </label>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  triggerExportExpand = (e) => {
    e.stopPropagation();
    this.setState((prevState) => {
      return { exportExpand: !prevState.exportExpand };
    });
  }
}

export default Export;