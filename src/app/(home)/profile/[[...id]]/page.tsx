'use client'

import { Avatar } from '@/components/utilities/Avatar'
import { Input } from '@/components/utilities/Input'
import { RatingStars } from '@/components/utilities/Rating'
import { api } from '@/lib/axios'
import {
  Binoculars,
  BookOpen,
  BookmarkSimple,
  Books,
  MagnifyingGlass,
  User,
  UserList,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface ProfileProps {
  params: {
    id: string[]
  }
}

export default function Profile({ params }: ProfileProps) {
  const { data: session, status } = useSession()
  const [id] = params?.id || []
  const router = useRouter()

  useEffect(() => {
    if (!session?.user && status !== 'loading' && !id) {
      router.push('/sigin')
    }
  }, [id, router, session, status])

  const profileIdToLoad = id || session?.user?.id

  const { data: profile } = useQuery<any>(
    ['profile', profileIdToLoad],
    async () => {
      const response = await api.get(`/profile/${profileIdToLoad}`)

      return response.data
    },
  )

  if (!profile?.user) {
    return <div>Carregando...</div>
  }

  const userCreationDateYear = dayjs(profile?.user?.created_at).format('YYYY')
  const userHasRatings = profile?.user?.ratings?.length > 0
  return (
    <>
      <h1 className="flex gap-3 text-2xl font-bold text-gray-100">
        <User className="text-green-100" size={32} /> Perfil
      </h1>

      <div className="mt-10">
        <div className="flex gap-16">
          <main className="flex-1">
            <Input
              placeholder="Buscar livro avaliado"
              icon={<MagnifyingGlass size={24} />}
            />

            <div className="mt-8 space-y-6">
              {userHasRatings &&
                profile.user.ratings.map((review) => {
                  const distance = dayjs(review.created_at).from(dayjs())

                  return (
                    <div key={review.id}>
                      <span className="inline-block mb-2 text-sm text-gray-300">
                        {distance}
                      </span>

                      <div className="p-6 bg-gray-700 rounded-lg">
                        <div className="flex gap-6">
                          <Image
                            src={review.book.cover_url}
                            alt={review.book.name}
                            width={100}
                            height={140}
                            className="object-cover rounded-[4px]"
                          />

                          <div className="flex flex-col justify-start flex-1">
                            <h6 className="text-lg text-gray-100">
                              {review.book.name}
                            </h6>
                            <span className="text-sm text-gray-400">
                              {review.book.author}
                            </span>

                            <div className="flex items-end flex-1 gap-1">
                              <RatingStars rating={review.rate} />
                            </div>
                          </div>
                        </div>
                        <p className="mt-6 text-sm text-gray-300">
                          {review.description}
                        </p>
                      </div>
                    </div>
                  )
                })}

              {!userHasRatings && (
                <div className="flex flex-col items-center justify-center bg-gray-700 rounded-lg h-96">
                  <Binoculars size={64} className="text-green-100" />
                  <span className="mt-5 text-xl font-bold text-gray-100">
                    Nenhum livro avaliado
                  </span>
                  <span className="text-sm text-gray-400">
                    Você ainda não avaliou nenhum livro
                  </span>
                </div>
              )}
            </div>
          </main>

          <aside className="sticky flex flex-col items-center justify-center border-l border-gray-700 top-5 h-fit w-80 px-14">
            <Avatar
              size={72}
              imageUrl={profile.user.avatar_url}
              username={profile.user.name}
            />
            <span className="inline-block mt-5 text-xl font-bold text-gray-100">
              {profile.user.name}
            </span>
            <span className="text-sm text-gray-400">
              membro desde {userCreationDateYear}
            </span>

            <span className="inline-block w-8 h-1 my-8 rounded-full bg-gradient-horizontal"></span>

            <div className="w-full py-5 space-y-10">
              <div className="flex gap-5">
                <BookOpen size={32} className="text-green-100" />

                <div className="flex flex-col items-start">
                  <span className="font-bold text-gray-200">
                    {profile.amountPagesReaded}
                  </span>
                  <span className="text-xs text-gray-300">Páginas lidas</span>
                </div>
              </div>
              <div className="flex gap-5">
                <Books size={32} className="text-green-100" />

                <div className="flex flex-col items-start">
                  <span className="font-bold text-gray-200">
                    {profile.amountBooksReaded}
                  </span>
                  <span className="text-xs text-gray-300">
                    Livros avaliados
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <UserList size={32} className="text-green-100" />

                <div className="flex flex-col items-start">
                  <span className="font-bold text-gray-200">
                    {profile.totalAuthorsReaded || '-'}
                  </span>
                  <span className="text-xs text-gray-300">Autores lidos</span>
                </div>
              </div>
              <div className="flex gap-5">
                <BookmarkSimple size={32} className="text-green-100" />

                <div className="flex flex-col items-start">
                  <span className="font-bold text-gray-200">
                    {profile.categoriesMostReaded || '-'}
                  </span>
                  <span className="text-xs text-gray-300">
                    Categoria mais lida
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
