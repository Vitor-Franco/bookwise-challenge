import { minifyName } from '@/utils/minifyName'

import Image from 'next/image'
import React from 'react'

type AvatarProps = {
  size?: number
  imageUrl?: string
  username: string
}

type UserInitialsProps = {
  size: number
  username: string
}

function UserInitials({ size, username }: UserInitialsProps) {
  const nameMinified = minifyName(username || '')

  function getUserInitials() {
    const nameLength = nameMinified.split(' ').length

    if (nameLength > 1) {
      const [firstName, lastName] = nameMinified.split(' ')
      return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

    return `${nameMinified.charAt(0)}`
  }

  const initials = getUserInitials()

  return (
    <div
      className={`font-bold min-h-[${size}px] min-w-[${size}px] h-[${size}px] w-[${size}px] bg-gray-700 justify-center flex items-center text-white rounded-full`}
    >
      {initials}
    </div>
  )
}

export function Avatar({ size = 40, imageUrl, username }: AvatarProps) {
  const sizeInPx = `${size}px`
  const imageMinusBorder = size - size * 0.1

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center min-h-[${sizeInPx}] h-[${sizeInPx}] min-w-[${sizeInPx}] w-[${sizeInPx}] bg-gradient-vertical`}
    >
      {!imageUrl ? (
        <UserInitials size={imageMinusBorder} username={username} />
      ) : (
        <Image
          src={imageUrl}
          alt="user review"
          width={imageMinusBorder}
          height={imageMinusBorder}
          className={`object-cover rounded-full aspect-square object-bottom min-h-[${imageMinusBorder}px] h-[${imageMinusBorder}px] min-w-[${imageMinusBorder}px] w-[${imageMinusBorder}px]`}
        />
      )}
    </div>
  )
}
