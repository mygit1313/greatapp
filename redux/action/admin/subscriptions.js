'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";

setAuthToken(Cookies.get("loggedIn"));

export const getSubscriptionPlansName = () => async (dispatch) => {
    try {
        var query = `/api/secure/admin/subscriptions/getSubscriptionPlansName`;
        const res = await axios.get(query);
        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        return err.response.data;
    }
};