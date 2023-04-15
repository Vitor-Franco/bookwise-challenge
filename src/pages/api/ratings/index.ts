import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const rateBodySchema = z.object({
  book_id: z.string().uuid(),
  rate: z.number().min(1).max(5),
  description: z.string().min(10).max(490),
  user_id: z.string().uuid(),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const methodsAvailable = ['GET', 'POST']

  if (request.method && !methodsAvailable.includes(request.method)) {
    return response.status(405).end()
  }

  if (request.method === 'GET') {
    const ratings = await prisma.rating.findMany({
      include: {
        user: true,
        book: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return response.status(200).json(ratings)
  }

  if (request.method === 'POST') {
    try {
      const { book_id, rate, description, user_id } = rateBodySchema.parse(
        request.body,
      )

      const ratingExists = await prisma.rating.findFirst({
        where: {
          book_id,
          user_id,
        },
      })

      if (ratingExists) {
        return response.status(400).json({
          message: 'You already rated this book',
        })
      }

      const ratingCreated = await prisma.rating.create({
        data: {
          book: {
            connect: {
              id: book_id,
            },
          },
          rate,
          description,
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      })

      return response.status(201).json(ratingCreated)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
