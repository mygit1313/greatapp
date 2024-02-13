'use client';
import { useState, useEffect } from 'react'
import { InboxArrowDownIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup';
import Link from 'next/link';
import { sendOtpForLogin, signInWithOtp } from '@/redux/action/auth';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { browserName } from 'react-device-detect';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '@/contants';

export default function SignIn() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        otp: Yup.string().required('OTP is required'),
    });
    const validationSchemaForEmail = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });
    const [values, setValues] = useState({
        email: '',
        otp: '',
    });
    const [showOtpField, setShowOtpField] = useState(false);
    const router = useRouter();

    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (showOtpField) {
                await validationSchema.validate(values, { abortEarly: false });
                var updatedData = values;
                updatedData.browser = Cookies.get('browser');
                updatedData.ip_address = Cookies.get('ip');
                var apiResponse = await dispatch(signInWithOtp(updatedData));
                if (apiResponse.success) {
                    //setShowOtpField(true);
                    const { data } = apiResponse;
                    if (data.role == USER_ROLE.admin) {
                        router.push(`/admin/dashboard`);
                    }
                    if (data.role == USER_ROLE.frontend_user) {
                        router.push(`/user/dashboard`);
                    }
                }

            } else {
                resendOtp();
            }

            //router.push(`/user/dashboard`);

        } catch (validationErrors) {
            // If validation fails, update the errors state with the error messages
            const formErrors = {};
            if (validationErrors && validationErrors.inner && validationErrors.inner.length > 0) {
                validationErrors.inner.forEach((error) => {
                    formErrors[error.path] = error.message;
                });
            }
            setErrors(formErrors);
        }
    };
    const resendOtp = async () => {
        try {
            await validationSchemaForEmail.validate(values, { abortEarly: false });
            var updatedData = values;
            var apiResponse = await dispatch(sendOtpForLogin(updatedData));
            const { success, errors } = apiResponse;
            if (success) {
                setShowOtpField(true);
                setValues({ ...values, otp: '' })
                setErrors([]);
            }
            if (!success && errors && errors.length > 0) {
                const formErrorsFromServer = {};
                errors.forEach((error) => {
                    formErrorsFromServer[error.path] = error.message;
                });
                setErrors(formErrorsFromServer);
            }
        } catch (validationErrors) {
            // If validation fails, update the errors state with the error messages
            const formErrors = {};
            if (validationErrors && validationErrors.inner && validationErrors.inner.length > 0) {
                validationErrors.inner.forEach((error) => {
                    formErrors[error.path] = error.message;
                });
            }
            setErrors(formErrors);
        }
    }
    useEffect(() => {
        if (!isAuthenticated && !Cookies.get('ip')) {
            Cookies.set("browser", browserName);
            axios.get('https://api64.ipify.org').then(ipData => {
                if (ipData.status == 200 || ipData.status == 204) {
                    Cookies.set("ip", ipData.data);
                }
            });
        }

    }, [])
    return (
        <div className="container mx-auto gap-3 px-5">
            <div className="text-center pt-10 pb-9 text-2xl md:text-5xl mx-auto font-bold">
                <h1>Sign In With OTP</h1>
            </div>
            <div className="max-w-md mx-auto space-y-6">
                <Link href="/sign-in" className="flex w-full border rounded-lg bg-[rgb(249,188,96)] px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]">
                    <InboxArrowDownIcon className="fa-brands fa-facebook flex mt-2 w-4 h-4" />
                    <h3 className="flex-grow text-center text-md sm:text-lg font-medium">
                        Continue with Password
                    </h3>
                </Link>
            </div>
            <div className="relative text-center max-w-md mx-auto my-3">
                <span className="relative z-10 inline-block px-4 text-md sm:text-lg font-medium  bg-white">OR</span>
                <div className="absolute left-0 w-full top-1/2 border" />
            </div>
            {/* form */}
            <div className="max-w-md mx-auto space-y-6 text-center">
                <form className="grid grid-cols-1 gap" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="flex justify-between items-center text-md sm:text-lg font-medium">Email</span>
                    </label>
                    <input
                        type="email"
                        className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium  h-11 px-4 py-3 mt-1"
                        placeholder="example@example.com"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-left mt-1">{errors.email}</p>}
                    {showOtpField &&
                        <>
                            <label className="block mt-6">
                                <span className="flex justify-between items-center text-md sm:text-lg font-medium ">OTP
                                    <Link href="forgot-password" className='text-blue-700 text-md sm:text-lg font-medium  underline'>Forgot password?</Link>
                                </span>
                            </label>
                            <input
                                type="text"
                                className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-md sm:text-lg font-medium  h-11 px-4 py-3 mt-1"
                                value={values.otp}
                                onChange={(e) => setValues({ ...values, otp: e.target.value })}
                            />
                            {errors.otp && <p className="text-red-500 text-left mt-1">{errors.otp}</p>}
                            <label className="block mt-6">
                                <span className="flex justify-between items-center text-md sm:text-lg font-medium ">
                                    <Link href="#" onClick={() => resendOtp()} className='text-blue-700 text-md sm:text-lg font-medium  underline'>Resend OTP</Link>
                                </span>
                            </label>
                        </>
                    }
                    <button className="nc-Button relative h-auto inline-flex items-center mt-6 justify-center rounded-lg text-md sm:text-lg  px-4 py-3 sm:px-6 ttnc-ButtonPrimary text-black bg-[rgb(249,188,96)]" type="submit">
                        <h3 className="text-md sm:text-lg  font-medium "> Continue</h3>
                    </button>
                </form>

                <h3 className="text-md sm:text-lg  font-medium ">New user? <Link href="sign-up" className='text-blue-700'>Create an account</Link></h3>
            </div>
        </div>
    )
}
