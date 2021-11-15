import {
    SET_COUNSELOR_COUNSELING_DETAIL_DATA,
    SET_COUNSELOR_COUNSELING_DETAIL_ERROR,
    SET_COUNSELOR_COUNSELING_DETAIL_LOADING
} from "../counselorCounselingDetailTypes"
import apiClient from "../../apis/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCounselorCounselingDetailData = (payload) => {
    return {
        type: SET_COUNSELOR_COUNSELING_DETAIL_DATA,
        payload: payload
    }
}

export const setCounselorCounselingDetaiLoading = (payload) => {
    return {
        type: SET_COUNSELOR_COUNSELING_DETAIL_LOADING,
        payload: payload
    }
}

export const setCounselorCounselingDetaiError = (payload) => {
    return {
        type: SET_COUNSELOR_COUNSELING_DETAIL_ERROR,
        payload: payload
    }
}

export const counselorCounselingDetailHandler=(payload)=>{
    return async (dispatch) => {
        dispatch(setCounselorCounselingDetaiLoading(true))
        try {
            // console.log(payload, 'payload di store')
            const access_token = await AsyncStorage.getItem("access_token")
            const counselingDetail = await apiClient({
                url: `/counseling/${payload}`,
                method: "GET",
                headers: {access_token: access_token}
            })
            // console.log(counselingDetail.data, 'balikan buat detail page')
            dispatch(setCounselorCounselingDetailData(counselingDetail.data))
        } catch (err) {
            // console.log(err.response.data, 'err store get detail')
            dispatch(setCounselorCounselingDetaiError(err.response.data))
        }
        finally{
            dispatch(setCounselorCounselingDetaiLoading(false))
        }
    }
}