import { checkEmails } from 'apiService';
import * as EmailValidator from 'email-validator';

export const disabledCharacterName = (e) => {
  if (e.target.selectionStart == 0 && !/[a-zA-Z0-9]/g.test(e.key)) {
    e.preventDefault();
  } else {
    if (!/[a-zA-Z0-9 _-]/g.test(e.key)) {
      e.preventDefault();
    }
  }
};

export const gotoUM = (props) => {
  props.history.push('/users-management');
};

export const onClieckSuspendUser = ({ state, setState }) => {
  const newState = { ...state };
  let accountInfoUpdate = { ...newState.accountInfo };
  accountInfoUpdate.disabled = !accountInfoUpdate.disabled;
  newState.accountInfo = accountInfoUpdate;
  newState.changed = true;
  setState(newState);
};

export const onClickResetPassword = ({ state, setState }) => {
  const newState = { ...state };
  newState.popUpReset = true;
  setState(newState);
};

export const onChangeEmail = async ({ e, state, setState }) => {
  let newState = { ...state };
  let isValid = true;
  if (!value) {
    isValid = false;
  }
  let value = e.target.value;
  newState['validation']['email']['isValid'] = isValid;

  let validFormat = EmailValidator.validate(value);
  if (!validFormat) {
    newState['validation']['email']['isValid'] = false;
    newState['validation']['email']['message'] = 'Invalid format (eg. microlistics@test.com)';
  } else {
    let check = await checkEmails({ email: value });
    let statusCode = check?.status;
    if (statusCode === 200) {
      if (check?.data?.exists) {
        newState['validation']['email']['isValid'] = false;
        newState['validation']['email']['message'] = 'Email address has been registered';
      } else {
        newState['validation']['email']['isValid'] = true;
        newState['validation']['email']['message'] = 'Invalid format (eg. microlistics@test.com)';
      }
    } else if (statusCode === 422) {
      newState['validation']['email']['isValid'] = false;
      newState['validation']['email']['message'] = 'The email must be a valid email address.';
    }
  }
  setState(newState);
};
