import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar } from '../Avatar'
import { RatingStars } from '../RatingStars'
import dayjs from '@/lib/dayjs'

interface Rating {
  id: string
  rate: number
  created_at: string
  book: {
    author: string
    cover_url: string
    name: string
    summary: string
  }
  user: {
    avatar_url: string
    name: string
  }
}

type RatingPreviewProps = {
  rating: Rating
}

export function RatingPreview({ rating }: RatingPreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isClamped, setClamped] = useState(false)

  const ratingDescribedDate = dayjs(rating.created_at).from(dayjs())

  function handleShowDetails() {}

  useEffect(() => {
    function handleResize() {
      if (contentRef && contentRef.current) {
        setClamped(
          contentRef.current.scrollHeight > contentRef.current.clientHeight,
        )
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="max-w-[610px] rounded-lg p-6 bg-gray-700 hover:bg-gray-600">
      <header className="flex gap-4">
        <Avatar imageUrl={rating.user.avatar_url} username={rating.user.name} />

        <div className="flex-1">
          <p className="text-gray-100">{rating.user.name}</p>
          <span className="block text-sm text-gray-400">
            {ratingDescribedDate}
          </span>
        </div>

        <div className="flex gap-1">
          <RatingStars rating={rating.rate} />
        </div>
      </header>

      <div className="flex items-start gap-5 mt-8">
        <Image
          src={rating.book.cover_url}
          alt="livro"
          width={108}
          height={152}
          className="object-cover w-[108px] h-[152px] aspect-auto"
        />

        <div className="flex-1">
          <h4 className="font-bold text-gray-100">{rating.book.name}</h4>
          <span className="text-sm text-gray-400">{rating.book.author}</span>

          <p
            ref={contentRef}
            className="mt-5 text-sm text-gray-300 line-clamp-3"
          >
            {rating.book.summary}
          </p>
          {isClamped && (
            <button
              onClick={handleShowDetails}
              className="text-sm font-bold text-purple-100"
            >
              <span>ver mais</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
