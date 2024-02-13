'use client';

import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import Loader from '@/components/layouts/Loader';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/sign-in');
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Loader />
    </main>
  )
}
