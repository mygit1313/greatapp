'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";
import { SHOW_SUCCESS_NOTIFICATION_FOR_ADMIN, SHOW_ERROR_NOTIFICATION_FOR_ADMIN, HIDE_NOTIFICATION_FOR_ADMIN } from '@/redux/action/types'
setAuthToken(Cookies.get("loggedIn"));


export const successResponse = (responseData) => async (dispatch) => {
  const { success } = responseData;

  if (success) {
    dispatch({
      type: SHOW_SUCCESS_NOTIFICATION_FOR_ADMIN,
      payload: responseData
    })
  } else {
    dispatch({
      type: SHOW_ERROR_NOTIFICATION_FOR_ADMIN,
      payload: responseData
    })
  }
  setTimeout(() => {
    dispatch({
      type: HIDE_NOTIFICATION_FOR_ADMIN
    });
  }, 5000)
}

export const handleCatchFunction = (err) => async (dispatch) => {
  const errors = err.response.data;
  if (!errors.errors) {
    dispatch({
      type: SHOW_ERROR_NOTIFICATION_FOR_ADMIN,
      payload: {
        success: true,
        message: errors.message
      }
    })
    setTimeout(() => {
      dispatch({
        type: HIDE_NOTIFICATION_FOR_ADMIN
      });
    }, 5000)
  }
  return errors;
}

export const usersList = (page, limit, search) => async (dispatch) => {

  try {
    var query = `/api/secure/admin/users?page=${page}&limit=${limit}`;
    if (search != '') {
      query += `&s=${search}`;
    }
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};
export const usersListExport = (search) => async (dispatch) => {

  try {
    var query = `/api/secure/admin/users/usersListExport?`;
    if (search != '') {
      query += `s=${search}`;
    }
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};

export const bulkAction = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/users/bulkAction`, formData, config);
    dispatch(successResponse(res.data));
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));
    return err.response.data;
  }
};

export const loginHistory = (userId, page, limit, search) => async (dispatch) => {
  try {
    var query = `/api/secure/admin/users/loginHistory?id=${userId}&page=${page}&limit=${limit}`;
    if (search != '') {
      query += `&s=${search}`;
    }
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};

export const bulkActionForLoginHistory = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/users/loginHistory/bulkAction`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
};

export const usersProfile = (userId) => async (dispatch) => {
  try {
    var query = `/api/secure/admin/users/usersProfile?id=${userId}`;
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};

export const updateUserProfileInfo = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/users/updateUserProfileInfo`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
}
export const updateUserPassword = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/users/updateUserPassword`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
}
export const shareResetPasswordLink = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/secure/admin/users/shareResetPasswordLink`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
}

export const updatePages = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/pages/userDashboard`, formData, config);
    dispatch(successResponse(res.data));
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));
    return err.response.data;
  }
};

export const getUserDashboard = (id) => async (dispatch) => {
  try {
    var query = `/api/secure/admin/pages/userDashboard?id=${id}`;
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};

export const userTransactionHistory = (userId, page, limit, search) => async (dispatch) => {
  try {
    var query = `/api/secure/admin/users/usersTransactionHistory?id=${userId}&page=${page}&limit=${limit}`;
    if (search != '') {
      query += `&s=${search}`;
    }
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};

export const changeExpiryDate = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/users/changeExpiryDate`, formData, config);
    dispatch(successResponse(res.data));
    return res.data;
  } catch (err) {
    dispatch(handleCatchFunction(err));
    return err.response.data;
  }
};

export const passwordSettings = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/secure/admin/passwordSettings`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
};