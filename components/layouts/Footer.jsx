import Image from 'next/image'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
export default function Footer() {
    const moreLinks = [
        {
            title: 'Privacy Policy',
            link: '#'
        },
        {
            title: 'Terms & Conditions',
            link: '#'
        },
        {
            title: 'FAQs',
            link: '#'
        },
    ];
    const reachUs = [
        'Email: support@gmail.in',
        'All Rights Reserved',

    ];
    return (
        <footer className="bg-black mt-20 footer">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-4 py-6">
                <div className="lg:flex lg:justify-between gap-2">
                    <div className='xl:max-w-screen-md'>
                        <ul className="text-white mt-4 gap-2 ">
                            <li>
                                <Image
                                    className="h-12"
                                    src="/color-logo.png"
                                    alt="Company Logo"
                                    width={200}
                                    height={200}
                                />
                            </li>
                            <div className='hidden lg:flex lg:flex-col-3 gap-8 pt-6 divide-x-2 '>

                                <li className='pt-4 pb-3 '>
                                    <Link href="/feedback/?contact=feedback">
                                        Give Us a Feedback
                                    </Link></li>

                                <li className='pt-4 lg:px-10'>
                                    <Link href="/feedback/?contact=testimonial">
                                        Leave us a testimonial
                                    </Link></li>

                                <li className='pt-4 lg:px-10'>
                                    <Link href="/feedback/?contact=ticket">
                                        Raise a Ticket
                                    </Link></li>

                            </div>

                        </ul>
                    </div>
                    <div>
                        <ul className="text-white mt-4">
                            <li className="text-[rgb(249,188,96)] ">
                                <h1 className="text-3xl text-[rgb(249,188,96)]">More Links</h1>
                            </li>
                            {moreLinks.length > 0 && moreLinks.map((link, index) => (
                                <li className="mt-4" key={index}>
                                    <a href={link.link}>
                                        <p className="text-base">{link.title}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <ul className="text-white mt-4">
                            <li className="text-[rgb(249,188,96)] ">
                                <h1 className="text-3xl text-[rgb(249,188,96)] ">Reach Us</h1>
                            </li>
                            {reachUs.length > 0 && reachUs.map((link, index) => (
                                <li className="mt-4" key={index}>
                                    <p className="text-base">{link}</p>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>

                <div className=' lg:hidden xl:hidden gap-8 pt-6  text-white list-none'>
                    <hr />
                    <li className='pt-4 '><Link href="/feedback/?contact=feedback">
                        Give Us a Feedback
                    </Link></li>

                    <li className='pt-4'><Link href="/feedback/?contact=testimonial">
                        Leave us a testimonial
                    </Link></li>

                    <li className='pt-4'><Link href="/feedback/?contact=ticket">
                        Raise a Ticket
                    </Link></li>

                </div>

            </div>
        </footer>
    )
}