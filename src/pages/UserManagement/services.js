import React from 'react';

export const schemaColumn = [
    { 
        accessor: 'userid',placeholder: 'User Id', Header: 'User ID', width: 160, sortable: true ,
        Cell: props => <span>{props.value ? props.value : 'No Access Logged'}</span>  
    },
    { 
        accessor: 'name',placeholder: 'UserName', Header: 'Name', width: 210, sortable: false,
        Cell: props => <span>{props.value ? props.value : 'No Access Logged'}</span>,
        sortType: "name"   
    },
    { 
        accessor: 'site',placeholder: 'Site', Header: 'Site', width: 130, sortable: false ,
        Cell: props => <span>{props.value ? props.value : 'No Access Logged'}</span> ,
        sortType: "string"  
    },
    { 
        accessor: 'client',placeholder: 'Client', Header: 'Client', width: 130, sortable: false ,
        Cell: props => <span>{props.value ? props.value : 'No Access Logged'}</span>,
        sortType: "string" 
    },
    { 
        accessor: 'web_group',placeholder: 'User Lavel', Header: 'User Level', width: 160, sortable: true ,
        Cell: props => <span>{props.value ? props.value : 'No Access Logged'}</span>  
    },
    { 
        accessor: 'last_access',placeholder: 'Last Accessed', Header: 'Last Accessed', width: 180, sortable: true ,
        Cell: props => <span>{props.value ? props.value : 'No Access Logged'}</span>  
    },
    { accessor: 'disabled',placeholder: 'Status', Header: 'Status', width: 120, sortMethod: (a, b) => {
        if (a === b) {
          return 0;
        }
        return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
      },Cell: row => (row.value === 'Y'? <label className="um-suspended">Suspended</label> : <label className="um-active">Active</label>)
    },
]