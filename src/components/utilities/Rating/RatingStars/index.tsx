import { Star, StarHalf } from '@phosphor-icons/react'
import React, { useMemo } from 'react'

type RatingStarsProps = {
  rating: number
}

export function RatingStars({ rating }: RatingStarsProps) {
  const { emptyStars, ratedStars, isDecimalRating } = useMemo(() => {
    const MAX_STARS = 5
    const isDecimalRating = rating % 1 !== 0

    const ratingRoundedToCeil = rating < 0 ? 0 : Math.ceil(rating)
    const maxRatingValue =
      ratingRoundedToCeil > MAX_STARS ? MAX_STARS : ratingRoundedToCeil
    const ratedStars = Array(maxRatingValue).fill('')

    const totalEmptyStars = MAX_STARS - ratedStars.length
    const emptyStars = Array(totalEmptyStars).fill('')

    return {
      emptyStars,
      ratedStars,
      isDecimalRating,
    }
  }, [rating])

  return (
    <>
      {ratedStars.map((_, index) => {
        if (isDecimalRating && index === ratedStars.length - 1) {
          return (
            <StarHalf
              key={index}
              size={16}
              weight="fill"
              className="text-purple-100"
            />
          )
        }

        return (
          <Star
            key={index}
            className="text-purple-100"
            weight="fill"
            size={16}
          />
        )
      })}
      {emptyStars.map((_, index) => {
        return <Star key={index} className="text-purple-100" size={16} />
      })}
    </>
  )
}
