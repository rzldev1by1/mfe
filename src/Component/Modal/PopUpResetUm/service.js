import { resetPassword } from '../../../apiService';

export const closeModalPopupReset = async ({ state, setState }) => {
  let i = 0;
  if (i == 0) {
    i = 1;
    let element = await document.getElementById('progressBar');
    if (element) {
      let width = 1;
      let id = setInterval(frame, 130);
      function frame() {
        if (width >= 120) {
          clearInterval(id);
          i = 0;
          const newState = { ...state };
          newState.popUpReset = false;
          setState(newState);
        } else {
          width++;
          element.style.width = width + "%";
        }
      }
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
