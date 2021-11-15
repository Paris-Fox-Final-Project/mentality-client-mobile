import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../apis/index";
import {
  SET_TOPICS_DATA,
  SET_TOPICS_ERROR,
  SET_TOPICS_LOADING,
} from "../topicTypes";

export const setTopicsData = (payload) => {
  return {
    type: SET_TOPICS_DATA,
    payload,
  };
};

export const setTopicsError = (payload) => {
  return {
    type: SET_TOPICS_ERROR,
    payload,
  };
};

export const setTopicsLoading = (payload) => {
  return {
    type: SET_TOPICS_LOADING,
    payload,
  };
};

export const getAllTopics = () => {
  return async (dispatch) => {
    dispatch(setTopicsLoading(true));
    try {
      const token = await AsyncStorage.getItem("access_token");
      const { data } = await apiClient({
        method: "GET",
        url: "/topics",
        headers: {
          access_token: token,
        },
      });
      const { topics } = data;
      dispatch(setTopicsData(topics));
    } catch (error) {
      const { response } = error;
      const { message } = response.data;
      dispatch(setTopicsError(message));
    } finally {
      dispatch(setTopicsLoading(false));
    }
  };
};
