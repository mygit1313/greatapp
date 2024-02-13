'use client'
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination/Index';
import { questionsListing, bulkAction } from "@/redux/action/admin/forum"
import { useDispatch } from 'react-redux';
import Loader from '@/components/layouts/Loader';
import Link from 'next/link'
export default function CategoriesList(props) {
    const { setCallEditDrawer, setData, dataChanges, callSubcategoryDrawer, setSubcategoryDrawer } = props;
    const [apiHit, setApiHit] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showPagination, setShowPagination] = useState([]);
    const [search, setSearch] = useState('');
    const [visibilityFilter, setVisibilityFilter] = useState(2);
    const [actionType, setActionType] = useState("");
    const [selectedRowsId, setSelectedRowsId] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        getRecords(currentPage);
    }, [currentPage, limit])
    useEffect(() => {
        getRecords(1);
    }, [dataChanges])
    useEffect(() => {
        setTableData([]);
        getRecords(1);
    }, [visibilityFilter, search])
    const getRecords = (pageNumber) => {
        dispatch(questionsListing(pageNumber, limit, search, visibilityFilter)).then(res => {
            if (res.success) {
                setTableData(res.data.result);
                setTotalRecords(res.data.totalRecords);
                setTotalPages(Math.ceil(res.data.totalRecords / limit));
                setShowPagination(res.data.showPagination);
                setApiHit(true);
            }
        }).catch(err => console.log(err))
    }
    const selectRows = (id) => {
        if (selectedRowsId.includes(id)) {
            // Remove the value from the array
            const newArray = selectedRowsId.filter(item => item !== id);
            setSelectedRowsId(newArray);
        } else {
            const newArray = [...selectedRowsId, id];
            setSelectedRowsId(newArray);
        }
    }
    const applyBulkAction = async () => {
        if (actionType != "") {
            console.log('function called')
            const formData = {
                actionType: actionType,
                selectedUsers: selectedRowsId
            }
            const bulkActionResult = await dispatch(bulkAction(formData));
            if (bulkActionResult.success) {
                setCurrentPage(1);
                getRecords(1);
                setSelectedRowsId([]);
                setActionType("");
            }
        }
    }

    const columns = [
        {
            title: "User Name",
            key: "first_name"
        },
        {
            title: "Question",
            key: "question"
        },
        {
            title: "Reply",
            key: "reply"
        },
        {
            title: "Visibility Status",
            key: "visibility"
        },
        {
            title: "Actions",
            key: ""
        }
    ]
    return apiHit && (
        <>
            <div className="flex pt-2 flex-col gap-8 md:flex-row pb-4 items-center justify-between dark:bg-gray-900">
                <form onSubmit={e => {
                    e.preventDefault();
                    setVisibilityFilter(e.target.filter.value)

                }}>
                    <div className='flex gap-1 flex-col md:flex-row w-full md:w-auto'>

                        <select className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                            name="filter"
                        // onChange={(e) => 
                        //     setVisibilityFilter(e.target.value)
                        // }
                        // value={visibilityFilter}
                        >
                            <option value={""}>Filter By Visibility Status</option>
                            <option value={2}>All Status</option>
                            <option value={1}>ON</option>
                            <option value={0}>OFF</option>
                        </select>
                        <button className="bg-black hover:bg-black text-white py-1 px-2 rounded text-base" type='submit'>
                            Apply
                        </button>


                    </div>
                </form>

                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative  w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((col, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>
                                    {col.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {apiHit ? tableData.map((row) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={row.id}>
                                <td className="px-6 py-4">
                                    {row.first_name}
                                </td>
                                <td className="px-6 py-4">
                                    {row.question}
                                </td>
                                <td className="px-6 py-4">
                                    {row.reply}
                                </td>
                                <td className="px-6 py-4">
                                    {row.visibility == 0 &&
                                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
                                            OFF
                                        </div>}
                                    {row.visibility == 1 &&
                                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">
                                            ON
                                        </div>}

                                </td>
                                <td className="flex items-center px-6 py-4 space-x-3">
                                    <Link href="#" onClick={e => {
                                        setCallEditDrawer(true);
                                        setData(row);
                                    }
                                    } className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reply</Link>
                                </td>
                            </tr>
                        )) : (apiHit && tableData.length == 0 ?
                            <tr>
                                <td colSpan={5}>No Record Found!</td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={5}>
                                    <Loader />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalRecords={totalRecords}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                showPagination={showPagination}
                tableDataLength={tableData.length}
            />
        </>
    )
}