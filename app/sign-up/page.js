'use client';
import { useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { signUp, getStates, getCities } from '@/redux/action/auth';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import { COUNTRY_CODE } from '@/redux/action/types';

export default function SignUp() {
    const router = useRouter();
    const dispatch = useDispatch();
    const phoneRegExp = /^(\+91[\s-]?)?[0]?(91)?[6789]\d{9}$/;
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Primary Phone is required'),
        password: Yup.string().required('Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-\/]).{8,10}$/,
            'Password must contain at least 8 to 10 characters including at least one lowercase letter, one uppercase letter, one number, and one special character'
        ),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const validationSchemaForLocation = Yup.object().shape({
        phone: Yup.string()
        .matches(phoneRegExp, 'Invalid phone number.')
        .required('Primary Phone is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        pin_code: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Invalid PIN code (should be of 6 digits)'),
        country: Yup.string().required('Country is required'),
        country_code: Yup.string().required('Country Code is required')
    });
    const benefits = [
        'Performance Track Record',
        'Research Reports',
        'Result Updates',
        'Email Alerts',
        'A tool to find suitable service',
        'Upgrade Option',
        '& its absolutely FREE',
    ];
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        country: 'India',
        country_code: 'in',
        state: '',
        city: '',
        pin_code: ''
    });
    const handleOnChange = (value, data) => {
        setValues({ ...values, country: data.name, phone: value, country_code: data.countryCode })
    }
    const [errors, setErrors] = useState({});
    const [statesData, setStatesData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [capsLockWarning, setCapsLockWarning] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const handleKeyDown = (event) => {
        if (event.getModifierState("CapsLock")) {
            setCapsLockWarning(true);
        } else {
            setCapsLockWarning(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({});

        try {
            await validationSchema.validate(values, { abortEarly: false });
            // If validation succeeds, you can proceed with form submission or other actions
            if (values.country_code == COUNTRY_CODE) {
                await validationSchemaForLocation.validate(values, { abortEarly: false });
            }
            var updatedValues = values;
            updatedValues.state = (values.state.split("-"))[0]
            var apiResponse = await dispatch(signUp(updatedValues));

            const { success, message, errors } = apiResponse;

            if (success) {
                router.push('/sign-in');
            }
            if (!success && errors && errors.length > 0) {
                const formErrorsFromServer = {};
                errors.forEach((error) => {
                    formErrorsFromServer[error.path] = error.message;
                });
                setErrors(formErrorsFromServer);
            }
        } catch (validationErrors) {
            const formErrors = {};
            validationErrors.inner.forEach((error) => {
                formErrors[error.path] = error.message;
            });
            setErrors(formErrors);
        }
    };
    useEffect(() => {
        dispatch(getStates()).then(res => {
            if (res.success) {
                setStatesData(res.data)
            }
        })
    }, [])

    const onChangeState = (data) => {
        var dataBreak = (data.split("-"));
        if (dataBreak.length > 1) {
            setValues({ ...values, state: data })
            dispatch(getCities(dataBreak[1])).then(res => {
                if (res.success) {
                    setCitiesData(res.data)

                }
            })
        }


    }
    return (
        <div className="container mx-auto gap-10 px-5 pt-20 pb-9 flex flex-col lg:flex-row justify-between">
            <div className='flex-[2] w-full'>
                <div className="text-center text-2xl md:text-5xl mx-auto font-bold pb-9">
                    <h1 className='text-black dark:text-[rgb(249,188,96)]'>Sign Up</h1>
                </div>
                <div className="max-w-3xl mx-auto space-y-6 text-center">
                    <form className="grid grid-cols-1 gap"
                        onKeyDown={handleKeyDown}
                        onSubmit={handleSubmit}>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <div className='w-full'>
                                <label className="block">
                                    <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                    placeholder="John"
                                    value={values.first_name}
                                    onChange={(e) => setValues({ ...values, first_name: e.target.value })}
                                />
                                {errors.first_name && <p className="text-red-500 text-left mt-1">{errors.first_name}</p>}
                            </div>
                            <div className='w-full'>
                                <label className="block">
                                    <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                    placeholder="Doe"
                                    value={values.last_name}
                                    onChange={(e) => setValues({ ...values, last_name: e.target.value })}
                                />
                                {errors.last_name && <p className="text-red-500 text-left mt-1">{errors.last_name}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <div className='w-full'>
                                <label className="block mt-6">
                                    <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                    placeholder="example@example.com"
                                    value={values.email}
                                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                                />
                                {errors.email && <p className="text-red-500 text-left mt-1">{errors.email}</p>}
                            </div>
                            <div className='w-full'>
                                <label className="block mt-6">
                                    <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Primary Phone</span>
                                </label>
                                <style dangerouslySetInnerHTML={{ __html: "\n.react-tel-input .form-control {\n    width: 100%;\n    height: 2.75rem;\n    font-weight: 500;\n    font-size: 1rem;\n    line-height: 1.5rem;\n    margin-top: 0.25rem;\n}\nul.country-list{\n\ttext-align:left\n}\n" }} />
                                <PhoneInput
                                    country={'in'}
                                    value={values.phone}
                                    //onChange={(e) => setValues({ ...values, phone: e })}
                                    onChange={handleOnChange}
                                />
                                <div className='flex justify-end text-green-600 bg-green-200 gap-1 w-40 float-right rounded-b-lg pr-3 mr-3'>
                                    <ShieldCheckIcon className='w-6 h-6' />

                                    <h1>we don{"'"}t spam</h1>
                                </div>
                                {errors.phone && <p className="text-red-500 text-left mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <div className='w-full'>
                                <label className="block mt-6">
                                    <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Password</span>
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
                                            <EyeIcon className='w-6 h-6 text-black dark:text-white' onClick={() => setPasswordVisibility(true)} /> :
                                            <EyeSlashIcon className='w-6 h-6 text-black dark:text-white' onClick={() => setPasswordVisibility(false)} />
                                        }
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-500 text-left mt-1">{errors.password}</p>}
                            </div>
                            <div className='w-full'>
                                <label className="block mt-6">
                                    <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Confirm Password</span>
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
                                            <EyeIcon className='w-6 h-6 text-black dark:text-white' onClick={() => setConfirmPasswordVisibility(true)} /> :
                                            <EyeSlashIcon className='w-6 h-6 text-black dark:text-white' onClick={() => setConfirmPasswordVisibility(false)} />
                                        }
                                    </span>
                                </div>
                                {errors.confirm_password && <p className="text-red-500 text-left mt-1">{errors.confirm_password}</p>}

                            </div>
                        </div>
                        <div className='flex'>
                            {capsLockWarning && <p className="text-green-500 text-left mt-1 font-semibold">Caps Lock is on!</p>}
                        </div>
                        {values.country_code == COUNTRY_CODE &&
                            <div className='flex flex-col lg:flex-row gap-3'>
                                <div className='w-full'>
                                    <label className="block mt-6">
                                        <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">State</span>
                                    </label>

                                    <select
                                        className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"
                                        value={values.state}
                                        onChange={(e) => {
                                            onChangeState(e.target.value)
                                        }}
                                    >
                                        <option value={""}> Select</option>
                                        {statesData.map((data, index) => (
                                            <option value={data.name + "-" + data.id} key={index}> {data.name}</option>
                                        ))}

                                    </select>
                                    {errors.state && <p className="text-red-500 text-left mt-1">{errors.state}</p>}

                                </div>
                                <div className='w-full'>
                                    <label className="block mt-6">
                                        <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">City</span>
                                    </label>

                                    <select
                                        className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"
                                        value={values.city}
                                        onChange={(e) => setValues({ ...values, city: e.target.value })}
                                    >
                                        <option value={""}> Select</option>
                                        {citiesData.map((data, index) => (
                                            <option value={data.city} key={index}> {data.city}</option>
                                        ))}
                                    </select>
                                    {errors.city && <p className="text-red-500 text-left mt-1">{errors.city}</p>}

                                </div>
                                <div className='w-full'>
                                    <label className="block mt-6">
                                        <span className="flex justify-between items-center text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Pincode</span>
                                    </label>

                                    <input
                                        className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"
                                        value={values.pin_code}
                                        onChange={(e) => setValues({ ...values, pin_code: e.target.value })}
                                    />
                                    {errors.pin_code && <p className="text-red-500 text-left mt-1">{errors.pin_code}</p>}

                                </div>
                            </div>
                        }
                        <button className="nc-Button relative h-auto inline-flex items-center mt-6 justify-center rounded-lg text-md sm:text-lg px-4 py-3 sm:px-6 ttnc-ButtonPrimary text-black bg-[rgb(249,188,96)]" type="submit">
                            <h3 className="text-md sm:text-lg font-medium "> Continue</h3>
                        </button>
                    </form>
                    <h3 className="text-md sm:text-lg font-medium text-black dark:text-[rgb(249,188,96)]">Already have an account? <Link href="sign-in" className='text-blue-700 dark:text-white'>Sign In</Link></h3>
                </div>
            </div>
            <div className='flex-[1] w-full mb-5 lg:mb-0'>
                <div className=' border border-[rgb(249,188,96)] '>
                    <h2 className="mb-2 text-md sm:text-lg text-center font-semibold text-gray-900 dark:text-black bg-[rgb(249,188,96)] dark:bg-[rgb(249,188,96)] p-5">
                        7 Benefits of Signing Up
                    </h2>
                    <ul className="px-2 sm:px-5 space-y-1 text-black list-inside dark:text-gray-400">
                        {
                            benefits.map((data, index) => (
                                <li className="flex items-center text-md sm:text-lg pb-2 xl:pb-5 text-black dark:text-white" key={index}>
                                    <CheckCircleIcon className='text-[rgb(249,188,96)] w-8 h-8 mr-1' />
                                    {data}
                                </li>
                            ))
                        }
                        <li className='sm:pb-5'>
                            <div className='mt-5'>
                                <h2 className="mb-2 text-sm sm:text-lg text-center font-semibold text-gray-900 dark:text-black bg-[rgb(249,188,96)] py-5 sm:p-5">
                                    For any query please contact us at
                                    <span className='sm:hidden'><br/></span>
                                    <a href='next_tailwind_project' className='text-blue-700 dark:text-white'>&nbsp;Next Tailwind Project</a>
                                </h2>

                            </div>
                        </li>

                    </ul>
                </div>


            </div>
        </div>
    )
}
