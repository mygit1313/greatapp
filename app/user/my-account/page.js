"use client"

import { useState, useEffect } from 'react'
import Loader from '@/components/layouts/Loader'
import MyLoginHistory from '@/components/users/MyLoginHistory'
import MyTransactionHistory from '@/components/users/MyTransactionHistory'
import MyProfile from '@/components/users/MyProfile'
import Tabs from '@/components/Tabs/Index'
export default function MyAccount() {
    const tabs = [{
        name: 'Profile',
        id: 'profile',
        content: <MyProfile />
    },
    {
        name: 'Login History',
        id: 'login_history',
        content: <MyLoginHistory />

    },
    {
        name: 'Transaction History',
        id: 'transaction_history',
        content: <MyTransactionHistory />

    },
    // {
    //     name: 'Communication Preference',
    //     id: 'alerts',
    //     content: <ComingSoon />

    // }
    ];
    const [apiHit, setApiHit] = useState(false);
    useEffect(() => {
        setApiHit(true);
    }, [])
    return (
        <main className="container mx-auto gap-3 px-5 md:px-20 md:pt-12 mt-5">
            {apiHit ? <>
                <Tabs tabs={tabs} defaultSelectedTab="profile" tabTitle="My Account"/>

            </> : <Loader />}
        </main>
    )
}
