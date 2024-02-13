'use client';
import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import Link from 'next/link';
import { resetPassword, checkVerificationToken } from '@/redux/action/auth';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

import { useParams } from 'next/navigation';
import Loader from '@/components/layouts/Loader';

export default function SignIn() {
    const dispatch = useDispatch();
    const { verificationToken } = useParams();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const [values, setValues] = useState({
        password: '',
        confirm_password: ''
    });
    const router = useRouter();

    const [errors, setErrors] = useState({});
    const [apiHit, setApiHit] = useState(false);
    const [validPage, setValidPage] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(values, { abortEarly: false });
            var updatedData = values;
            updatedData.verification_token = verificationToken;
            var apiResponse = await dispatch(resetPassword(updatedData));
            if (apiResponse.success) {
                setValues({
                    password: '',
                    confirm_password: ''
                });
                router.push(`/sign-in`);
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

    useEffect(() => {
        dispatch(checkVerificationToken(verificationToken)).then(res => {
            if (res.success) {
                setValidPage(true);
            } else {
                setValidPage(false);
            }
            setApiHit(true);

        }).catch(err => {
            setValidPage(false);

        })
    }, [verificationToken])
    return validPage ? (
        <div className="container mx-auto gap-3 px-5">
            <div className="text-center pt-10 pb-9 text-2xl md:text-5xl mx-auto font-bold">
                <h1>Reset Password</h1>
            </div>
            {/* form */}
            <div className="max-w-md mx-auto space-y-6 text-center">
                <form className="grid grid-cols-1 gap" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="flex justify-between items-center text-md sm:text-lg font-medium">New Password</span>
                    </label>
                    <div className="relative flex items-center">

                        <input
                            type={passwordVisibility ? "text" : "password"}
                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-md sm:text-lg font-medium h-11 px-4 py-3 mt-1"
                            value={values.password}
                            onPaste={(e) => e.preventDefault()}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                        <span className="material-symbols-outlined cursor-pointer absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                            {!passwordVisibility ?
                                <EyeIcon className='w-6 h-6' onClick={() => setPasswordVisibility(true)} /> :
                                <EyeSlashIcon className='w-6 h-6' onClick={() => setPasswordVisibility(false)} />
                            }
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-left mt-1">{errors.password}</p>}
                    <label className="block mt-6">
                        <span className="flex justify-between items-center text-md sm:text-lg font-medium ">Confirm Password
                        </span>
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type={confirmPasswordVisibility ? "text" : "password"}
                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-md sm:text-lg font-medium h-11 px-4 py-3 mt-1"
                            value={values.confirm_password}
                            onPaste={(e) => e.preventDefault()}
                            onChange={(e) => setValues({ ...values, confirm_password: e.target.value })}
                        />
                        <span className="material-symbols-outlined cursor-pointer absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                            {!confirmPasswordVisibility ?
                                <EyeIcon className='w-6 h-6' onClick={() => setConfirmPasswordVisibility(true)} /> :
                                <EyeSlashIcon className='w-6 h-6' onClick={() => setConfirmPasswordVisibility(false)} />
                            }
                        </span>
                    </div>
                    {errors.confirm_password && <p className="text-red-500 text-left mt-1">{errors.confirm_password}</p>}
                    <button className="nc-Button relative h-auto inline-flex items-center mt-6 justify-center rounded-lg text-md sm:text-lg  px-4 py-3 sm:px-6 ttnc-ButtonPrimary text-black bg-[rgb(249,188,96)]" type="submit">
                        <h3 className="text-md sm:text-lg  font-medium "> Continue</h3>
                    </button>
                </form>
                <h3 className="text-md sm:text-lg  font-medium ">New user? <Link href="sign-up" className='text-blue-700'>Create an account</Link></h3>
            </div>
        </div>
    ) : apiHit && !validPage ? (
        <div className="container mx-auto gap-3 px-5">
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center">
                <h1 className='text-5xl font-bold'>4<span className='text-[rgb(249,188,96)]'>0</span>4</h1>
            </div>
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center">
                <h3 className="text-md sm:text-lg  font-medium pb-5 rounded-full border-b border-[rgb(249,188,96)] px-2 pt-3"> Sorry, the link you have used to reset your password has already been used or has expired. If you need to reset your password again, please request a new reset link.</h3>
                <h3 className="text-md sm:text-lg  font-medium ">New user? <Link href="sign-up" className='text-blue-700'>Create an account</Link></h3>
                <h3 className="text-md sm:text-lg font-medium ">Already have an account? <Link href="sign-in" className='text-blue-700'>Sign In</Link></h3>

                <h3 className="text-md sm:text-lg font-medium ">Go Back to Home <Link href="/" className='text-blue-700'>Home</Link></h3>
            </div>

        </div>
    ) : (
        <Loader />
    )
}
