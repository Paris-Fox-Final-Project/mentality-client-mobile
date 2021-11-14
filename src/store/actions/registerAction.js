import {
  SET_REGISTER_ERROR,
  SET_REGISTER_LOADING,
  SET_REGISTER_SUCCESS,
} from "../registerTypes";
import apiClient from "../../apis/index";
export const setRegisterSuccess = (payload) => {
  return {
    type: SET_REGISTER_SUCCESS,
    payload: payload,
  };
};

export const setRegisterError = (payload) => {
  return {
    type: SET_REGISTER_ERROR,
    payload: payload,
  };
};

export const setRegisterLoading = (payload) => {
  return {
    type: SET_REGISTER_LOADING,
    payload: payload,
  };
};

export const registerHandler = (payload) => {
  return async (dispatch) => {
    dispatch(setRegisterLoading(true));
    try {
      const { data } = await apiClient({
        url: "/register",
        method: "POST",
        data: payload,
      });
      dispatch(setRegisterSuccess(true));
    } catch (error) {
      const { response } = error;
      let message = "";
      if (response) {
        let { data } = response;
        if (Array.isArray(data.message)) {
          message = data.message[0];
        } else {
          message = data.message;
        }
      }
      dispatch(setRegisterError(message));
    } finally {
      dispatch(setRegisterLoading(false));
    }
  };
};
