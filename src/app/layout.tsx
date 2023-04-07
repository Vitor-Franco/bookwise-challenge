import '../styles/globals.css'

import { ReactNode } from 'react'
import { Nunito_Sans as NunitoSans } from 'next/font/google'
import Provider from '../providers/Provider'

const nunito = NunitoSans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
