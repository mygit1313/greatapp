"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getInvestorMemosForFrontend } from "@/redux/action/frontend/investorMemo";
import { useDispatch } from 'react-redux'
import Loader from '@/components/layouts/Loader'
import Table from '@/components/Table';
import Pagination from '@/components/pagination/Index';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";

export default function StockDetail() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { user } = useSelector(state => state.auth);

    const [error, setError] = useState(false);
    const [apiHit, setApiHit] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showPagination, setShowPagination] = useState([]);

    useEffect(() => {
        getRecords(currentPage);
    }, [currentPage, limit])
    const getRecords = (pageNumber) => {
        dispatch(getInvestorMemosForFrontend(pageNumber, limit)).then(res => {
            if (res.success) {
                setTableData(res.data.result);
                setTotalRecords(res.data.totalRecords);
                setTotalPages(Math.ceil(res.data.totalRecords / limit));
                setShowPagination(res.data.showPagination);
                setApiHit(true);
            } else {
                setError(true);
            }
        }).catch(err => console.log(err))
    }
    if (user && user.role == 2 && user.show_investor_memo == 0) {
        router.push('/user/dashboard');
    }
    return (
        <main className="container mx-auto gap-3 px-5 md:px-20 md:pt-12 mt-5">
            {apiHit ?
                <>
                    <div className='grid grid-cols-1 m-auto'>
                        {tableData.length > 0 &&
                            <Table updates={tableData} title={"Investor Memo"} />}
                        <Pagination
                            totalRecords={totalRecords}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            limit={limit}
                            showPagination={showPagination}
                            tableDataLength={tableData.length}
                        />
                    </div>
                </> :
                error ?
                    <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center h-[31vh] ">
                        <h3 className="text-lg  font-medium pb-5 rounded-full border-b border-[rgb(249,188,96)] px-2 pt-3">Sorry, the link you have used is broken or invalid.</h3>
                        <h3 className="text-lg font-medium ">Go Back to <Link href="/" className='text-blue-700'>Home</Link></h3>
                    </div>
                    :
                    <Loader />
            }
        </main>
    )
}
