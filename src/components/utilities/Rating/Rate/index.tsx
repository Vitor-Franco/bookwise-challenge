import React, { useState } from 'react'
import { RatingStars } from '../RatingStars'
import { Avatar } from '../../Avatar'
import { useSession } from 'next-auth/react'
import { Check, X } from '@phosphor-icons/react'
import { TextArea } from '../../TextArea'

type RateProps = {
  onAbortRating: () => void
}

export function Rate({ onAbortRating }: RateProps) {
  const [ratingText, setRatingText] = useState('')
  const [ratingErrors, setRatingErrors] = useState('')

  const { data: session } = useSession()

  if (!session) return null

  function onSave() {
    if (ratingText.length < 10) {
      setRatingErrors('Avaliação muito curta')
      return
    }

    if (ratingText.length > 490) {
      setRatingErrors('Avaliação muito longa')
      return
    }

    setRatingErrors('')
  }

  return (
    <div className="rounded-lg w-full h-[328px] p-6 bg-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            imageUrl={session.user.avatar_url}
            username={session.user.name || ''}
          />

          <span className="font-bold text-gray-100">{session.user.name}</span>
        </div>
        <div className="flex gap-1">
          <RatingStars rating={4} />
        </div>
      </div>

      <div className="relative">
        <TextArea
          value={ratingText}
          maxLength={490}
          minLength={10}
          placeholder="Escreva sua avaliação"
          className={`${
            ratingErrors ? 'border-red-500 focus:border-red-500' : ''
          }`}
          onChange={(e) => setRatingText(e.target.value)}
        />

        {ratingErrors && (
          <span className="absolute left-0 text-xs text-red-500 -bottom-4">
            {ratingErrors}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-3">
        <button
          type="button"
          className="rounded-[4px] flex items-center justify-center w-10 h-10 p-2 text-purple-100 bg-gray-600"
          onClick={onAbortRating}
        >
          <X size={24} />
        </button>
        <button
          type="button"
          className="rounded-[4px] flex items-center justify-center w-10 h-10 p-2 text-green-100 bg-gray-600"
          onClick={onSave}
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  )
}
