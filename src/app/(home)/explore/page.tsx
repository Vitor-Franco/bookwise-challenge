'use client'

import { BookPreviewLg } from '@/components/utilities/BookPreviewLg'
import { Input } from '@/components/utilities/Input'
import { Category } from '@/components/utilities/Category'
import { api } from '@/lib/axios'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface Book {
  id: string
  author: string
  cover_url: string
  name: string
  summary: string
  rate: number
}

interface Tag {
  id: string
  name: string
}

export default function Explore() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  function toggleCategoryFilter(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((categories) =>
        categories.filter((item) => item !== category),
      )
      return
    }

    setSelectedCategories((categories) => [...categories, category])
  }

  const { data: books } = useQuery<Book[]>(
    ['books'],
    async () => {
      const response = await api.get('/books')

      return response.data
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  )

  const { data: categories } = useQuery<Tag[]>(
    ['categories'],
    async () => {
      const response = await api.get('/categories')

      return response.data
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  )

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-100">
          <Binoculars size={32} className="text-green-100" />
          Explorar
        </h1>

        <Input
          type="text"
          placeholder="Buscar livro ou autor"
          className="w-[430px]"
          icon={<MagnifyingGlass size={20} />}
        />
      </div>
      <div className="mt-10">
        <main>
          <div className="flex flex-wrap gap-3">
            {categories?.map((category) => {
              return (
                <Category
                  key={category.id}
                  onClick={() => toggleCategoryFilter(category.id)}
                  name={category.name}
                  isActive={selectedCategories.includes(category.id)}
                />
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-5 mt-12">
            {books?.map((book) => {
              return <BookPreviewLg isReaded={true} key={book.id} book={book} />
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
