import React from 'react';

export const schemaColumn = [
  {
    accessor: 'userid',
    placeholder: 'User Id',
    Header: 'User ID',
    width: 160,
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : 'No Access Logged'}</span>,
  },
  {
    accessor: 'name',
    placeholder: 'UserName',
    Header: 'Name',
    width: 210,
    sortable: false,
    Cell: (props) => <span>{props.value ? props.value : 'No Access Logged'}</span>,
    sortType: 'name',
  },
  {
    accessor: 'site',
    placeholder: 'Site',
    Header: 'Site',
    width: 130,
    sortable: false,
    Cell: (props) => <span>{props.value ? props.value : 'No Access Logged'}</span>,
    sortType: 'string',
  },
  {
    accessor: 'client',
    placeholder: 'Client',
    Header: 'Client',
    width: 130,
    sortable: false,
    Cell: (props) => <span>{props.value ? props.value : 'No Access Logged'}</span>,
    sortType: 'string',
  },
  {
    accessor: 'web_group',
    placeholder: 'User Lavel',
    Header: 'User Level',
    width: 160,
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : 'No Access Logged'}</span>,
  },
  {
    accessor: 'last_access',
    placeholder: 'Last Accessed',
    Header: 'Last Accessed',
    width: 180,
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : 'No Access Logged'}</span>,
  },
  {
    accessor: 'disabled',
    placeholder: 'Status',
    Header: 'Status',
    width: 120,
    sortMethod: (a, b) => {
      if (a === b) {
        return 0;
      }
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    },
    Cell: (row) =>
      row.value === 'Y' ? (
        <label className="um-suspended">Suspended</label>
      ) : (
        <label className="um-active">Active</label>
      ),
  },
];

// ModuleAccess
export const onModuleAccessClick = ({ e, index, state, setState }) => {
  const newState = { ...state };
  let newValidation = { ...newState.validation };
  let moduleAccess = [...newState.moduleAccess];
  let newModules = moduleAccess.map((item, idx) => {
    if (idx === index) {
      item.status = !item.status;
    }
    return item;
  });

  const isEnableAll = newModules.filter((item) => {
    return item.status === true;
  }).length;
  const newIsEnableAllModule = moduleAccess.length === isEnableAll ? true : false;

  newValidation.modules.isValid = isEnableAll > 0;

  newState.moduleAccess = newModules;
  newState.isEnableAllModule = newIsEnableAllModule;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};

export const onEnabledAllModuleAccess = ({ state, setState }) => {
  const newState = { ...state };
  let newValidation = { ...newState.validation };
  let newModuleAccess = [...newState.moduleAccess];
  let newIsEnableAllModule = newState.isEnableAllModule;
  let newArray = newModuleAccess.map((item, index) => {
    let newItem = item;
    newItem.status = !newIsEnableAllModule;
    return newItem;
  });
  newValidation.modules.isValid = newArray.filter((m) => m.status !== false).length > 0;

  newState.moduleAccess = newArray;
  newState.isEnableAllModule = !newIsEnableAllModule;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};
// And ModuleAccess

// Site
export const onSiteStatusClick = ({ e, index, state, setState }) => {
  const newState = { ...state };
  let newValidation = { ...newState.validation };
  let sites = [...newState.sites];
  let newSites = sites.map((item, idx) => {
    if (idx === index) {
      item.status = true;
    } else {
      item.status = false;
    }
    return item;
  });
  let isEnableAll = newSites.filter((item) => {
    return item.status === true;
  }).length;
  let isEnableAllSite = sites.length === isEnableAll ? true : false;

  newValidation.sites.isValid = isEnableAll > 0;
  newState.sites = newSites;
  newState.isEnableAllSite = isEnableAllSite;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};

export const onEnabledAllSite = ({ state, setState }) => {
  const newState = { ...state };
  let newValidation = { ...newState.validation };
  let newIsEnableAllSite = newState.isEnableAllSite;
  let sites = [...newState.sites];
  var newArray = sites.map((item, index) => {
    item.status = !newIsEnableAllSite;
    return item;
  });

  newValidation.sites.isValid = newArray.filter((s) => s.status !== false).length > 0;
  newState.sites = newArray;
  newState.isEnableAllSite = !newIsEnableAllSite;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};
// And Site

// Client
export const onClientStatusClick = ({ e, index, state, setState }) => {
  console.log(state);
  const newState = { ...state };
  let newValidation = { ...newState.validation };
  let clients = [...newState.clients];
  let newClients = clients.map((item, idx) => {
    if (idx === index) {
      item.status = true;
    } else {
      item.status = false;
    }
    return item;
  });
  let isEnableAll = newClients.filter((item) => {
    return item.status === true;
  }).length;
  let newIsEnableAllClient = clients.length === isEnableAll ? true : false;

  newValidation.clients.isValid = isEnableAll > 0;

  newState.clients = newClients;
  newState.isEnableAllClient = newIsEnableAllClient;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};

export const onEnabledAllClient = ({ state, setState }) => {
  const newState = { ...state };
  let newValidation = { ...newState.validation };
  let newIsEnableAllClient = newState.isEnableAllClient;
  let clients = [...newState.clients];
  var newArray = clients.map((item, index) => {
    item.status = !newIsEnableAllClient;
    return item;
  });

  newValidation.clients.isValid = newArray.filter((c) => c.status !== false).length > 0;

  newState.clients = newArray;
  newState.isEnableAllClient = !newIsEnableAllClient;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};
// And Client
