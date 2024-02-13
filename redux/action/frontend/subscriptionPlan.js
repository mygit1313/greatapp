'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";

setAuthToken(Cookies.get("loggedIn"));

export const getSubscriptionPlanDetail = (slug) => async (dispatch) => {
    try {
        var query = `/api/secure/frontend/getSubscriptionPlanDetail/?plan=${slug}`;
        const res = await axios.get(query);
        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        return err.response.data;
    }
};

export const getSubscriptionPlans = () => async (dispatch) => {
    try {
        var query = `/api/secure/frontend/getSubscriptionPlans`;
        const res = await axios.get(query);
        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        return err.response.data;
    }
};
