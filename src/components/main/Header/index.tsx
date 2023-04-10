'use client'

import Image from 'next/image'
import React from 'react'

import Logo from 'public/images/logo.svg'
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  SignOut,
  User,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '../../utilities/Avatar'
import { usePathname, useRouter } from 'next/navigation'
import { minifyName } from '@/utils/minifyName'
import clsx from 'clsx'

const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = status === 'authenticated'
  const nameMinified = minifyName(session?.user?.name || '')

  function handleShowProfile() {}

  function handleLogin() {
    router.push('/signin')
  }

  async function handleLogout() {
    await signOut()
  }

  return (
    <header className="bg-gray-800 sticky p-6 left-5 bottom-5 top-5 rounded-lg min-w-[232px] inline-flex flex-col items-center overflow-hidden h-[calc(100dvh_-_(1.5rem_*_2))]">
      <span className="z-0 pointer-events-none absolute bg-purple-200 opacity-80 blur-[226px] -rotate-90 h-[295px] w-[295px] top-1/4 left-3/4 -translate-x-1/2"></span>

      <span className="z-0 pointer-events-none absolute bg-green-200 opacity-50 blur-[95px] -rotate-90 h-[221px] w-[221px] -left-[50%] top-0 -translate-y-1/2"></span>

      <span className="z-0 pointer-events-none absolute bg-purple-200 opacity-80 blur-[95px] -rotate-90 h-[221px] w-[221px] left-[50%] top-0 -translate-y-1/2"></span>

      <span className="z-0 pointer-events-none absolute bg-green-200 opacity-80 blur-[262px] -rotate-90 h-[221px] w-[221px] -left-[20%] -bottom-[20px]"></span>

      <div className="z-20 mt-4">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            className="cursor-pointer"
            width={128}
            priority
          />
        </Link>
      </div>

      <ul className="z-20 mt-16">
        <li>
          <Link href="/" className="min-w-[100px] block">
            <span
              className={clsx(
                'relative flex gap-3 leading-6 before:block before:absolute before:-inset-0 before:-left-5 before:rounded-full before:w-[4px] before:h-full ',
                {
                  'font-bold text-gray-100 before:bg-gradient-vertical':
                    pathname === '/',
                  'text-gray-400': pathname !== '/',
                },
              )}
            >
              <ChartLineUp size={24} /> Início
            </span>
          </Link>
        </li>
        <li>
          <Link href="/explore" className="min-w-[100px] block mt-8">
            <span
              className={clsx(
                'relative flex gap-3 leading-6 before:block before:absolute before:-inset-0 before:-left-5 before:rounded-full before:w-[4px] before:h-full ',
                {
                  'font-bold text-gray-100 before:bg-gradient-vertical':
                    pathname === '/explore',
                  'text-gray-400': pathname !== '/explore',
                },
              )}
            >
              <Binoculars size={24} /> Explorar
            </span>
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <button className="min-w-[100px] block mt-8">
              <span
                className={clsx(
                  'relative flex gap-3 leading-6 before:block before:absolute before:-inset-0 before:-left-5 before:rounded-full before:w-[4px] before:h-full ',
                  {
                    'font-bold text-gray-100 before:bg-gradient-vertical':
                      pathname === '/profile',
                    'text-gray-400': pathname !== '/profile',
                  },
                )}
              >
                <User size={24} /> Perfil
              </span>
            </button>
          </li>
        )}
      </ul>

      {isAuthenticated && session ? (
        <div className="z-20 flex items-center gap-3 mt-auto">
          <button
            onClick={handleShowProfile}
            className="flex items-center gap-3 text-sm text-gray-200"
          >
            <Avatar
              imageUrl={session.user.avatar_url}
              username={session?.user?.name}
              size={32}
            />
            {nameMinified}
          </button>
          <button type="button" onClick={handleLogout}>
            <SignOut size={20} className="text-red-400" />
          </button>
        </div>
      ) : (
        <button type="button" className="z-20 mt-auto" onClick={handleLogin}>
          <span className="flex items-center gap-3 font-bold leading-6 text-gray-200">
            Fazer login <SignIn className="text-green-100" size={20} />
          </span>
        </button>
      )}
    </header>
  )
}

export default Header
