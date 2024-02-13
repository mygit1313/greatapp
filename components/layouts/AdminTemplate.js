"use client"
import React, {useEffect, useState} from 'react'
import AdminSidebar from '@/components/layouts/AdminSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '@/redux/action/auth'
import { useRouter } from "next/navigation";
import Loader from "@/components/layouts/Loader";
import { ToastContainer } from "react-toastify";

export default function AdminLayout(props) {
    const { childrenData } = props;
    const { globalSuccessAlert, globalErrorAlert } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { isAuthenticated } = useSelector(state => state.auth);
    const [apiHit, setApiHit] = useState(false)
    useEffect(() => {
        dispatch(loadUser()).then(res => {
            const { success } = res;
            if (success) {
                setApiHit(true);
            } else {
                if (!isAuthenticated) {
                    push('/sign-in');
                }
            }
        }).catch(err => {
            if (!isAuthenticated) {
                push('/sign-in');
            }
        });

    }, []);
    return apiHit ? (
        <div>
            <AdminSidebar />
            <div className="p-8 sm:ml-64">
                <div className="md:border-2 md:p-9 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 ">
                <ToastContainer />
                    {childrenData}
                </div>
            </div>
        </div>
    ): (
        <Loader />
    )
}