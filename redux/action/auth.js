'use client'

import axios from "axios";
import { USER_LOADED, REGISTER_SUCCESS, HIDE_NOTIFICATION, AUTH_ERROR, SHOW_ERROR_NOTIFICATION } from "./types";
import setAuthToken from "../setAuthToken";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const signUp = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/signUp`,
      formData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000)
    //toast.success(res.data.msg, { position: "top-center" });
    return res.data;
  } catch (err) {
    // return err.response.data;
    return dispatch(handleCatchFunction(err));
  }
};

export const handleCatchFunction = (err) => async (dispatch) => {
  const errors = err.response.data;
  if (!errors.errors) {
    dispatch({
      type: SHOW_ERROR_NOTIFICATION,
      payload: {
        success: true,
        message: errors.message
      }
    });
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000)
  }
  console.log('here', errors)
  return errors;
}

export const hideNotification = () => async (dispatch) => {
  dispatch({
    type: HIDE_NOTIFICATION
  });
};

export const signInWithPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.post(
      `/api/signInWithPassword`,
      formData,
      config
    );
    // setAuthToken(Cookies.get("loggedIn"));
    // console.log(res.data);
    if (res && res.data.success) {
      Cookies.set("loggedIn", res.data.data.token);
      Cookies.set("role", res.data.data.role);

      dispatch(loadUser());
    }
    //console.log('res.data',res.data);
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};

export const sendOtpForLogin = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.post(
      `/api/sendOtpForLogin`,
      formData,
      config
    );
    if(res.data.success){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          success: true,
          message: 'Your One-Time Password (OTP) has been successfully sent. Please check your registered email for the verification code.'
        }
      });
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000)
    }
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};

export const signInWithOtp = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.post(
      `/api/signInWithOtp`,
      formData,
      config
    );
    // setAuthToken(Cookies.get("loggedIn"));
    // console.log(res.data);
    if (res && res.data.success) {
      Cookies.set("loggedIn", res.data.data.token);
      Cookies.set("role", res.data.data.role);

      dispatch(loadUser());
    }
    //console.log('res.data',res.data);
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};

export const sendOtpInForgotPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.post(
      `/api/sendOtpInForgotPassword`,
      formData,
      config
    );
    if(res.data.success){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          success: true,
          message: 'Your One-Time Password (OTP) has been successfully sent. Please check your registered email for the verification code.'
        }
      });
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000)
    }
    
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};

export const resetPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.post(
      `/api/resetPassword`,
      formData,
      config
    );
    if(res.data.success){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000)
    }
    
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};

export const checkVerificationToken = (verification_token) => async (dispatch) => {
  try {
    
    //console.log('action called');
    const res = await axios.get(
      `/api/resetPassword?check=${verification_token}`,
    );
    
    return res.data;
  } catch (err) {
    //dispatch(handleCatchFunction(err));
    return false;

  }
};

export const verifyOtpForForgotPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.post(
      `/api/verifyOtpForForgotPassword`,
      formData,
      config
    );
    
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};

export const verifyAccount = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //console.log('action called');
    const res = await axios.put(
      `/api/verifyAccount`,
      formData,
      config
    );
    
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));

  }
};
// Load User
export const loadUser = () => async (dispatch) => {
  setAuthToken(Cookies.get("loggedIn"));
  try {
    const res = await axios.get(`/api/secure/loadUser`);
    if (res.data.success) {
      Cookies.set("access", res.data.result.download_access)
      dispatch({
        type: USER_LOADED,
        payload: res.data.result
      });
      return res.data;
    } else {
      dispatch({
        type: AUTH_ERROR
      });
    }
    return res.data;

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
    return {
      success: false
    };
  }
};

// // Logout / Clear Profile
export const logout = () => async dispatch => {

  //return true;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "authorization":Cookies.get('loggedIn')
    },
  };

  try {
    const res = await axios.post(
      `/api/secure/logout`,
      {},
      config
    );
    if(res.data.success){
      Cookies.remove('loggedIn');
      Cookies.remove('role');
      Cookies.remove('access');
      return true;
    }
    //toast.success(res.data.msg, { position: "top-center" });
    
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)
    return true;
  }
};

export const getGstNumber = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/getGstNumber`);

    return res.data;
  } catch (err) {
    // return err.response.data;
    return dispatch(handleCatchFunction(err));
  }
};

export const getStates = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/getStates`);

    return res.data;
  } catch (err) {
    // return err.response.data;
    return dispatch(handleCatchFunction(err));
  }
};

export const getCities = (stateId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/getCities?id=${stateId}`);

    return res.data;
  } catch (err) {
    // return err.response.data;
    return dispatch(handleCatchFunction(err));
  }
};

export const addRequest = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/request/send`,
      formData,
      config
    );
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data
    // });
    // setTimeout(() => {
    //   dispatch(hideNotification());
    // }, 5000)
    //toast.success(res.data.msg, { position: "top-center" });
    if(res.data.success){
      toast.success(res.data.message);
    }
    return res.data;
  } catch (err) {
    // return err.response.data;
    return dispatch(handleCatchFunction(err));
  }
};