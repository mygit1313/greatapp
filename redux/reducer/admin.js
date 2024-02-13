'use client'

import { SHOW_SUCCESS_NOTIFICATION_FOR_ADMIN, SHOW_ERROR_NOTIFICATION_FOR_ADMIN, HIDE_NOTIFICATION_FOR_ADMIN } from "../action/types";
import { toast } from "react-toastify";

const initialState = {
  loading: true,
  globalSuccessAlert: {
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
    case SHOW_SUCCESS_NOTIFICATION_FOR_ADMIN:
      toast.success(payload.message);

      return {
        ...state,
        globalSuccessAlert: payload,
        globalErrorAlert: {
          success: false,
          message: ''
        }
      };
    case SHOW_ERROR_NOTIFICATION_FOR_ADMIN:
      toast.error(payload.message);

      return {
        globalSuccessAlert: {
          success: false,
          message: ''
        },
        globalErrorAlert: payload
      };
    case HIDE_NOTIFICATION_FOR_ADMIN:
      return {
        globalSuccessAlert: {},
        globalErrorAlert: {}
      }

    default:
      return state;
  }
}
