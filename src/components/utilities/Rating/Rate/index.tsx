import React, { useState } from 'react'
import { Avatar } from '../../Avatar'
import { useSession } from 'next-auth/react'
import { Check, X } from '@phosphor-icons/react'
import { TextArea } from '../../TextArea'
import { StarsToRate } from '../../StarsToRate'

interface IOnSave {
  description: string
  user_id: string
  rate: number
}

type RateProps = {
  onAbortRating: () => void
  onSave: (params: IOnSave) => void
}

interface IRateAmount {
  weight: number
  value: number
}

export function Rate({ onAbortRating, onSave }: RateProps) {
  const [rateAmount, setRateAmount] = useState(0)
  const [ratingText, setRatingText] = useState('')
  const [ratingErrors, setRatingErrors] = useState('')
  const starsToRate = [1, 2, 3, 4, 5]

  const { data: session } = useSession()

  if (!session) return null

  async function handleSubmit() {
    if (ratingText.length < 10) {
      setRatingErrors('Avaliação muito curta')
      return
    }

    if (ratingText.length > 490) {
      setRatingErrors('Avaliação muito longa')
      return
    }

    if (rateAmount <= 0) {
      setRatingErrors('Selecione uma nota')
      return
    }

    setRatingErrors('')

    onSave({
      description: ratingText,
      rate: rateAmount,
      user_id: session?.user.id!,
    })
  }

  function handleSaveRate({ weight, value }: IRateAmount) {
    const fullValue = weight * 1

    if (value === 1) {
      setRateAmount(fullValue)
      return
    }

    const halfAmount = fullValue - 0.5
    setRateAmount(halfAmount)
  }

  function getAmountStar(amount: number, star: number) {
    const isGreaterOrEqualStar = amount >= star

    if (isGreaterOrEqualStar) {
      return 1
    }

    const isHalfStar = amount >= star - 0.5

    if (isHalfStar) {
      return 0.5
    }

    return 0
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

        <div className="flex gap-2">
          {starsToRate.map((star) => (
            <StarsToRate
              key={star}
              onChangeRate={(value) => handleSaveRate({ weight: star, value })}
              getActualValue={() => getAmountStar(rateAmount, star)}
            />
          ))}
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
          onClick={handleSubmit}
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  )
}
