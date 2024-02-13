"use client"
import React, { useState, useEffect } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadUser } from '@/redux/action/auth'
import { useRouter } from "next/navigation";
import Alert from "@/components/Alerts/Index"
import Loader from "@/components/layouts/Loader";
import { USER_ROLE } from '@/contants';
import { usePathname } from 'next/navigation';

export default function FrontendTemplate(props) {
    const { childrenData } = props;
    const dispatch = useDispatch();
    const { push } = useRouter();
    const pathname = usePathname();
    const urlArray = (pathname.split("/"));
    const { isAuthenticated } = useSelector(state => state.auth);
    const [apiHit, setApiHit] = useState(false)

    useEffect(() => {
        dispatch(loadUser()).then(res => {
            const { success, data } = res;
            if (urlArray.includes("feedback") || urlArray.includes("invoice-preview")) {
                setApiHit(true);
            } else {
                if (success || isAuthenticated) {
                    if (data == USER_ROLE.admin) {
                        push('/admin/dashboard');
                    } else if (data == USER_ROLE.frontend_user) {
                        push('/user/dashboard');
                    }
                }
                if (!success) {
                    setApiHit(true);
                }
            }

        });
    }, []);
    return apiHit ? (
        <>
            <Header />
            <ToastContainer />
            <Alert />
            {childrenData}
            <Footer />
        </>
    ) : (
        <Loader />
    )
}