import AsyncStorage from "@react-native-async-storage/async-storage";
import apiServer from "../../apis";
import {
  SET_HISTORIES_DATA,
  SET_HISTORIES_DATA_HISTORY_BY_ID,
  SET_HISTORIES_ERROR,
  SET_HISTORIES_LOADING,
} from "../reducers/historyTypes";

const setHistoriesData = (payload) => ({
  type: SET_HISTORIES_DATA,
  payload,
});

const setHistoriesLoading = (payload) => ({
  type: SET_HISTORIES_LOADING,
  payload,
});

const setHistoriesError = (payload) => ({
  type: SET_HISTORIES_ERROR,
  payload,
});

const setHistoryById = (payload) => ({
  type: SET_HISTORIES_DATA_HISTORY_BY_ID,
  payload,
});

export const getHistoriesCounselingUserLoggedIn = () => {
  return async (dispatch, getState) => {
    dispatch(setHistoriesLoading(true));
    try {
      const token = await AsyncStorage.getItem("access_token");
      const user = await AsyncStorage.getItem("user");
      const { id } = JSON.parse(user);
      const { data } = await apiServer({
        method: "GET",
        url: `/counseling/user/${id}`,
        headers: {
          access_token: token,
        },
      });
      dispatch(setHistoriesData(data));
    } catch (error) {
      const { response } = error;
      const { data } = response;
      const { message } = data;
      dispatch(setHistoriesError(message));
    } finally {
      dispatch(setHistoriesLoading(false));
    }
  };
};
