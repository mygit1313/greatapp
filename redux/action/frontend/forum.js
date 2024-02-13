'use client'

import axios from "axios";
import { successResponse, handleCatchFunction } from "@/redux/action/frontend/users";

export const addQuestion = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/secure/frontend/forum/addQuestion`, formData, config);
    dispatch(successResponse(res.data));

    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    dispatch(handleCatchFunction(err));

    return err.response.data;
  }
};

export const questionsListingForFrontend = (page, limit, search) => async (dispatch) => {
  try {
      var query = `/api/secure/frontend/forum/questionsListingForFrontend?page=${page}&limit=${limit}`;
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