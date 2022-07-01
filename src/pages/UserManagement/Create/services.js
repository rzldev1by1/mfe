import * as EmailValidator from 'email-validator';
import endpoints from '../../../helpers/endpoints';
import { submitUserManagement, checkEmails } from '../../../apiService';

export const submit = async ({ data, isAdmin, setIsSubmitReturn, setActiveTab, setIsSubmitStatus, setShow }) => {
  const { moduleAccess, clients, sites, name } = data;


  const adminMenu = moduleAccess.map(item => {
    return item.menu_id;
  });

  const userMenu = moduleAccess
    .filter((item) => {
      return item.status === true;
    })
    .map(item => {
      return item.menu_id;
    });

  const siteFiltered = sites.filter((item) => {
    return item.status === true;
  });
  const siteValue =
    siteFiltered.length === 1 || siteFiltered.length === sites.length ? siteFiltered.map((item) => item.site) : null;
  const clientFiltered = clients.filter((item) => {
    return item.status === true;
  });
  const clientValue =
    clientFiltered.length === 1 || clientFiltered.length === clients.length
      ? clientFiltered.map((item) => item.code)
      : null;

  const submitData = {
    ...data,
  };

  submitData.userMenu = isAdmin ? adminMenu : userMenu;
  if (!isAdmin) {
    if (!siteValue.length === sites.length) {
      submitData.site = siteValue[0]
    }
  }
  if (!isAdmin) {
    if (!clientValue.length === clients.length) {
      submitData.client = clientValue[0]
    }
  }
  submitData.webGroup = isAdmin ? 'Admin' : 'Regular';
  submitData.disabled = 'N';

  const ret = await submitUserManagement({ data: submitData });

  const status = ret?.status;
  const message = ret?.data?.message;
  const submitReturn = { status, message, role: isAdmin ? 'Admin' : 'Regular', name };
  await setIsSubmitReturn(submitReturn);
  await setActiveTab('message');
  setIsSubmitStatus('done');
  setShow(false)
};

export const renewState = ({ setState, state, siteData, clientData, moduleAccess, reset = false }) => {
  if (reset) {
    state = {
      userId: null,
      email: null,
      name: null,
      moduleAccess: [],
      isEnableAllModule: false,
      sites: [],
      isEnableAllSite: false,
      clients: [],
      isEnableAllClient: false,
      validate: false,
      isAdmin: false,

      changed: false,
      isLoadComplete: false,
      adminClass: '',
      validation: {
        name: { isValid: null, invalidClass: 'is-invalid', message: 'Username must be entered' },
        email: { isValid: null, invalidClass: 'is-invalid', message: 'Email must be entered' },
        modules: {
          isValid: false,
          invalidClass: 'is-invalid',
          message: 'Please enable at least one on module access',
        },
        sites: { isValid: false, invalidClass: 'is-invalid', message: 'Please enable at least one on site' },
        clients: { isValid: false, invalidClass: 'is-invalid', message: 'Please enable at least one on client' },
      },
    };
  }

  const clientOption = [];
  if (clientData) {
    clientData?.forEach(item => {
      if (item.value !== 'all') {
        const newItem = {
          code: item.value,
          name: item.label,
          status: false,
        };
        clientOption.push(newItem);
      }
    });
  }

  const siteOption = [];
  if (siteData) {
    siteData.forEach(item => {
      if (item.value !== 'all') {
        const newItem = {
          site: item.value,
          name: item.label,
          status: false,
        };
        siteOption.push(newItem);
      }
    });
  }

  const isDevelopment = endpoints.env.REACT_APP_SUPPLIER;
  const moduleAccessOption = [];
  const allowedValues = [
    'menu_orders_po_open',
    'menu_orders_highSoOrder',
    'menu_inventory_stkHolding',
    'menu_inventory_stkMovement',
    'menu_inventory_sPortal',
    'menu_manageUsers_supplierUsers',
  ];
  const allowedValuesNotSP = [
    'menu_orders_po_open',
    'menu_orders_highSoOrder',
    'menu_inventory_stkHolding',
    'menu_inventory_stkMovement',
    'menu_inventory_sPortal',
  ];
  if (moduleAccess) {
    moduleAccess?.forEach(item => {
      if (isDevelopment === "false") {
        if (allowedValuesNotSP.includes(item.menu_id)) {
          item.status = false;
          moduleAccessOption.push(item);
        }
      } else if (allowedValues.includes(item.menu_id)) {
        item.status = false;
        moduleAccessOption.push(item);
      }
    });
  }

  state = { ...state, sites: siteOption, clients: clientOption, moduleAccess: moduleAccessOption };
  setState(state);
};

