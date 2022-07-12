import * as EmailValidator from 'email-validator';
import { checkEmails } from '../../../apiService';

export const disabledCharacterName = (e) => {
  if (e.target.selectionStart === 0 && !/[a-zA-Z0-9]/g.test(e.key) || !/[a-zA-Z0-9 _-]/g.test(e.key)) e.preventDefault();
};

export const gotoUM = (props) => {
  props.history.push('/users-management');
};

export const onClickSuspendUser = ({ state, setState }) => {
  const newState = { ...state };
  const accountInfoUpdate = { ...newState.accountInfo };
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
  const newState = { ...state };
  let isValid = true;
  const { target: value } = e.target.value;
  if (!value) isValid = false;

  newState.validation.email.isValid = isValid;

  const validFormat = EmailValidator.validate(value);
  if (!validFormat) {
    newState.validation.email.isValid = false;
    newState.validation.email.message = 'Invalid format (eg. microlistics@test.com)';
  } else {
    const check = await checkEmails({ email: value });
    const statusCode = check?.status;
    if (statusCode === 200) {
      if (check?.data?.exists) {
        newState.validation.email.isValid = false;
        newState.validation.email.message = 'Email address has been registered';
      } else {
        newState.validation.email.isValid = true;
        newState.validation.email.message = 'Invalid format (eg. microlistics@test.com)';
      }
    } else if (statusCode === 422) {
      newState.validation.email.isValid = false;
      newState.validation.email.message = 'The email must be a valid email address.';
    }
  }
  setState(newState);
};

export const buttonValidation = async ({ setIsButton, validation }) => {
  let status = true;
  if (validation) {
    for (const key in validation) {
      if (!validation[key].isValid) {
        status = false;
      }
    }

    if (status) {
      setIsButton(true);
    } else {
      setIsButton(false);
    }
  }
};
