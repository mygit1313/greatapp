'use client'
import React, { useState } from 'react';
import AddCategory from '@/components/Categories/Add';
import EditCategory from '@/components/Categories/Edit';
import TableHeaders from '@/components/Categories/TableHeaders';
import List from '@/components/Categories/List';

export default function UserProfile() {
    const [openDrawer, toggleDrawer] = useState(false)
    const [data, setData] = useState();
    const [callEditDrawer, setCallEditDrawer] = useState(false);
    const [callSubcategoryDrawer, setSubcategoryDrawer] = useState(false);
    const [dataChanges, setDataChanges] = useState(false);
    const updateApiCalled = () => {
        toggleDrawer(false);
        setCallEditDrawer(false);
        setDataChanges(!dataChanges)
    }
    return (
        <>
            <AddCategory updateApiCalled={updateApiCalled} open={openDrawer} toggleDrawer={toggleDrawer} />
            {data?.name && <EditCategory updateApiCalled={updateApiCalled} open={callEditDrawer} toggleDrawer={setCallEditDrawer} data={data} />}
            {data?.id && <TableHeaders updateApiCalled={updateApiCalled} open={callSubcategoryDrawer} toggleDrawer={setSubcategoryDrawer} data={data} />}

            <div className="grid grid-cols-1 p-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="lg:px-3 py-4 flex items-center flex-col sm:flex-row">
                    <div className="font-bold text-xl mb-2 w-full">Categories</div>
                    <div className="lg:px-3 w-full md:text-right">
                        <button onClick={() => toggleDrawer(!openDrawer)} className="bg-black hover:bg-black text-white py-1 px-2 rounded w-full md:w-max">
                            <h3 className="text-base font-medium "> Add New</h3>
                        </button>
                    </div>
                </div>

                <List
                    setData={setData}
                    setCallEditDrawer={setCallEditDrawer}
                    setSubcategoryDrawer={setSubcategoryDrawer}
                    callSubcategoryDrawer={callSubcategoryDrawer}
                    dataChanges={dataChanges}
                />
            </div>
        </>
    )
}