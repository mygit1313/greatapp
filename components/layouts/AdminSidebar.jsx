"use client"
import React, { useEffect, useState } from 'react'
import {
    HomeIcon,
    TableCellsIcon,
    UserGroupIcon,
    CubeIcon,
    DeviceTabletIcon,
    CogIcon,
    CurrencyYenIcon,
    PresentationChartBarIcon,
    Bars4Icon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { logout } from '@/redux/action/auth'
import { useDispatch } from 'react-redux';
import { useRouter, usePathname } from "next/navigation";

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { push } = useRouter();
    const pathname = usePathname();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const logoutUser = async () => {
        const apiResponse = await dispatch(logout());
        //console.log(apiResponse)
        if (apiResponse) {
            push('/sign-in')
        }
    }
    const toggleSubmenu = (id) => {
        var element = document.getElementById(id);
        element.classList.toggle("hidden");
    }
    useEffect(() => {
        setIsOpen(false)
    },[pathname])
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-black border-b p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <Bars4Icon className='w-6 h-6 text-white' onClick={toggleSidebar} />
                            </button>
                            <a href="/" className="flex ml-2 md:mr-24">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" /> */}
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Site Name</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button type="button" className="flex text-sm dark:focus:ring-gray-600 text-white" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        Hello, Admin
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/admin/dashboard" className={`flex items-center p-2 ${(pathname.split('/admin/dashboard')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <HomeIcon className='w-6 h-6' />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className={`flex items-center p-2 ${(pathname.split('/admin/users')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <UserGroupIcon className='w-6 h-6' />
                                <span className="ml-3">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/pages/user-dashboard" className={`flex items-center p-2 ${(pathname.split('/admin/pages/user-dashboard')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <TableCellsIcon className='w-6 h-6' />
                                <span className="ml-3">Pages</span>
                            </Link>
                        </li>
                        

                        <li>
                            {/* /admin/categories */}
                            <Link href="/admin/categories" className={`flex items-center p-2 ${(pathname.split('/admin/categories')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <CubeIcon className='w-6 h-6' />
                                <span className="ml-3">Categories</span>
                            </Link>

                        </li>
                        
                        <li>
                            <Link href="/admin/updates" className={`flex items-center p-2 ${(pathname.split('/admin/updates')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <PresentationChartBarIcon className='w-6 h-6' />
                                <span className="ml-3">Updates</span>
                            </Link>
                        </li>
                        
                        <li>
                            <Link href="/admin/transactions" className={`flex items-center p-2 ${(pathname.split('/admin/transactions')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <CurrencyYenIcon className='w-6 h-6' />
                                <span className="ml-3">Transactions</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/settings" className={`flex items-center p-2 ${(pathname.split('/admin/settings')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <CogIcon className='w-6 h-6' />
                                <span className="ml-3">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/forum" className={`flex items-center p-2 ${(pathname.split('/admin/forum')).length > 1 ? 'bg-black text-white' : 'text-black'}  rounded-lg hover:bg-black hover:text-white`}>
                                <DeviceTabletIcon className='w-6 h-6' />
                                <span className="ml-3">Forum</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" onClick={() => logoutUser()} className={`flex items-center p-2 rounded-lg hover:bg-black hover:text-white`}>
                                <ArrowLeftOnRectangleIcon className='w-6 h-6' />
                                <span className="ml-3">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}