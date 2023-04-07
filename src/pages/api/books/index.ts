import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const methodsAvailable = ['GET']

  if (request.method && !methodsAvailable.includes(request.method)) {
    return response.status(405).end()
  }

  const books = await prisma.book.findMany({
    include: {
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })

  const booksWithAverageRating = books.map((book) => {
    const ratingTotal = book.ratings.reduce(
      (acc, rating) => acc + rating.rate,
      0,
    )
    const averageRating = ratingTotal / book.ratings.length

    return {
      id: book.id,
      author: book.author,
      cover_url: book.cover_url,
      name: book.name,
      summary: book.summary,
      rate: averageRating,
    }
  })

  return response.status(200).json(booksWithAverageRating)
}
