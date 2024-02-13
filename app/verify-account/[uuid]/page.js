'use client';
import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import Link from 'next/link';
import { verifyAccount } from '@/redux/action/auth';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Loader from '@/components/layouts/Loader';

export default function SignIn() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { uuid } = useParams();

    const [apiHit, setApiHit] = useState(false);
    const [validPage, setValidPage] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(verifyAccount({ uuid: uuid })).then(res => {
            if (res.success) {
                setValidPage(true);
                setMessage(res.message)

            } else if (res?.code == 404) {
                setValidPage(false);
            } else {
                setValidPage(false)
                setMessage(res.message)
            }
            setApiHit(true);

        }).catch(err => {
            setValidPage(false);

        })
    }, [uuid])
    return validPage ? (
        <div className="container mx-auto gap-3 px-5">
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center">
                <h1 className='text-5xl font-bold'><span className='text-[rgb(249,188,96)]'>Awesome</span></h1>
            </div>
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center">

                <h3 className="text-lg  font-medium pb-5 rounded-full border-b border-[rgb(249,188,96)] px-2 pt-3">{message != "" ? message : "Sorry, the link you have used is broken or invalid."}</h3>

                <h3 className="text-lg font-medium ">Go Back to Home <Link href="/" className='text-blue-700'>Home</Link></h3>
            </div>
        </div>
    ) : apiHit && !validPage ? (
        <div className="container mx-auto gap-3 px-5">
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center">
                {message == "" ?
                    <h1 className='text-5xl font-bold'>4<span className='text-[rgb(249,188,96)]'>0</span>4</h1> : <h1 className='text-5xl font-bold'><span className='text-[rgb(249,188,96)]'>Great!</span></h1>}
            </div>
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex justify-center flex-col text-center">
                <h3 className="text-lg  font-medium pb-5 rounded-full border-b border-[rgb(249,188,96)] px-2 pt-3">{message != "" ? message : "Sorry, the link you have used is broken or invalid."}</h3>

                <h3 className="text-lg font-medium ">Go Back to <Link href="/" className='text-blue-700'>Home</Link></h3>
            </div>

        </div>
    ) : (
        <Loader />
    )
}
