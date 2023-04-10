'use client'

import { BookPreviewLg, DialogBookContent } from '@/components/utilities/Book'
import { Input } from '@/components/utilities/Input'
import { Category } from '@/components/utilities/Category'
import { api } from '@/lib/axios'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import qs from 'qs'
import * as Dialog from '@radix-ui/react-dialog'

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
    ['books', selectedCategories],
    async () => {
      const response = await api.get('/books', {
        params: {
          categories: selectedCategories,
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })

      return response.data
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  )

  const { data: categories } = useQuery<Tag[]>(
    ['categories'],
    async () => {
      const { data: response } = await api.get('/categories')

      setSelectedCategories(response.map((category: Tag) => category.id))
      return response
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  )

  const [bookId, setBookId] = useState<string>('')
  function handleBookDetails(bookId: string) {
    setBookId(bookId)
  }

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

          <div className="grid grid-cols-2 gap-5 mt-12 mb-3 2xl:grid-cols-3">
            {books?.map((book) => {
              return (
                <Dialog.Root key={book.id}>
                  <Dialog.Trigger onClick={() => handleBookDetails(book.id)}>
                    <BookPreviewLg isReaded={true} book={book} />
                  </Dialog.Trigger>

                  <DialogBookContent bookId={bookId} />
                </Dialog.Root>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
