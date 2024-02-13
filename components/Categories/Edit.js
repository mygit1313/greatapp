import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup';
import { updateCategory } from '@/redux/action/admin/categories';
import { useDispatch } from 'react-redux';
import MaxLimit from '@/components/MaxLimit/Index';

export default function EditUserDrawer(props) {
    const { data, updateApiCalled, toggleDrawer, open } = props;
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Category Name is required'),
        //tag: Yup.string().required('Tag is required'),
        visibility: Yup.number()
            .min(0, 'Please select valid visibility state')
            .max(1, 'Please select valid visibility state')
            .integer('Please select valid visibility state')
            .required('Visibility status is required'),
    });
    const [values, setValues] = useState(data);

    const [errors, setErrors] = useState({});
    useEffect(() => {
        setValues(data);
    }, [data])
    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({});

        try {
            await validationSchema.validate(values, { abortEarly: false });
            // If validation succeeds, you can proceed with form submission or other actions
            var updatedValues = {
                ...values,
                id: props?.data?.id,
            }
            var apiResponse = await dispatch(updateCategory(updatedValues));

            const { success, message, errors } = apiResponse;

            if (success) {
                toggleDrawer(false);
                setErrors([]);
                updateApiCalled();
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
            validationErrors.inner.forEach((error) => {
                formErrors[error.path] = error.message;
            });
            setErrors(formErrors);
        }
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[999]" onClose={() => {
                toggleDrawer(false);
                setErrors([]);
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <form className="grid grid-cols-1 gap" onSubmit={handleSubmit}>

                                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Edit</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => toggleDrawer(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <label className="block">
                                                            <span className="flex justify-between items-center text-lg font-medium">Category Name<MaxLimit limit={25} /></span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                                            placeholder="Stock"
                                                            value={values.name}
                                                            onChange={(e) => {
                                                                if (e.target.value.length <= 25) {
                                                                    setValues({ ...values, name: e.target.value })
                                                                }
                                                            }}
                                                        />
                                                        {errors.name && <p className="text-red-500 text-left mt-1">{errors.name}</p>}
                                                        <label className="block mt-6">
                                                            <span className="flex justify-between items-center text-lg font-medium">Category Tag<MaxLimit limit={15} /></span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                                            placeholder="Hold"
                                                            value={values.tag}
                                                            onChange={(e) => {
                                                                if (e.target.value.length <= 15) {
                                                                    setValues({ ...values, tag: e.target.value })
                                                                }
                                                            }}
                                                        />
                                                        {errors.tag && <p className="text-red-500 text-left mt-1">{errors.tag}</p>}
                                                        <label className="block mt-6">
                                                            <span className="flex justify-between items-center text-lg font-medium">Visibility</span>
                                                        </label>
                                                        <select
                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                                            value={values.visibility}
                                                            onChange={(e) => setValues({ ...values, visibility: e.target.value })}
                                                        >
                                                            <option value={0}>OFF</option>
                                                            <option value={1}>ON</option>
                                                        </select>
                                                        {errors.visibility && <p className="text-red-500 text-left mt-1">{errors.visibility}</p>}
                                                        <label className="block">
                                                            <span className="flex justify-between items-center text-lg font-medium">Choose Tag Background Color</span>
                                                        </label>
                                                        <input
                                                            type="color"
                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                                            value={values.tag_color}
                                                            onChange={(e) => setValues({ ...values, tag_color: e.target.value })}
                                                        />
                                                        {errors.tag_color && <p className="text-red-500 text-left mt-1">{errors.tag_color}</p>}
                                                        <label className="block">
                                                            <span className="flex justify-between items-center text-lg font-medium">Choose Tag Text Color</span>
                                                        </label>
                                                        <input
                                                            type="color"
                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium h-11 px-4 py-3 mt-1"
                                                            value={values.tag_text_color}
                                                            onChange={(e) => setValues({ ...values, tag_text_color: e.target.value })}
                                                        />
                                                        {errors.tag_text_color && <p className="text-red-500 text-left mt-1">{errors.tag_text_color}</p>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
