import { resetPassword } from '../../../apiService';

export const closeModalPopupReset = ({ state, setState }) => {
  const newState = { ...state };
  newState.popUpReset = false;
  newState.isResetSuccess = false;
  setState(newState);
};

export const confirmResetPassword = ({ state, setState, props }) => {
  const newState = { ...state };
  newState.isSaveProgressing = false;
  newState.isLoadReset = true;
  resetPassword({ state, setState, props });
  setState(newState);
};
