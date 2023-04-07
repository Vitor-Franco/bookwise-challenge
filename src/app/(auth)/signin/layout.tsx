import { ReactNode } from 'react'

export const metadata = {
  title: 'Bookwise | Login',
  description: '',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
