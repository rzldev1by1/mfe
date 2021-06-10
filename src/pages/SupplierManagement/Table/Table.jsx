// import library
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table-v6';
import withDraggableColumns from 'react-table-hoc-draggable-columns';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import EditRenameColumn from '../../../Component/Table/EditRenameColumn';

// import style
import loading from '../../../assets/icons/loading/LOADING-MLS-GRAY.gif';
import { setDraggableColumn, saveSchemaToLocal, renewColumn, markRow } from '../../../Component/Table/service';
import 'react-table-v6/react-table.css';
import 'react-table-hoc-draggable-columns/dist/styles.css';
import '../../../Component/Table/style.scss';

const ReactTableDraggableColumns = withDraggableColumns(ReactTable)
const noDataMessage = (
  <div className="caution-caution">
    <div>No Data Available</div>
  </div>
);

const loadingMessage = (
  <div style={{background:'transparent'}}>
    <img src={loading} alt="" width="45" height="45" />
  </div>
);
class Table extends React.Component{

  constructor(props){
    super(props)
    this.state={
      showMod:false,
      editColumnTemp:[],
      fields: this.props.schemaColumn,
      newSchema:this.props.schemaColumn,

    }
  }

  shouldComponentUpdate(props, state){
    if(this.state.editColumnTemp !== state.editColumnTemp 
        
        || props.data !== this.props.data 
        || props.columnHidden !== this.props.columnHidden 
        ||state.fields !== this.state.fields
        || props.editColumn !== this.props.editColumn
      ){
      renewColumn({ 
        setNewSchema: (ns) => this.setState({newSchema:ns}),
         data:this.props.data,
         fields:this.state.fields,
         module:this.props.module,
         userId:this.props.userId,
         editColumnTemp:this.state.editColumnTemp,
         showModal:(value) => this.setState({showMod:value}),
         columnHidden:this.props.columnHidden,
         editColumn:this.props.editColumn
        });
        return true
    } 
    return true
  }

  setNewSchema = (newSchema) => {
    this.setState({newSchema})
  }

