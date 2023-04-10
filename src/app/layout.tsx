'use client'

import '../lib/dayjs'
import '../styles/globals.css'
import { ReactNode } from 'react'
import { Nunito_Sans as NunitoSans } from 'next/font/google'
import Provider from '../providers/Provider'
import { ScrollToTop } from '@/components/utilities/ScrollToTop'

const nunitoSans = NunitoSans({
  weight: ['400', '600', '700'],
  subsets: ['latin-ext', 'latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={nunitoSans.className}>
      <body>
        <Provider>{children}</Provider>
        <ScrollToTop />
      </body>
    </html>
  )
}
