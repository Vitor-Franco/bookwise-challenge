import Header from '@/components/main/Header'
import '../../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Bookwise | Home',
  description: '',
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex w-full min-h-screen p-5 bg-gray-800">
          <Header />
          <div className="w-full mx-24 mt-10">{children}</div>
        </div>
      </body>
    </html>
  )
}
