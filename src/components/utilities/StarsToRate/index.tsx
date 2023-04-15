import { Star, StarHalf } from '@phosphor-icons/react'
import React from 'react'

type StarsToRateProps = {
  getActualValue: () => number
  onChangeRate: (rate: number) => void
  value?: number
}

export function StarsToRate({
  getActualValue,
  onChangeRate,
  value = 0,
}: StarsToRateProps) {
  const amountStar = getActualValue() || value

  function handleFill(amount: number) {
    onChangeRate(amount)
  }

  return (
    <div className="relative flex items-center justify-center">
      {amountStar === 1 && (
        <Star size={18} weight="fill" className="absolute text-purple-100" />
      )}

      {amountStar === 0 && (
        <Star size={18} weight="regular" className="absolute text-purple-100" />
      )}

      {amountStar === 0.5 && (
        <StarHalf
          size={18}
          weight="fill"
          className="absolute text-purple-100"
        />
      )}

      <button
        type="button"
        className="w-[9px] h-[18px] z-10"
        onClick={() => handleFill(0.5)}
      ></button>
      <button
        type="button"
        className="w-[9px] h-[18px] z-10"
        onClick={() => handleFill(1)}
      ></button>
    </div>
  )
}
