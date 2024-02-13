"use client";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { logout, loadUser } from '@/redux/action/auth'
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { getRenewOrUpgradeStatus } from '@/redux/action/frontend/payments';
import { usePathname } from 'next/navigation';
import { useSelector } from "react-redux"

export default function AuthHeader() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { user } = useSelector(state => state.auth);

    const path = usePathname();
    const [open, setOpen] = useState(false)
    const [planText, setPlanText] = useState("Upgrade")
    const navigation = {
        pages: [
            { name: 'Home', href: '/' },
            { name: 'Recent Updates', href: '/user/recent-updates' },
        ],
    }

    const SignInDashboardButtons = () => {
        return (
            <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                <div className="flow-root">
                    <Link href="#" className="-m-2 block p-2  text-gray-900">
                        Hi, {user?.first_name}
                    </Link>
                </div>
                <div className="flow-root">
                    <Link href="/user/my-account" className="-m-2 block p-2  text-gray-900">
                        My Account
                    </Link>
                </div>
                <div className="flow-root" onClick={() => logoutUser()}>
                    <Link href="#" className="-m-2 block p-2  text-gray-900">
                        Logout
                    </Link>
                </div>
            </div>
        )
    }
    const SignInDashboardButtonsMobile = () => {
        return (
            <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="#" className="text-base text-white hover:text-[rgb(249,188,96)]">
                        Hi, {user?.first_name}
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="/user/my-account" className="text-base text-white hover:text-[rgb(249,188,96)]">
                        My Account
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="#" className="text-base text-white hover:text-[rgb(249,188,96)]" onClick={() => logoutUser()}>
                        Logout
                    </Link>
                </div>

            </div>
        )
    }

    const logoutUser = async () => {
        const apiResponse = await dispatch(logout());
        //console.log(apiResponse)
        if (apiResponse) {
            push('/sign-in')
        }
    }

    useEffect(() => {
        dispatch(loadUser());
        dispatch(getRenewOrUpgradeStatus()).then(res => {
            if (res.success) {
                setPlanText(res.message)
            }
        })
        setOpen(false)
    }, [path])
    return (
        <div className="bg-white font-[Poppins]">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 2xl:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="space-y-6 mt-2 py-6 px-4">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link href={page.href} className="-m-2 block p-2  text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                    
                                    <div className="flow-root">
                                        <Link href="/user/subscription" className="-m-2 block p-2  text-gray-900">
                                            {planText}
                                        </Link>
                                    </div>
                                </div>
                                <SignInDashboardButtons />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-black">
                <nav aria-label="Top" className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-4 py-6">
                    <div>
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="rounded-md border border-[rgb(249,188,96)] p-2 text-[rgb(249,188,96)] 2xl:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            
                            <Popover.Group className="hidden lg:ml-8 2xl:block lg:self-stretch">
                                <div className="flex h-full space-x-8">

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-base text-white hover:text-[rgb(249,188,96)]"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                    
                                    <Link
                                        href={"/user/subscription"}
                                        className="flex items-center text-base text-white hover:text-[rgb(249,188,96)]"
                                    >
                                        {planText}
                                    </Link>
                                </div>
                            </Popover.Group>

                            <SignInDashboardButtonsMobile />
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}