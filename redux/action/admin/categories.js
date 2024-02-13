'use client'

import axios from "axios";
import setAuthToken from '@/redux/setAuthToken'
import Cookies from "js-cookie";
import { successResponse, handleCatchFunction } from "@/redux/action/admin/users";
setAuthToken(Cookies.get("loggedIn"));
export const addCategory = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post(`/api/secure/admin/category/addCategory`, formData, config);
        dispatch(successResponse(res.data));

        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        dispatch(handleCatchFunction(err));

        return err.response.data;
    }
}
export const categoriesListing = (page, limit, search) => async (dispatch) => {
    try {
        var query = `/api/secure/admin/category/getCategories?page=${page}&limit=${limit}`;
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

export const bulkAction = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(`/api/secure/admin/category/bulkAction`, formData, config);
        dispatch(successResponse(res.data));
        return res.data;
    } catch (err) {
        dispatch(handleCatchFunction(err));
        return err.response.data;
    }
};

export const updateCategory = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(`/api/secure/admin/category/updateCategory`, formData, config);
        dispatch(successResponse(res.data));

        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        dispatch(handleCatchFunction(err));

        return err.response.data;
    }
}

export const updateHeaderMenusOfCategory = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(`/api/secure/admin/category/updateHeaderMenusOfCategory`, formData, config);
        dispatch(successResponse(res.data));

        return res.data;
    } catch (err) {
        // return err.response.data;
        console.log('err', err.response.data);
        dispatch(handleCatchFunction(err));

        return err.response.data;
    }
}