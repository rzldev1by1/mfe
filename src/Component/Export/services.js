import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment'
import logo_export from '../../assets/img/logo_export2.png'

const examples = () => {
    let header = [...this.props.ExportHeader()]
    let body = [...this.props.ExportData()]
    body = body.map(data => {
      const newData2 = data.map((dt,idx) => {
        console.log(body); 
        if(dt[0]===null){
          return ['-']
        }
          return dt
        
      })
      return newData2
    })
    if(this.props.module === 'so'){
      header = header.filter((data, idx) => idx  <=12)
        body = body.map(data => {
        const newData = data.filter((dt,idx) => idx <= 12)
        const newData2 = newData.map((dt,idx) => {
          console.log(dt); 
          if(dt[0]===null){
            return ['-']
          }
            return dt
          
        })
        return newData2
      })
    }
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    // From Javascript
    const finalY = doc.previousAutoTable.finalY || 10
    const title = this.props.ExportPDFName
    const originDate = this.Date()
    const date = moment(originDate).format('DD/MM/YYYY')
    const img = new Image();
    img.src = logo_export;
    doc.setFontSize(15);
    
    doc.autoTable({
      theme: 'striped',
      margin: 
        {
          left: 15,
          right: 15,
          bottom: 5
        },
      startY: finalY + 30,
      head: [header],
      body,
      headerStyles: {
        cellPadding: 5,
        lineWidth: 0,
        valign:'top',
        fontStyle: 'bold', 
        halign: 'left',    // 'center' or 'right'
        fillColor: [94, 68, 232], 
        textColor: [255, 255, 255],  
        rowHeight:22
      },
      styles: { 
        rowHeight:24,
        cellPadding: {
          top: 8,
          right: 4,
          bottom: 8,
          left: 4
        },
        fontSize: 8,
        borderBottom: 0
      },
      didDrawPage(data) {
        doc.text(`${title  } Data Microlistics  ${  date}`, 15, finalY + 15)
        doc.addImage(img, 'PNG', 785, 5, 45, 40,"a","FAST")
      }
    })
    return doc
  }

const examples2 = () => {
    let header = [...this.props.ExportHeader()]
    let body = [...this.props.ExportData()]
    header = header.filter((data, idx) => idx  <= 3 || idx >= 13 )
    body = body.map(data => {
      if(data === null){
        alert(data)
      }
      console.log(data);
      const newData = data.filter((dt,idx) => idx  <= 3 || idx >= 13)

      const newData2 = newData.map((dt,idx) => {
        console.log(dt); 
        if(dt[0]===null){
          return ['-']
        }
          return dt
        
      })
    return newData2
  })
    
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    // From Javascript
    const finalY = doc.previousAutoTable.finalY || 10
    const title = this.props.ExportPDFName
    const originDate = this.Date()
    const date = moment(originDate).format('DD/MM/YYYY')
    const img = new Image();
    img.src = logo_export;
    doc.setFontSize(15);
    
    doc.autoTable({
      theme: 'striped',
      margin: 
        {
          left: 15,
          right: 15,
          bottom: 5
        },
      startY: finalY + 30,
      head: [header],
      body,
      headerStyles: {
        cellPadding: 5,
        lineWidth: 0,
        valign:'top',
        fontStyle: 'bold', 
        halign: 'left',    // 'center' or 'right'
        fillColor: [94, 68, 232], 
        textColor: [255, 255, 255],  
        rowHeight:22
      },
      styles: { 
        rowHeight:24,
        cellPadding: {
          top: 8,
          right: 4,
          bottom: 8,
          left: 4
        },
        fontSize: 8,
        borderBottom: 0
      },
      
      didDrawPage(data) {
        doc.text(`${title  } Data Microlistics  ${  date}`, 15, finalY + 15 )
        doc.addImage(img, 'PNG', 785, 5, 45, 40,"a","FAST")
      }
    })

    return doc
}

const exportPDF = async ({changeExportStatus, pagination, setNotifExport, getExportData, module}) => {
    changeExportStatus('wait');
    if (pagination && pagination.total > 75000) {
        setNotifExport(true)
        changeExportStatus('ready')
        return 0;
    }

    await getExportData()
    const doc = examples();
    if(module === 'Sales Order'){
      const doc2 = examples2();
      doc2.save(`${ExportName()  }_Part_2` `.pdf`)
    }
    doc.save(`${ExportName()  }_Part_1` `.pdf`)
    changeExportStatus('ready')
}

const exportXLS = async () => {
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
const ExportName = (filename) => {
    const arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const date1 = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const Seconds = date.getSeconds();
      const Minutes = date.getMinutes();
      const Hours = date.getHours();
    return (`${filename + date1  }-${  arrmonth[month]  }-${  year  }.${  Hours  }-${  Minutes  }-${  Seconds}`)
}

export {exportPDF, exportXLS, ExportName}