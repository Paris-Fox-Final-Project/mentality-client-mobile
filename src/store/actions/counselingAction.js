import {
  SET_CREATED_SCHEDULE_COUNSELING,
  SET_ERROR_CREATE_SCHEDULE_COUNSELING,
  SET_LOADING_CREATE_SCHEDULE_COUNSELING,
  SET_SUCCESS_CREATE_SCHEDULE_COUNSELING,
} from "../counselingTypes";
import apiClient from "../../apis/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSuccessCreateScheduleCounseling = (payload) => {
  return {
    type: SET_SUCCESS_CREATE_SCHEDULE_COUNSELING,
    payload,
  };
};

export const setErrorCreateScheduleCounseling = (payload) => {
  return {
    type: SET_ERROR_CREATE_SCHEDULE_COUNSELING,
    payload,
  };
};

export const setLoadingCreateScheduleCounseling = (payload) => {
  return {
    type: SET_LOADING_CREATE_SCHEDULE_COUNSELING,
    payload,
  };
};

export const setCreateCounseling = (payload) => {
  return {
    type: SET_CREATED_SCHEDULE_COUNSELING,
    payload,
  };
};

export const createNewCounselingHandler = (payload) => {
  return async (dispatch, getState) => {
    dispatch(setErrorCreateScheduleCounseling(""));
    dispatch(setLoadingCreateScheduleCounseling(true));
    try {
      const token = await AsyncStorage.getItem("access_token");
      const { data } = await apiClient({
        url: "/counseling",
        method: "POST",
        headers: {
          access_token: token,
        },
        data: payload,
      });
      const { counseling } = data;
      dispatch(setCreateCounseling(counseling));
      dispatch(setSuccessCreateScheduleCounseling(true));
    } catch (error) {
      const { response } = error;
      const { data } = response;
      const { message } = data;
      dispatch(setErrorCreateScheduleCounseling(message));
    } finally {
      dispatch(setLoadingCreateScheduleCounseling(false));
    }
  };
};
