import axios from "axios";
import endpoints from '../../../helpers/endpoints';

export const closeModal = ({ state, setState }) => {
  const newState = { ...state };
  newState.popUpgradeUser = false;
  setState(newState);
};

export const saveModal = async ({ state, setState, setIsLoad }) => {
  const newState = { ...state };
  setIsLoad(true)
  try {
    await axios.post(`${endpoints.userManagementUpgradeUser}/${newState.accountInfo.web_user}`);
    newState.changeStatusUser = !newState.changeStatusUser
    setState(newState)
    setIsLoad(false)
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
