import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup';
import { updateHeaderMenusOfCategory } from '@/redux/action/admin/categories';
import { useDispatch } from 'react-redux';
import MaxLimit from '@/components/MaxLimit/Index';
import { getStockFields } from '@/redux/action/admin/stocks';

export default function TableHeaders(props) {
    const { data, updateApiCalled, toggleDrawer, open } = props;
    const dispatch = useDispatch();
    const [headerMenus, setHeaderMenus] = useState([{ title: '', stock_key: '', guiding_text: '' }]);
    const [apiHit, setApiHit] = useState(false);
    const [tableData, setTableData] = useState([]);
    const handleAddField = () => {
        setHeaderMenus([...headerMenus, { title: '', stock_key: '', guiding_text: '' }]);
    };

    const handleRemoveField = (index) => {
        const updatedData = [...headerMenus];
        updatedData.splice(index, 1);
        setHeaderMenus(updatedData);
    };
    const [errors, setErrors] = useState({});
    useEffect(() => {
        setHeaderMenus(data.table_menus != "" ? JSON.parse(data.table_menus) : [{ title: '', stock_key: '', guiding_text: '' }]);
        dispatch(getStockFields()).then(res => {
            if (res.success) {
                setTableData(res.data);
                setApiHit(true);
            }
        }).catch(err => console.log(err))
    }, [data])
    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrors({});

        try {
            // If validation succeeds, you can proceed with form submission or other actions
            var updatedValues = {
                table_menus: headerMenus,
                id: props?.data?.id,
            }
            var apiResponse = await dispatch(updateHeaderMenusOfCategory(updatedValues));
            console.log('apiResponse', apiResponse);

            const { success, message, errors } = apiResponse;

            if (success) {
                console.log('record updated');
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
            console.log('validationErrors', validationErrors)
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
                                        {apiHit &&
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
                                                        {headerMenus.map((menu, index) => (
                                                            <div key={index} className="grid grid-cols-1 gap-6 mb-4">
                                                                <div>
                                                                    <label className="block">
                                                                        <span className="flex justify-between items-center text-lg font-medium">Title of Column {index + 1}<MaxLimit limit={25} /></span>
                                                                    </label>
                                                                    <div className='flex gap-2 items-center'>

                                                                        <input
                                                                            type="text"
                                                                            placeholder="Title"
                                                                            value={menu.title}
                                                                            //required
                                                                            onChange={(e) => {
                                                                                if (e.target.value.length <= 25) {
                                                                                    const updatedContent = [...headerMenus];
                                                                                    updatedContent[index].title = e.target.value;
                                                                                    setHeaderMenus(updatedContent);
                                                                                }

                                                                            }}
                                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"

                                                                        />
                                                                        {/* {index == 0 ?
                                                                        <div className='block'>
                                                                            <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-lg text-lg px-4 py-2 sm:px-6 ttnc-ButtonPrimary text-black bg-[rgb(249,188,96)]" onClick={() => handleAddField('blogPosts')}>
                                                                                <h3 className="text-lg font-medium ">+</h3>
                                                                            </button>

                                                                        </div> :
                                                                        <div className='block'>
                                                                            <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-lg text-lg px-4 py-2 sm:px-6 ttnc-ButtonPrimary text-black bg-[rgb(249,188,96)]" onClick={() => handleRemoveField('blogPosts', index)}>
                                                                                <h3 className="text-lg font-medium ">-</h3>
                                                                            </button>
                                                                        </div>
                                                                    } */}
                                                                    </div>
                                                                    <label className="block mt-3">
                                                                        <span className="flex justify-between items-center text-lg font-medium">Stock Option</span>
                                                                    </label>
                                                                    <div className='flex gap-2 items-center'>
                                                                        <select
                                                                            type="text"
                                                                            placeholder="Select Stock Option"
                                                                            value={menu.stock_key}
                                                                            onChange={(e) => {
                                                                                const updatedContent = [...headerMenus];
                                                                                updatedContent[index].stock_key = e.target.value;
                                                                                setHeaderMenus(updatedContent);
                                                                            }}
                                                                            //required
                                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"

                                                                        >
                                                                            <option value={""}>Select</option>
                                                                            {tableData.map((opt, i) => (
                                                                                <option value={opt.property_internal_name} key={i}>{opt.name}</option>
                                                                            ))}
                                                                            <option value={"tag"}>Rating</option>
                                                                            <option value={"stock_category"}>Stock Category</option>
                                                                            <option value={"returns"}>Returns</option>
                                                                        </select>
                                                                    </div>
                                                                    <label className="block mt-3">
                                                                        <span className="flex justify-between items-center text-lg font-medium">Guiding Text<MaxLimit limit={200} /></span>
                                                                    </label>
                                                                    <div className='flex gap-2 items-center'>

                                                                        <input
                                                                            type="text"
                                                                            placeholder="Text"
                                                                            value={menu.guiding_text}
                                                                            onChange={(e) => {
                                                                                if (e.target.value.length <= 200) {
                                                                                    const updatedContent = [...headerMenus];
                                                                                    updatedContent[index].guiding_text = e.target.value;
                                                                                    setHeaderMenus(updatedContent);
                                                                                }

                                                                            }}
                                                                            required
                                                                            className="block w-full border focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg text-base font-medium px-4 py-3 mt-1"

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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
                                        }

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
