'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";
import { successResponse, handleCatchFunction } from "@/redux/action/admin/users";

setAuthToken(Cookies.get("loggedIn"));

export const getGstDetails = () => async (dispatch) => {
    try {
        var query = `/api/secure/admin/settings/gst/getGstDetails?timestamp=${Date.now()}`;
        const res = await axios.get(query);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const updateGstSettings = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(`/api/secure/admin/settings/gst/updateGstSettings`, formData, config);
        dispatch(successResponse(res.data));

        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        dispatch(handleCatchFunction(err));

        return err.response.data;
    }
}

export const getDataSecuritySettings = () => async (dispatch) => {
    try {
        var query = `/api/secure/admin/settings/dataSecurity/getDataSecuritySettings?timestamp=${Date.now()}`;
        const res = await axios.get(query);
        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        return err.response.data;
    }
};

export const updateDataSecuritySettings = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(`/api/secure/admin/settings/dataSecurity/updateDataSecuritySettings`, formData, config);
        dispatch(successResponse(res.data));

        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        dispatch(handleCatchFunction(err));

        return err.response.data;
    }
}