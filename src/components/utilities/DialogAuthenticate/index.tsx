'use client'

import Image from 'next/image'
import googleIcon from 'public/images/icons/google.svg'
import githubIcon from 'public/images/icons/github.svg'

import { signIn } from 'next-auth/react'

import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { X } from '@phosphor-icons/react'

type DialogAuthenticateProps = {
  callbackUrl?: string
}

export const DialogAuthenticate = React.forwardRef<
  any,
  DialogAuthenticateProps
>(({ callbackUrl }, fowaredRef) => {
  async function handleLogin(loginPlatform: string) {
    await signIn(loginPlatform, { callbackUrl: callbackUrl ?? '/' })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[3] w-screen h-screen bg-black/30" />

      <Dialog.Content
        ref={fowaredRef}
        className="fixed top-0 z-[4] flex items-center justify-center w-screen h-screen"
      >
        <div className="w-[516px] bg-gray-700 py-14 px-[72px] rounded-xl relative">
          <Dialog.Close className="absolute text-gray-400 right-6 top-6 hover:text-gray-200">
            <X size={15} aria-label="Fechar" />
          </Dialog.Close>
          <h4 className="font-bold text-center text-gray-200">
            Faça login para deixar sua avaliação
          </h4>
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
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
})

DialogAuthenticate.displayName = 'DialogAuthenticate'
