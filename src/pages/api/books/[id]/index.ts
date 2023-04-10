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

  const id = String(request.query.id)

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      ratings: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!book) {
    return response.status(404).end()
  }

  const ratingTotal = book.ratings.reduce((acc, rating) => acc + rating.rate, 0)
  const averageRating = ratingTotal / book.ratings.length

  return response.status(200).json({
    ...book,
    averageRate: averageRating,
  })
}
