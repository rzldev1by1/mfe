import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode'
import { ExportName } from '../Export/services'

const setupDocPDF = async (filename, exportData, element) => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'landscape'; // portrait or landscape
    console.log('masuk33354345');

    JsBarcode("itf", "12345678901237", {format: "itf"});
    console.log('masuk333');
    const img = document.getElementById('itf');
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(40);
    doc.text(30, 20, 'Hello world!');
    doc.addImage(img.src, 'JPEG', 15, 40, 180, 160);
    console.log(doc);
    return doc;
  };



export const exportPrintLabel = async ({ filename, printLabelData, element }) => {
    const doc = await setupDocPDF(filename, printLabelData, element);
    doc.save(ExportName(filename) + '.pdf');
};