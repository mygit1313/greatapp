'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { passwordSettings } from '@/redux/action/admin/users';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

export default function ChangePassword() {
    const [previousPasswordVisibility, setPreviousPasswordVisibility] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
    const validationSchemaForPasswords = Yup.object().shape({
        current_password: Yup.string().required('Please enter current password.'),
        password: Yup.string().required('New Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-\/]).{8,10}$/,
            'Password must contain at least 8 to 10 characters including at least one lowercase letter, one uppercase letter, one number, and one special character'
        ),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const [passwordValues, setPasswordValues] = useState({
        current_password: '',
        password: '',
        confirm_password: '',
    });
    const [errors, setErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});
    const dispatch = useDispatch();
    const handleSubmitForPassword = async (e) => {

        e.preventDefault();
        setPasswordErrors({});

        try {
            await validationSchemaForPasswords.validate(passwordValues, { abortEarly: false });
            // If validation succeeds, you can proceed with form submission or other actions
            var apiResponse = await dispatch(passwordSettings(passwordValues));

            const { success, message, errors } = apiResponse;

            if (success) {
                console.log('record updated')
            }
            if (!success && errors && errors.length > 0) {
                const formErrorsFromServer = {};
                errors.forEach((error) => {
                    formErrorsFromServer[error.path] = error.message;
                });
                setPasswordErrors(formErrorsFromServer);
            }
        } catch (validationErrors) {
            const formErrors = {};
            validationErrors.inner.forEach((error) => {
                formErrors[error.path] = error.message;
            });
            setPasswordErrors(formErrors);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:max-w-5xl m-auto lg:p-3 gap-2 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <form className="grid grid-cols-1 gap lg:border lg:border-gray-200" onSubmit={handleSubmitForPassword}>
                    <div className="flex-1 overflow-y-auto py-6 px-2 sm:px-6">
                        <div className="flow-root">
                            <label className="block">
                                <span className="flex justify-between items-center text-lg font-medium">Current Password</span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={previousPasswordVisibility ? "text" : "password"}
                                    className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-2 sm:px-4 py-3 mt-1"
                                    onPaste={(e) => e.preventDefault()}
                                    onChange={(e) => setPasswordValues({ ...passwordValues, current_password: e.target.value })}
                                />
                                <span className="material-symbols-outlined cursor-pointer absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                    {!previousPasswordVisibility ?
                                        <EyeIcon className='w-6 h-6' onClick={() => setPreviousPasswordVisibility(true)} /> :
                                        <EyeSlashIcon className='w-6 h-6' onClick={() => setPreviousPasswordVisibility(false)} />
                                    }
                                </span>
                            </div>
                            {passwordErrors.current_password && <p className="text-red-500 text-left mt-1">{passwordErrors.current_password}</p>}
                            <label className="block mt-6">
                                <span className="flex justify-between items-center text-lg font-medium">New Password</span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={passwordVisibility ? "text" : "password"}
                                    className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-2 sm:px-4 py-3 mt-1"
                                    onPaste={(e) => e.preventDefault()}
                                    onChange={(e) => setPasswordValues({ ...passwordValues, password: e.target.value })}
                                />
                                <span className="material-symbols-outlined cursor-pointer absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                    {!passwordVisibility ?
                                        <EyeIcon className='w-6 h-6' onClick={() => setPasswordVisibility(true)} /> :
                                        <EyeSlashIcon className='w-6 h-6' onClick={() => setPasswordVisibility(false)} />
                                    }
                                </span>
                            </div>
                            {passwordErrors.password && <p className="text-red-500 text-left mt-1">{passwordErrors.password}</p>}

                            <label className="block mt-6">
                                <span className="flex justify-between items-center text-lg font-medium">Confirm Password</span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={confirmPasswordVisibility ? "text" : "password"}
                                    className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"
                                    onPaste={(e) => e.preventDefault()}
                                    onChange={(e) => setPasswordValues({ ...passwordValues, confirm_password: e.target.value })}

                                />
                                <span className="material-symbols-outlined cursor-pointer absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                    {!confirmPasswordVisibility ?
                                        <EyeIcon className='w-6 h-6' onClick={() => setConfirmPasswordVisibility(true)} /> :
                                        <EyeSlashIcon className='w-6 h-6' onClick={() => setConfirmPasswordVisibility(false)} />
                                    }
                                </span>
                            </div>
                            {passwordErrors.confirm_password && <p className="text-red-500 text-left mt-1">{passwordErrors.confirm_password}</p>}

                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="flex items-center justify-center rounded-md border border-transparent text-black bg-[rgb(249,188,96)] px-6 py-3 text-base font-medium shadow-sm hover:bg-black hover:text-white w-full"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}