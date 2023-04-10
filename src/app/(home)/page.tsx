'use client'

import { BookPreview } from '@/components/utilities/Book'
import { RatingPreviewWithBook } from '@/components/utilities/Rating'
import { api } from '@/lib/axios'
import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface Book {
  id: string
  author: string
  cover_url: string
  name: string
  summary: string
  rate: number
}

interface Rating {
  id: string
  rate: number
  created_at: string
  book: Book
  user: {
    avatar_url: string
    name: string
  }
}

export default function App() {
  const { data: ratings } = useQuery<Rating[]>(
    ['ratings'],
    async () => {
      const response = await api.get('/ratings')

      return response.data
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  )

  const { data: books } = useQuery<Book[]>(
    ['popular'],
    async () => {
      const response = await api.get('/books/popular')

      return response.data
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  )

  return (
    <div>
      <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-100">
        <ChartLineUp size={32} className="text-green-100" />
        Início
      </h1>
      <div className="mt-10 grid gap-16 grid-cols-[1fr_324px]">
        <main>
          <p className="text-sm text-gray-100">Avaliações mais recentes</p>

          <div className="gap-3 mt-4 space-y-3">
            {ratings?.map((rating) => {
              return <RatingPreviewWithBook key={rating.id} rating={rating} />
            })}
          </div>
        </main>
        <aside>
          <div className="flex justify-between text-sm">
            <p className="text-gray-100">Livros populares</p>

            <Link
              href="/explore"
              className="flex items-center gap-2 font-bold text-purple-100"
            >
              Ver todos
              <CaretRight size={16} />
            </Link>
          </div>
          <div className="grid gap-3 mt-4">
            {books?.map((book) => {
              return <BookPreview key={book.id} book={book} />
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}
