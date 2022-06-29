import { resetPassword } from '../../../apiService';

export const closeModalPopupReset = async ({ state, setState }) => {
  let i = 0;
  let id;
  if (i === 0) {
    i = 1;
    let element = document.getElementById('progressBar');
    if (element) {
      let width = 1;
      const frame = () => {
        if (width >= 120) {
          clearInterval(id);
          i = 0;
          const newState = { ...state };
          newState.popUpReset = false;
          setState(newState);
        } else {
          width += 1;
          element.style.width = `${width}%`;
        }
      }
      id = setInterval(frame, 130);
    }
  }
};
export const closeModalResetUM = ({ state, setState }) => {
  const newState = { ...state };
  newState.popUpReset = false;
  setState(newState);
};

export const closeModalResetUMDone = async ({ state, setState }) => {
  const newState = { ...state };
  newState.isResetSuccess = false;
  newState.statusReset = false;
  newState.popUpReset = false;
  setState(newState);
};

export const confirmResetPassword = ({ state, setState, props }) => {
  const newState = { ...state };
  newState.isSaveProgressing = false;
  newState.isLoadReset = true;
  resetPassword({ state, setState, props });
  setState(newState);
};
