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
      console.log(data, ">>>>>> data register");
      dispatch(setRegisterSuccess(true));
    } catch (error) {
      console.log(error);
      // const { response } = error;
      // const data = response.data;
      dispatch(setRegisterError(error.message));
    } finally {
      dispatch(setRegisterLoading(false));
    }
  };
};
