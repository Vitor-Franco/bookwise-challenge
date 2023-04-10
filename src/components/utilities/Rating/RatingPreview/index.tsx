import React from 'react'
import { RatingStars } from '../RatingStars'
import { Avatar } from '../../Avatar'
import dayjs from 'dayjs'

interface Rating {
  rate: number
  created_at: string
  description: string
  user: {
    avatar_url: string
    name: string
  }
}

type RatingPreviewProps = {
  rating: Rating
}

export function RatingPreview({ rating }: RatingPreviewProps) {
  const ratingDescribedDate = dayjs(rating.created_at).from(dayjs())

  return (
    <div className="flex flex-col w-full gap-5 p-6 bg-gray-700 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar
            imageUrl={rating.user.avatar_url}
            username={rating.user.name}
          />
          <div className="flex flex-col">
            <p className="font-bold text-gray-100">{rating.user.name}</p>
            <span className="text-sm text-gray-400">{ratingDescribedDate}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <RatingStars rating={rating.rate} />
        </div>
      </div>
      <p className="text-sm text-gray-300">{rating.description}</p>
    </div>
  )
}
