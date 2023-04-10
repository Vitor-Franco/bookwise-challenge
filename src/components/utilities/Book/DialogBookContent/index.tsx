import React, { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { Rate, RatingPreview } from '../../Rating'
import { BookDetails } from '../BookDetails'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { DialogAuthenticate } from '../../DialogAuthenticate'
import { useSession } from 'next-auth/react'

type ModalBookDetailsProps = {
  bookId: string
}

interface IBookDetails {
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

export const DialogBookContent = React.forwardRef<any, ModalBookDetailsProps>(
  ({ bookId }, forwardedRef) => {
    const [isRating, setIsRating] = useState(false)
    const { status } = useSession()

    const { data: book } = useQuery<IBookDetails>(
      ['books', bookId],
      async () => {
        const response = await api.get(`/books/${bookId}`)

        return response.data
      },
      {
        staleTime: 2 * 60 * 1000, // 2 minutes
      },
    )

    function handleAbortRating() {
      setIsRating(false)
    }

    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1] w-full h-full p-10 bg-black/60" />

        <Dialog.Content
          ref={forwardedRef}
          className="px-12 py-16 top-0 z-[2] overflow-y-auto bg-gray-800 fixed right-0 max-w-[40%] w-2/5 h-screen"
        >
          <Dialog.Close className="absolute text-gray-400 right-6 top-6 hover:text-gray-200">
            <X size={15} aria-label="Fechar" />
          </Dialog.Close>

          {book && <BookDetails book={book} />}

          <div className="mt-10">
            <div className="flex items-center justify-between w-full">
              <h6 className="text-sm text-gray-200">Avaliações</h6>

              {status !== 'authenticated' && (
                <Dialog.Root>
                  <Dialog.Trigger
                    type="button"
                    className="font-bold text-purple-100"
                  >
                    Avaliar
                  </Dialog.Trigger>

                  <DialogAuthenticate
                    callbackUrl={`/explore?bookId=${book?.id}`}
                  />
                </Dialog.Root>
              )}

              {status === 'authenticated' && !isRating && (
                <button
                  type="button"
                  className="font-bold text-purple-100"
                  onClick={() => setIsRating(true)}
                >
                  Avaliar
                </button>
              )}
            </div>

            <div className="mt-3 space-y-3">
              {isRating && <Rate onAbortRating={handleAbortRating} />}

              {book?.ratings && book.ratings.length > 0 ? (
                book.ratings.map((review) => (
                  <RatingPreview key={review.id} rating={review} />
                ))
              ) : (
                <p className="text-gray-400">
                  Nenhuma avaliação para este livro
                </p>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    )
  },
)

DialogBookContent.displayName = 'DialogBookContent'
