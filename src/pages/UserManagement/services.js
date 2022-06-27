import React from 'react';

export const schemaColumn = [
  {
    accessor: 'userid',
    placeholder: 'User Id',
    Header: 'User ID',
    width: 160,
    headerStyle: { textAlign: 'left', paddingLeft: '15px' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? 'No Access Logged' : value}</span>
    }
  },
  {
    accessor: 'name',
    placeholder: 'UserName',
    Header: 'Name',
    width: 210,
    sortable: true,
    sortType: 'name',
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? 'No Access Logged' : value}</span>
    },
  },
  {
    accessor: 'site',
    placeholder: 'Site',
    Header: 'Site',
    width: 130,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? 'No Access Logged' : value}</span>
    },
    sortType: 'string',
  },
  {
    accessor: 'client',
    placeholder: 'Client',
    Header: 'Client',
    width: 130,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? 'No Access Logged' : value}</span>
    },
    sortType: 'string',
  },
  {
    accessor: 'web_group',
    placeholder: 'User Lavel',
    Header: 'User Level',
    width: 160,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? 'No Access Logged' : value}</span>
    },
  },
  {
    accessor: 'last_access',
    placeholder: 'Last Accessed',
    Header: 'Last Accessed',
    width: 180,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{value === '-' ? 'No Access Logged' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      if (value === 'Suspended') return <span className="um-suspended m-0">Suspended</span>
      return <span className="um-active m-0">Active</span>
    },
  },
];

// ModuleAccess
export const onModuleAccessClick = ({ index, state, setState }) => {
  const newState = { ...state };
  const newValidation = { ...newState.validation };
  const moduleAccess = [...newState.moduleAccess];
  const newModules = moduleAccess.map((item, idx) => {
    if (idx === index) {
      if (item.status === false) item.status = true;
      else item.status = false
    }
    return item;
  });

  const isEnableAll = newModules.filter((item) => {
    return item.status === true;
  }).length;
  const isEnableAllModule = moduleAccess.length === isEnableAll ? true : false;

  newValidation.modules.isValid = isEnableAll > 0;
  newState.moduleAccess = newModules;
  newState.isEnableAllModule = isEnableAllModule;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};

export const onEnabledAllModuleAccess = ({ state, setState }) => {
  const newState = { ...state };
  const newValidation = { ...newState.validation };
  const newModuleAccess = [...newState.moduleAccess];
  const newIsEnableAllModule = newState.isEnableAllModule;
  const newArray = newModuleAccess.map(item => {
    item.status = !newIsEnableAllModule;
    return item;
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
export const onSiteStatusClick = ({ index, state, setState }) => {
  const newState = { ...state };
  const newValidation = { ...newState.validation };
  const sites = [...newState.sites];
  const newSites = sites.map((item, idx) => {
    if (idx === index) item.status = true;
    else item.status = false;
    return item;
  });
  const isEnableAll = newSites.filter((item) => {
    return item.status === true;
  }).length;
  const isEnableAllSite = sites.length === isEnableAll ? true : false;

  newValidation.sites.isValid = isEnableAll > 0;
  newState.sites = newSites;
  newState.isEnableAllSite = isEnableAllSite;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};

export const onEnabledAllSite = ({ state, setState }) => {
  const newState = { ...state };
  const newValidation = { ...newState.validation };
  const sites = [...newState.sites];
  const newIsEnableAllSite = newState.isEnableAllSite;
  const newArray = sites.map(item => {
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
export const onClientStatusClick = ({ index, state, setState }) => {
  const newState = { ...state };
  const newValidation = { ...newState.validation };
  const clients = [...newState.clients];
  const newClients = clients.map((item, idx) => {
    if (idx === index) item.status = true;
    else item.status = false;
    return item;
  });
  const isEnableAll = newClients.filter((item) => {
    return item.status === true;
  }).length;
  const newIsEnableAllClient = clients.length === isEnableAll ? true : false;

  newValidation.clients.isValid = isEnableAll > 0;

  newState.clients = newClients;
  newState.isEnableAllClient = newIsEnableAllClient;
  newState.validation = newValidation;
  newState.changed = true;
  setState(newState);
};

export const onEnabledAllClient = ({ state, setState }) => {
  const newState = { ...state };
  const newValidation = { ...newState.validation };
  const newIsEnableAllClient = newState.isEnableAllClient;
  const clients = [...newState.clients];
  const newArray = clients.map(item => {
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
