'use client'

import Image from 'next/image'
import googleIcon from 'public/images/icons/google.svg'
import githubIcon from 'public/images/icons/github.svg'
import logoIcon from 'public/images/logo.svg'
import landingImage from 'public/images/bg-bookwise.png'
import { RocketLaunch } from '@phosphor-icons/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'authenticated') {
    router.push('/')
    return
  }

  async function handleLogin(loginPlatform = '') {
    const isVisiting = loginPlatform === ''

    if (isVisiting) {
      // localStorage.setItem('@bookwise:user', 'visiting')
      router.push('/')
      return
    }

    // localStorage.removeItem('@bookwise:user')
    await signIn(loginPlatform, { callbackUrl: '/' })
  }

  return (
    <div className="flex h-screen p-5 bg-gray-800">
      <div className="relative">
        <div
          style={{
            background:
              'linear-gradient(40deg, #50B2C050, rgba(42, 40, 121, 0.5), rgba(42, 40, 121, 0.8)), rgba(0, 0, 0, 0.6)',
          }}
          className="absolute rounded-lg w-full h-full backdrop-filter backdrop-blur-[2px]"
        ></div>

        <Image
          src={landingImage}
          alt="Landing image"
          width={600}
          className="overflow-hidden max-w-[600px] object-cover h-full rounded-lg"
        />

        <Image
          src={logoIcon}
          alt="Logo bookwise"
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-[330px]">
          <h1 className="text-2xl font-bold text-gray-100">Boas vindas!</h1>
          <p className="text-gray-200 text-md">
            Faça seu login ou acesse como visitante
          </p>
          <div className="flex flex-col mt-10">
            <button
              onClick={() => handleLogin('google')}
              className="flex items-center gap-5 px-6 py-5 bg-gray-600 rounded-lg hover:bg-gray-500"
            >
              <Image src={googleIcon} alt="Google icon" />

              <span className="text-lg font-bold leading-relaxed text-gray-200">
                Entrar com Google
              </span>
            </button>
            <button
              className="flex items-center gap-5 px-6 py-5 mt-4 bg-gray-600 rounded-lg hover:bg-gray-500"
              onClick={() => handleLogin('github')}
            >
              <Image src={githubIcon} alt="GitHub icon" />

              <span className="text-lg font-bold leading-relaxed text-gray-200">
                Entrar com GitHub
              </span>
            </button>
            <button
              className="flex items-center gap-5 px-6 py-5 mt-4 bg-gray-600 rounded-lg hover:bg-gray-500"
              onClick={() => handleLogin()}
            >
              <RocketLaunch size={32} className="text-purple-100" />

              <span className="text-lg font-bold leading-relaxed text-gray-200">
                Acessar como visitante
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
