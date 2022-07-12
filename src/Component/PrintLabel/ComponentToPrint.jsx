import React from 'react';
import './style.scss';

export class ComponentToPrint extends React.PureComponent {
  lo(printLabelData) {
    const newData = [];
    if (printLabelData?.length) {
      printLabelData.map((data) => {
        const num = Math.round(data.edit_carton);
        for (let i = 0; i < num; i++)
          newData.push({
            style: data.style || '-',
            color: data.color || '-',
            size: '-',
            dimension: data.dimension || '-',
            client: '-',
            qty: data.qty || '-',
            supplier: data.supplier || '-',
            order_no: data.order_no || '-',
            barcode: data.barcode || '-',
          });
      });
    }
    return newData;
  }

  render() {
    const a = this.lo(this.props.printLabelData);
    return (
      <div className="grid-container hotma" id="canvasPrint" style={{ position: 'block' }}>
        {a?.map((data) => {
          return (
            <div className="grid-item">
              <h1
                style={{ fontSize: '26px', fontFamily: 'Rubik !important', fontWeight: 600, color: 'black', margin: 0 }}
              >
                <b>AESOP</b>
              </h1>
              <h4 style={{ fontSize: '36px', color: 'black', margin: 0 }}>TERMINAL</h4>
              <h1
                style={{ fontSize: '26px', fontFamily: 'Rubik !important', fontWeight: 600, color: 'black', margin: 0 }}
              >
                OFF WHITE
              </h1>
              <hr />
              <div className="d-flex">
                <div>
                  <h4 className="m-0">VEN#</h4>
                  <h4 className="m-0">PO#</h4>
                  <h4 className="m-0">VPN</h4>
                </div>
                <div>
                  <h4 className="text-center m-0" style={{ width: '50px' }}>
                    :
                  </h4>
                  <h4 className="text-center m-0" style={{ width: '50px' }}>
                    :
                  </h4>
                  <h4 className="text-center m-0" style={{ width: '50px' }}>
                    :
                  </h4>
                </div>
                <div>
                  <h4 className="m-0">{data?.supplier}</h4>
                  <h4 className="m-0">{data?.order_no}</h4>
                  <h4 className="m-0">{data?.barcode}</h4>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between mx-4">
                <div>
                  <h4 className="m-0">STYLE</h4>
                  <h4 className="text-center">{data?.style}</h4>
                </div>
                <div>
                  <h4 className="m-0">COLOR</h4>
                  <h4 className="text-center">{data?.color}</h4>
                </div>
                <div>
                  <h4 className="m-0">SIZE</h4>
                  <h4 className="text-center">{data?.size}</h4>
                </div>
                <div>
                  <h4 className="m-0">DIM</h4>
                  <h4 className="text-center">{data?.dimension}</h4>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="d-flex">
                <h4>QUANTITY:</h4>
                <h4 className="text-center ml-3">{data?.qty}</h4>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ComponentToPrint;
