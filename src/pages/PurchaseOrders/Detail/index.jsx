/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'Component/Breadcrumb';
import DetailHeader from 'Component/DetailHeader'
import TableMaster from 'Component/TableMaster';
import { getDetail, getProductsTable } from './service';

const columns = [
    { 
      accessor: "rn",  
      placeholder: 'Line Nooo', 
      Header: "Line No",
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    { 
      accessor: "product",   
      placeholder: 'Product', 
      Header: "Product" ,
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    { 
      accessor: "product_name",  
      placeholder: 'Description', 
      Header: "Description" ,
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    { 
      accessor: "quantity",  
      Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),   
      placeholder: 'Qty', 
      Header: "Qty", 
      sortType: "float" 
    },
    { 
      accessor: "packdesc_1",  
      placeholder: 'UOM', 
      Header: "UOM",
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    { 
      accessor: "qty_processed", 
      Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),    
      placeholder: 'Qty Processed', 
      Header: "Qty Processed",
      sortType: "float" 
    },
    { 
      accessor: "weight",  
      Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),   
      placeholder: 'Wght', 
      Header: "Wght", 
      sortType: "float" 
    },
    { 
      accessor: "weight_processed",  
      Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),   
      placeholder: 'Wght Processed', 
      Header: "Wght Processed", 
      sortType: "float"
    },
    {
      accessor: "completed",  
      placeholder: 'Completed', 
      Header: "Completed",
      Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    },
    { 
      accessor: "batch",  
      Cell: row => (<div className="text-left">{row.value ? row.value : '-'}</div>),   
      placeholder: 'Batch', 
      Header: "Batch",
    },
    { 
      accessor: "rotadate",  
      placeholder: 'Rotadate', 
      Header: "Rotadate" ,
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    { 
      accessor: "ref3", 
      placeholder: 'Ref3', 
      Header: "Ref3",
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    { 
      accessor: "ref4",  
      placeholder: 'Ref4', 
      Header: "Ref4",
      Cell: props => <span>{props.value ? props.value : '-‎‎‎‎‎‎‎‎‎‎'}</span>   
    },
    { 
      accessor: "disposition", 
      placeholder: 'Disposition', 
      Header: "Disposition" ,
      Cell: props => <span>{props.value ? props.value : '-'}</span>  
    },
    {
      accessor: "released",
      placeholder: 'Released', 
      Header: "Released", 
      Cell: (row) => <i className={`${row.original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    }
  ]

const PurchaseOrdersDetail = (props) => {
    const dispatch = useDispatch();
    const poDetail = useSelector((state) => state.poDetail);
    const poDetailTable = useSelector((state) => state.poDetailTable);
    const pagination = useSelector((state) => state.pagination);
    const [active, setActive] = useState(1);

    const [page, setPage] = useState({
        // Paging
        notifPaging: false,
        goPage: 1,
        // table
        data: [],
        tableStatus: 'waiting',
        status: null,
        search: '',
        active: {},
      });

useEffect(() => {}, [page]);
useEffect(() => {
    getDetail({ dispatch, props });
  }, []);
  useEffect(() => {
    getProductsTable({ dispatch, props, page, active, setPage })
  }, [active]);

  const height = window.innerHeight - 370;
  const widht = window.innerWidth;
  return (
    <div>
      <Breadcrumb
        breadcrumb={[
            { to: '/purchase-order', label: 'Purchase Order',},
            { to: '', label: props.match.params.orderdetail, active: true },
        ]}
        
      />
      <div className="pb-3">
        <DetailHeader
            // title Right
          titleRight
          titleRightOne="Site"
          titleRightTwo="Client"
          titleRightThree="Order No"
          titleRightFour="Order Type"
          titleRightFive="Task"
          titleRightSix="Status"
            // Valeu Right
          valeuRightOne={poDetail.site || "-"}
          valeuRightTwo={poDetail.client || "-"}
          valeuRightThree={poDetail.order_no || "-"}
          valeuRightFour={poDetail.order_type || "-"}
          valeuRightFive={poDetail.isis_task || "-"}
          valeuRightSix={poDetail.status || "-"}
            // title Center
          titleCenter
          titleCenterOne="Supplier No"
          titleCenterTwo="Supplier Name"
          titleCenterThree="Customer Order Ref"
          titleCenterFour="Vendor Order Ref"
            // Valeu Center
          valeuCenterOne={poDetail.supplier_no || "-"}
          valeuCenterTwo={poDetail.supplier_name || "-"}
          valeuCenterThree={poDetail.customer_order_ref || "-"}
          valeuCenterFour={poDetail.vendor_oreder_ref || "-"}
            // title Left
          titleLeft
          titleLeftOne="Order Date"
          titleLeftTwo="Date Received"
          titleLeftThree="Date Released"
          titleLeftFour="Date Completed"
            // Valeu Left
          valeuLeftOne={poDetail.delivery_date || "-"}
          valeuLeftTwo={poDetail.date_received  || "-"}
          valeuLeftThree={poDetail.date_released || "-"}
          valeuLeftFour={poDetail.date_completed || "-"}
        />
      </div>
      <TableMaster
        schemaColumn={columns}
        data={poDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
        module="Purchase Orders"
        noDataText
        tableStatus
        pagination={pagination}
        goto={(e) => {
            setActive(e);
          }}
        exportData
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default PurchaseOrdersDetail;
