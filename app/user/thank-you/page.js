"use client"
import Link from "next/link"
export default function ThankYou() {
    return (
        <main className="container mx-auto gap-3 px-5 md:px-20 md:pt-12 mt-5">
            <div className="container mx-auto gap-3 px-3 md:px-20 pt-12 m-auto flex flex-col">
                <div className="text-center md:text-5xl mx-auto text-5xl font-bold pb-9 text-[rgb(249,188,96)]">
                    <h1>Your payment was successfully processed.</h1>
                </div>
                <div className="text-base font-medium pb-5 px-2 pt-3">
                    <p>You now have access to our premium content. Enjoy your subscription!</p>
                    <p>Here{"'"}s what you can do next:</p>
                    <ul className="list-disc p-4 m-4">
                        <li>Explore our premium features and content.</li>
                        <li>Stay updated with the latest insights and reports.</li>
                        <li>Feel free to contact our support team if you have any questions or need assistance.</li>
                    </ul>
                    <h3 className="text-base font-medium text-center">Go Back to <Link href="/user/dashboard" className='text-blue-700'>Dashboard</Link></h3>
                </div>
            </div>
        </main>
    )
}
