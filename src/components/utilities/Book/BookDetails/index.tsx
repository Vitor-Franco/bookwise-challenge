import Image from 'next/image'
import React from 'react'
import { RatingStars } from '../../Rating'
import { BookOpen, BookmarkSimple } from '@phosphor-icons/react'

type Book = {
  author: string
  averageRate: number
  cover_url: string
  created_at: string
  id: string
  name: string
  total_pages: string
  categories: {
    category: {
      name: string
    }
  }[]
  ratings: {
    id: string
    created_at: string
    description: string
    rate: number

    user: {
      avatar_url: string
      id: string
      name: string
    }
  }[]
}

type BookDetailsProps = {
  book: Book
}

export function BookDetails({ book }: BookDetailsProps) {
  const ratingsSize = book.ratings.length

  let messageRating = 'Seja o primeiro a avaliar'
  if (ratingsSize > 0) {
    messageRating =
      ratingsSize > 1 ? `${ratingsSize} Avaliações` : `${ratingsSize} Avaliação`
  }

  return (
    <div className="flex flex-col px-8 py-6 bg-gray-700 rounded-[10px] gap-10">
      <div className="flex gap-8">
        <Image
          src={book.cover_url}
          height={242}
          width={171}
          alt="14 hábitos de desenvolvedores altamente produtivos"
          className="object-contain rounded-[10px] w-[171px] h-[242px]"
          priority
        />
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-100">{book.name}</h4>
            <span className="inline-block mt-2 text-gray-300">
              {book.author}
            </span>
          </div>
          <div>
            <div className="flex gap-1">
              <RatingStars rating={book.averageRate} />
            </div>
            <span className="inline-block mt-1 text-sm text-gray-400">
              {messageRating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-2 py-6 border-t border-gray-600">
        <div className="flex items-center flex-1 gap-4">
          <BookmarkSimple size={24} className="text-green-100" />

          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Categoria</span>
            <span className="font-bold text-gray-200">
              {book.categories.map(({ category }) => category.name).join(', ')}
            </span>
          </div>
        </div>
        <div className="flex items-center flex-1 gap-4">
          <BookOpen size={24} className="text-green-100" />

          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Páginas</span>
            <span className="font-bold text-gray-200">{book.total_pages}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
