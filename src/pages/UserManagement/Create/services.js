import axios from 'axios';
import endpoints from 'helpers/endpoints';
import numeral from 'numeral';
import { checkOrderNo, submitUserManagement, checkEmails } from 'apiService';
import { getUOM } from 'apiService/dropdown';
import * as EmailValidator from 'email-validator';

export const submit = async ({ data, isAdmin, setIsSubmitReturn, setActiveTab, setIsSubmitStatus }) => {
  const { moduleAccess, clients, sites, name } = data;


  let adminMenu = moduleAccess.map((item, index) => {
    return item.menu_id;
  });

  let userMenu = moduleAccess
    .filter((item) => {
      return item.status === true;
    })
    .map((item, index) => {
      return item.menu_id;
    });

  let siteFiltered = sites.filter((item) => {
    return item.status === true;
  });
  let siteValue =
    siteFiltered.length === 1 || siteFiltered.length === sites.length ? siteFiltered.map((item) => item.site) : null;
  let clientFiltered = clients.filter((item) => {
    return item.status === true;
  });
  let clientValue =
    clientFiltered.length === 1 || clientFiltered.length === clients.length
      ? clientFiltered.map((item) => item.code)
      : null;

  let submitData = {
    ...data,
  };

  submitData.userMenu = isAdmin ? adminMenu : userMenu;
  submitData.site = isAdmin ? null : siteValue.length == sites.length ? null : siteValue[0];
  submitData.client = isAdmin ? null : clientValue.length == clients.length ? null : clientValue[0];
  submitData.webGroup = isAdmin ? 'Admin' : 'Regular';
  submitData.disabled = 'N';

  const ret = await submitUserManagement({ data: submitData });

  //check return
  let status = ret?.status;
  let message = ret?.data?.message;
  let submitReturn = { status: status, message: message, role: isAdmin ? 'Admin' : 'Regular', name };
  await setIsSubmitReturn(submitReturn);
  await setActiveTab('message');
  setIsSubmitStatus('done');
};

export const renewState = ({ setState, state, siteData, clientData, moduleAccess, reset = false }) => {
  //if reset
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

  //renew client option
  let clientOption = [];
  let tmp = clientData?.map((item, key) => {
    if (item.value !== 'all') {
      let newItem = {
        code: item.value,
        name: item.label,
        status: false,
      };
      clientOption.push(newItem);
    }
  });

  // renew site dropdown
  let siteOption = [];
  tmp = siteData?.map((item, key) => {
    if (item.value !== 'all') {
      let newItem = {
        site: item.value,
        name: item.label,
        status: false,
      };
      siteOption.push(newItem);
    }
  });

  //renew module Access Option
  let moduleAccessOption = [];
  let allowedValues = [
    'menu_orders_po_open',
    'menu_orders_highSoOrder',
    'menu_inventory_stkHolding',
    'menu_inventory_stkMovement',
    'menu_inventory_sPortal',
  ];
  tmp = moduleAccess?.map((item, key) => {
    if (allowedValues.includes(item.menu_id)) {
      item.status = false;
      moduleAccessOption.push(item);
    }
  });

  state = { ...state, sites: siteOption, clients: clientOption, moduleAccess: moduleAccessOption };
  setState(state);
};

export const changeDetails = async ({ isAdmin, setState, state, column, e }) => {
  let value = e.target.value;
  let newState = { ...state };
  let isValid = true;
  if (!value) {
    isValid = false;
  }
  newState[column] = value;

  newState['validation'][column]['isValid'] = isValid;

  if (column == 'email') {
    let validFormat = EmailValidator.validate(value);
    if (!validFormat) {
      newState['validation'][column]['isValid'] = false;
      newState['validation'][column]['message'] = 'Invalid format (eg. microlistics@test.com)';
    } else {
      let check = await checkEmails({ email: value });
      let statusCode = check?.status;
      if (statusCode === 200) {
        if (check?.data?.exists) {
          newState['validation'][column]['isValid'] = false;
          newState['validation'][column]['message'] = 'Email address has been registered';
        } else {
          newState['validation'][column]['isValid'] = true;
          newState['validation'][column]['message'] = 'Invalid format (eg. microlistics@test.com)';
        }
      } else if (statusCode === 422) {
        newState['validation'][column]['isValid'] = false;
        newState['validation'][column]['message'] = 'The email must be a valid email address.';
      }
    }
  }
  if (column == 'name') {
    if (!value) {
      newState['validation'][column]['message'] = 'username must be entered';
    }

    let generate = await generateUserID({ textValue: value });
    newState['userId'] = generate?.userId;
    newState['password'] = generate?.password;
  }
  newState['changed'] = true;

  //validate
  let validate = await validateButton({ isAdmin, state });
  newState['validate'] = validate;
  setState(newState);
};

export const validateButton = ({ isAdmin, state, setState }) => {
  let newState = { ...state };
  const validation = newState['validation'];
  const admin = isAdmin;

  let status = true;
  let menuForAdmin = ['name', 'email'];

  for (var key in validation) {
    //if admin only check name and email
    if (admin && !menuForAdmin.includes(key)) {
      continue;
    }

    if (!validation[key]['isValid']) {
      status = false;
    }
  }
  if (setState) {
    newState['validate'] = status;
    setState(newState);
  } else {
    return status;
  }
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

export function generateUserID({ textValue }) {
  let newText = textValue.substring(0, 1);
  let result = '';

  if (textValue && textValue.length > 0) {
    var anysize = 4; //the size of string
    var charset = 'abcdefghijklmnopqrstuvwxyz'; //from where to create
    for (var i = 0; i < anysize; i++) result += charset[Math.floor(Math.random() * 26)];
  }

  return {
    userId: newText.toLowerCase() + result,
    password: result + newText.toLowerCase(),
  };
}

export const setIsAdmin = async ({ state, setState }) => {
  let newState = { ...state };
  let admin = !newState['isAdmin'];

  newState['isAdmin'] = admin;
  setState(newState);
};

export const disabledCharacterName = (e) => {
  if (e.target.selectionStart == 0 && !/[a-zA-Z0-9]/g.test(e.key)) {
    e.preventDefault();
  } else {
    if (!/[a-zA-Z0-9 _-]/g.test(e.key)) {
      e.preventDefault();
    }
  }
};
