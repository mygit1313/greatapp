'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";
import { successResponse, handleCatchFunction } from "@/redux/action/admin/users";

setAuthToken(Cookies.get("loggedIn"));

export const transactionHistory = (page, limit, search) => async (dispatch) => {
    try {
      var query = `/api/secure/admin/transactionHistory?page=${page}&limit=${limit}`;
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

  export const createOfflinePayment = (formData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`/api/secure/admin/payments/createOfflinePayment`, formData, config);
      dispatch(successResponse(res.data));
  
      return res.data;
    } catch (err) {
      // return err.response.data;
      console.log('err', err.response.data);
      dispatch(handleCatchFunction(err));
  
      return err.response.data;
    }
  }

  export const transactionListExport = () => async (dispatch) => {

    try {
      var query = `/api/secure/admin/payments/transactionListExport`;
      const res = await axios.get(query);
      return res.data;
    } catch (err) {
      // return err.response.data;
      console.log('err', err.response.data);
      return err.response.data;
    }
  };