export function generateUserID({ textValue }) {
  const newText = textValue.substring(0, 1);
  let result = '';

  if (textValue && textValue.length > 0) {
    const anysize = 4;
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < anysize; i += 1) result += charset[Math.floor(Math.random() * 26)];
  }

  return {
    userId: newText.toLowerCase() + result,
    password: result + newText.toLowerCase(),
  };
}

export const validateButton = ({ state, setState }) => {
  const newState = { ...state };
  const validation = newState?.validation;

  let status = true;

  for (const key in validation) {
    // if (admin && !menuForAdmin.includes(key)) {
    //   continue;
    // }

    if (!validation[key].isValid) {
      status = false;
    }
  }
  if (setState) {
    newState.validate = status;
    setState(newState);
  } else {
    return status;
  }
  return false
};

export const changeDetails = async ({ isAdmin, setState, state, column, e }) => {
  const value = e?.target?.value;
  const newState = { ...state };
  let isValid = true;
  if (!value) {
    isValid = false;
  }
  newState[column] = value;

  newState.validation[column].isValid = isValid;

  if (column === 'email') {
    const validFormat = EmailValidator.validate(value);
    if (!validFormat) {
      newState.validation[column].isValid = false;
      newState.validation[column].message = 'Invalid format (eg. microlistics@test.com)';
    } else {
      const check = await checkEmails({ email: value });
      const statusCode = check?.status;
      if (statusCode === 200) {
        if (check?.data?.exists) {
          newState.validation[column].isValid = false;
          newState.validation[column].message = 'Email address has been registered';
        } else {
          newState.validation[column].isValid = true;
          newState.validation[column].message = 'Invalid format (eg. microlistics@test.com)';
        }
      } else if (statusCode === 422) {
        newState.validation[column].isValid = false;
        newState.validation[column].message = 'The email must be a valid email address.';
      }
    }
  }
  if (column === 'name') {
    if (!value) {
      newState.validation[column].message = 'username must be entered';
    }

    const generate = await generateUserID({ textValue: value });
    newState.userId = generate?.userId;
    newState.password = generate?.password;
  }
  newState.changed = true;

  const validate = await validateButton({ isAdmin, state });
  newState.validate = validate;
  setState(newState);
};

export const resetState = ({ setState }) => {
  setState({
    userId: null,
    email: null,
    name: null,
    moduleAccess: [],
    isEnableAllModule: false,
    sites: [],
    isEnableAllSite: false,
    clients: [],
    isEnableAllClient: false,
    validate: false,
    isAdmin: false,

    changed: false,
    isLoadComplete: false,
    adminClass: '',
    validation: {
      name: { isValid: false, invalidClass: 'is-invalid', message: '' },
      email: { isValid: false, invalidClass: 'is-invalid', message: '' },
      modules: {
        isValid: false,
        invalidClass: 'is-invalid',
        message: 'Please enable at least one on module access',
      },
      sites: { isValid: false, invalidClass: 'is-invalid', message: 'Please enable at least one on site' },
      clients: { isValid: false, invalidClass: 'is-invalid', message: 'Please enable at least one on client' },
    },
  });
};

export const setIsAdmin = async ({ state, setState }) => {
  const newState = { ...state };
  const admin = !newState.isAdmin;

  newState.isAdmin = admin;
  setState(newState);
};

export const disabledCharacterName = (e) => {
  if (e.target.selectionStart === 0 && !/[a-zA-Z0-9]/g.test(e.key)) {
    e.preventDefault();
  }
  if (!/[a-zA-Z0-9 _-]/g.test(e.key)) {
    e.preventDefault();
  }
};
