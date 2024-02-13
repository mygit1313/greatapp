'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";
setAuthToken(Cookies.get("loggedIn"));

export const categoriesListingForFrontend = () => async (dispatch) => {
  try {
    var query = `/api/secure/frontend/categoriesListingForFrontend?timestamp=${Date.now()}`;
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    // return err.response.data;
    console.log('err', err.response.data);
    return err.response.data;
  }
};
