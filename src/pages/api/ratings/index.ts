import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

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

  // if (request.method === 'POST') {
  // }
}
