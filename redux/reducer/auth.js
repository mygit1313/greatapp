'use client'

import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, HIDE_NOTIFICATION, SHOW_ERROR_NOTIFICATION } from "../action/types";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
  //isSubAdminAuthenticated: false,
  loading: true,
  user: null,
  client: null,
  registerSuccess: {
    success: false,
    message: ''
  },
  globalErrorAlert: {
    success: false,
    message: ''
  }
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      toast.success(payload.message);
      return {
        registerSuccess: payload,
        globalErrorAlert: {}
      };
    case HIDE_NOTIFICATION:
      return {
        registerSuccess: {},
        globalErrorAlert:{}
      }
    case SHOW_ERROR_NOTIFICATION:
      toast.error(payload.message);
      return{
        registerSuccess: {},
        globalErrorAlert:payload
      }
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
