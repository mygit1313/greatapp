'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";
import { SHOW_SUCCESS_NOTIFICATION_FOR_AUTH_USER, SHOW_ERROR_NOTIFICATION_FOR_AUTH_USER, HIDE_NOTIFICATION_FOR_AUTH_USER } from '@/redux/action/types'

setAuthToken(Cookies.get("loggedIn"));

export const successResponse = (responseData) => async (dispatch) => {
  const { success } = responseData;

  if (success) {
    dispatch({
      type: SHOW_SUCCESS_NOTIFICATION_FOR_AUTH_USER,
      payload: responseData
    })
  } else {
    dispatch({
      type: SHOW_ERROR_NOTIFICATION_FOR_AUTH_USER,
      payload: responseData
    })
  }
  setTimeout(() => {
    dispatch({
      type: HIDE_NOTIFICATION_FOR_AUTH_USER
    });
  }, 5000)
}
export const handleCatchFunction = (err) => async (dispatch) => {
  const errors = err.response.data;
  if (!errors.errors) {
    dispatch({
      type: SHOW_ERROR_NOTIFICATION_FOR_AUTH_USER,
      payload: {
        success: true,
        message: errors.message
      }
    })
    setTimeout(() => {
      dispatch({
        type: HIDE_NOTIFICATION_FOR_AUTH_USER
      });
    }, 5000)
  }
  return errors;
}
export const passwordSettings = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/frontend/passwordSettings`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
};
export const updateMyProfileInfo = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/frontend/updateMyProfileInfo`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
}