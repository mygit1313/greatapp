"use client"
import React, { useState, useEffect } from 'react';
import AuthHeader from '@/components/layouts/AuthHeader';
import Footer from '@/components/layouts/Footer';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadUser } from '@/redux/action/auth'
import { useRouter } from "next/navigation";
import Loader from "@/components/layouts/Loader";
import { usePathname } from 'next/navigation';
export default function AuthUserTemplate(props) {
    const { childrenData } = props;
    const dispatch = useDispatch();
    const { push } = useRouter();
    const pathname = usePathname();
    const urlArray = (pathname.split("/"));
    const { isAuthenticated, user } = useSelector(state => state.auth);

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
    useEffect(() => {
        document.addEventListener('contextmenu', event => event.preventDefault());
        console.log('Inspect opened.');
    }, [])
    
    const disableCopyPaste = (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V')) {
            e.preventDefault();
            e.stopPropagation();
            // You can optionally show a message to inform users about the disabled action
            console.log('Copying and pasting is disabled on this website.');
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', disableCopyPaste);
        return () => {
            document.removeEventListener('keydown', disableCopyPaste);
        };
    }, [pathname]);
    return apiHit && isAuthenticated ? (
        <>
            {((user.activate_email == 1 || user.activate_phone == 1) && !urlArray.includes("dashboard") && !urlArray.includes("payment-failed") && !urlArray.includes("forum") && !urlArray.includes("subscription") && !urlArray.includes("my-account") && !urlArray.includes("thank-you") && !urlArray.includes("payment-confirmation")) ?
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n    /* CSS to position the text element */\n    .watermark-text-container {\n      position: absolute;\n      left: 200px; /* Initial X-coordinate */\n      top: 350px;  /* Initial Y-coordinate */\n    }\n  "
                    }}
                /> : <style
                    dangerouslySetInnerHTML={{
                        __html: "\n    .watermark-text-container {\n    display: none;\n}\n  "
                    }}
                />}


            {/* {!urlArray.includes("preview-report") && */}
                <AuthHeader />
            {/* } */}
            <ToastContainer />
            <div className="watermark-text-container z-50" id="textElement">{user.enable_watermark == 1 && user.watermark_text_content}</div>

            {childrenData}
            {/* {!urlArray.includes("preview-report") && */}
                <Footer />
            {/* } */}
        </>
    ) : (
        <Loader />
    )
}