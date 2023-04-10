import Image from 'next/image'
import React from 'react'
import { RatingStars } from '../../Rating/RatingStars'

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
  isReaded?: boolean
}

export function BookPreviewLg({ book, isReaded }: BookPreviewProps) {
  return (
    <div className="relative overflow-hidden text-left cursor-pointer flex gap-5 h-[184px] w-full rounded-lg px-5 py-[18px] bg-gray-700 hover:bg-gray-600">
      {isReaded && (
        <div className="absolute right-0 px-3 py-1 bg-green-300 rounded-tl rounded-bl bottom-4 w-fit">
          <span className="text-xs font-bold text-green-100 uppercase">
            LIDO
          </span>
        </div>
      )}

      <Image
        src={book.cover_url}
        alt="livro"
        width={108}
        height={152}
        className="object-cover rounded-[4px] h-[152px] w-[108px]"
        priority
      />

      <div className="flex flex-col justify-between w-full h-full">
        <div>
          <h4 className="font-bold text-gray-100 line-clamp-2">{book.name}</h4>
          <span className="text-sm text-gray-400">{book.author}</span>
        </div>

        <div className="flex gap-1">
          <RatingStars rating={book.rate} />
        </div>
      </div>
    </div>
  )
}