  render(){
    const {
      schemaColumn,
      onClick,
      onChange,
      data,
      style,
      module,
      className,
      user,
      title,
      columnHidden,
      splitModule,
      editColumn,
      editOrderQty,
      editCarton,
    
      //from redux
      userId,
      tableStatus,
      isInvalidOrderQty,
      markedRow
    } = this.props

    const {
      showMod,
      editColumnTemp,
      newSchema,
      fields
    } = this.state

    const {dispatch} = this.props
    const draggableColumn = setDraggableColumn({ fields });
      return (
        <div
          className={`${className} ${editColumn === 'false' ? '' : 'show-edit-icon'} ${
            (data && data < 1) || data === undefined ? 'TableDownHover' : 'Table'
          }`}
        >
          <ReactTableDraggableColumns
            draggableColumns={{
              mode: 'reorder',
              draggable: draggableColumn,
            }}
            
            columns={[...newSchema, {
              accessor: 'edit_qty',
              Header: 'Edit Qty',
              width: 130,
              headerStyle: { textAlign: 'left', marginLeft: '1rem' },
              sortable:false,
              Cell: (props) => 
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 200, hide: 350 }}
                overlay={(
                  <Tooltip id={`tooltip-bottom_orderQty_${props?.row._index}`} className={ props.original.isInvalidOrderQty ? 'tooltip-outOfReamining' : 'tooltip-remaining' }>
                  Remaining qty: 
                  {' '}
                  <strong>{props?.original.order_qty}</strong>
                </Tooltip>
              )}
            >
                <NumberFormat
                autoComplete="off"
                thousandSeparator
                style={{width:'100px', marginLeft: '1rem'}}
                className={`input-in-table ${props.original.isInvalidOrderQty ? 'invalid-input': 'remaining-input'}`}
                value={props.value}
                decimalScale={0}
                onChange={(e) => onChange(e, props)}
              />
              </OverlayTrigger>
            }, {
              accessor: 'edit_carton',
              Header: 'Edit Cartons',
              width: 130,
              headerStyle: { textAlign: 'left', marginLeft: '-0.5rem' },
              sortable:false,
              Cell: (props) => (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(
                    <Tooltip id={`tooltip-bottom_noOfCarton_${props?.row._index}`} className={ props.original.isInvalidOrderCarton ? 'tooltip-outOfReamining' : 'tooltip-remaining' }>
                      Remaining qty: 
                      {' '}
                      <strong>{props?.original.no_of_carton}</strong>
                    </Tooltip>
                  )}
                >
                  <NumberFormat
                    autoComplete="off"
                    thousandSeparator
                    style={{width:'100px'}}
                    className={`input-in-table ${props.original.isInvalidOrderCarton ? 'invalid-input': 'remaining-input'}`}
                    value={props.value}
                    decimalScale={0}
                    id={`edit_carton_${props?.row._index}`}
                    onChange={(e) => onChange(e, props)}
                  />
                </OverlayTrigger>
              )
            }, { 
              Header: <div className="edit-column" onClick={() => this.setState({showMod:true})}><i className="newIcon-edit_column" /></div>,
              accessor: 'editBtn',
              width: 50,
              style: { textAlign: 'center' },
              sortable: false,
            }
          ]}
            data={data}
            showPagination={false}
            defaultPageSize={50}
            style={style}
            noDataText={tableStatus === 'noData' ? noDataMessage : loadingMessage}
            minRows="1"
            getTdProps={(state, rowInfo, column, instance) => {
              const isMarked = state.data[rowInfo?.index]?.isMarked
              return {
                onClick: (e) => {
                  const isEdit = column.id === 'edit_qty' || column.id === 'edit_carton' ? true : false
                  !!onClick && !isEdit && onClick(e, rowInfo);
                },
                // eslint-disable-next-line no-restricted-globals
                style: {
                  textAlign: isNaN(rowInfo?.original[column.id]) ? 'left' : 'right',
                  height: '3rem',
                  backgroundColor: isMarked ? 'aliceblue' : false
                },
              };
            }}
            defaultSortMethod={(a, b) => {
              let type = 'string';
              a = a !== '-' ? a : '';
              b = b !== '-' ? b : '';
              a = a ? a.replaceAll(',', '') : '';
              b = b ? b.replaceAll(',', '') : '';
    
              // check format if date
              if (a && a.includes('/')) {
                const str = a.split('/');
                const date = `${str[1]}-${str[0]}-${str[2]}`;
                let tmp = new Date(date).getTime();
                if (!isNaN(tmp)) {
                  a = tmp;
                  type = 'date';
                }
              }
              if (b && b.includes('/')) {
                const str = b.split('/');
                const date = `${str[1]}-${str[0]}-${str[2]}`;
                let tmp = new Date(date).getTime();
                if (!isNaN(tmp)) {
                  b = tmp;
                  type = 'date';
                }
              }
              //end date
    
              //check format if number
              const regex = /^\d*(\.\d+)?$/;
              let typeA = 'string';
              let typeB = 'string';
              if (type == 'string' && a.match(regex)) {
                let tmp = parseFloat(a);
                if (!isNaN(tmp)) {
                  a = tmp;
                  typeA = 'number';
                }
              } else if (type == 'string') {
                a = a.toLowerCase();
              }
              if (type == 'string' && b.match(regex)) {
                let tmp = parseFloat(b);
                if (!isNaN(tmp)) {
                  b = tmp;
                  typeB = 'number';
                }
              } else if (type == 'string') {
                b = b.toLowerCase();
              }
              type = typeA == 'number' && typeB == 'number' ? 'number' : 'string';
              //end check number
    
              // force null and undefined to the bottom
              a = a === '' ? (type === 'string' ? '' : -999999999999) : a;
              b = b === '' ? (type === 'string' ? '' : -999999999999) : b;
    
              // Return either 1 or -1 to indicate a sort priority
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              }
              // returning 0, undefined or any falsey value will use subsequent sorts or
              // the index as a tiebreaker
              return 0;
            }}
          />
    
          {editColumn === 'false' ? null : (
            <EditRenameColumn
              showModal={showMod}
              setShowMod={(value) => this.setState({showMod:value})}
              setEditColumnTemp={(value) => this.setState({editColumnTemp:value})}
              editColumnTemp={editColumnTemp}
              user={user}
              title={title}
              fields={fields}
              setFields={(value) => this.setState({fields:value})}
              columnHidden={columnHidden}
              splitModule={splitModule}
              module={module}
            />
          )}
        </div>
      );
  }
  
};

const mapStateToProps = (state) => {
  return{
    userId : state.user.userId,
    tableStatus : state.tableStatus,
    isInvalidOrderQty : state.isInvalidOrderQty,
    markedRow : state.markedRow
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
