import Header from '@/components/main/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Home | Bookwise',
  description: '',
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen p-5 bg-gray-800">
      <Header />
      <div className="w-full mx-24 mt-10">{children}</div>
    </div>
  )
}
