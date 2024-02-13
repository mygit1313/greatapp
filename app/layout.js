import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "@/redux/store/provider"
import "react-toastify/dist/ReactToastify.css";
import CombinedLayout from '@/components/layouts/CombinedLayout';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Tailwind Project',
  description: 'Next Tailwind Project'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <Providers>
        <body className={`${inter.className} bg-white dark:bg-neutral-900 font-[Poppins]`}>
          <CombinedLayout childrenData={children} />
        </body>
      </Providers>
    </html>
  )
}
