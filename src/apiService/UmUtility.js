export function writeToLocalStorage(keyName, value) {
  if (localStorage.getItem(keyName)) {
    localStorage.removeItem(keyName);
  }

  localStorage.setItem(keyName, JSON.stringify(value));
}

export function readFromLocalStorage(keyName) {
  let result = {};
  if (localStorage.getItem(keyName)) {
    result = JSON.parse(localStorage.getItem(keyName))
  }

  return result;
}

export function generateUserID(textValue) {
  let result = "";

  if (textValue && textValue.length > 0) {
    const anysize = 4; // the size of string
    const charset = "abcdefghijklmnopqrstuvwxyz"; // from where to create
    for (let i = 0; i < anysize; i += 1)
      result += charset[Math.floor(Math.random() * 26)];
  }

  return result;
}

export const webgroup = {
  WAREHOUSE: 'Regular',
  ADMIN: 'Admin'
}

export const validationMsg = {
  INVALID_EMAIL: 'Invalid format (eg. microlistics@test.com)',
  USERNAME_REQUIRED: 'Name must be entered',
  EMAIL_EXIST: 'Email address has been registered'
}
