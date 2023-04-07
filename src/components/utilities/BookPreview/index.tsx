import Image from 'next/image'
import React from 'react'
import { RatingStars } from '../RatingStars'

interface Book {
  id: string
  author: string
  cover_url: string
  name: string
  summary: string
  rate: number
}

type BookPreviewProps = {
  book: Book
}

export function BookPreview({ book }: BookPreviewProps) {
  return (
    <button className="text-left cursor-pointer flex gap-5 h-full w-full rounded-lg px-5 py-[18px] bg-gray-700 hover:bg-gray-600">
      <Image
        src={book.cover_url}
        alt="livro"
        width={64}
        height={94}
        className="object-cover rounded-[4px] h-[94px] w-[64px]"
        priority
      />

      <div className="flex flex-col justify-between flex-1 h-full">
        <div>
          <h4 className="font-bold text-gray-100 line-clamp-2">{book.name}</h4>
          <span className="text-sm text-gray-400">{book.author}</span>
        </div>

        <div className="flex gap-1">
          <RatingStars rating={book.rate} />
        </div>
      </div>
    </button>
  )
}
