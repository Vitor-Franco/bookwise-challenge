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

  const id = String(request?.query?.id)

  if (!id) {
    return response.status(404).json({
      error: 'ID not found',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      ratings: {
        include: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  })

  let amountPagesReaded = 0
  const amountAuthorsReaded: string[] = []
  const categoriesMostReaded: {
    name: string
    amount: number
  }[] = []

  if (user?.ratings.length) {
    for (const rating of user.ratings) {
      amountPagesReaded += rating.book.total_pages || 0

      if (!amountAuthorsReaded.includes(rating.book.author)) {
        amountAuthorsReaded.push(rating.book.author)
      }

      for (const category of rating.book.categories) {
        const categoryName = category.category.name
        const categoryIndex = categoriesMostReaded.findIndex(
          (item) => item.name === categoryName,
        )

        if (categoryIndex === -1) {
          categoriesMostReaded.push({
            name: categoryName,
            amount: 1,
          })
        } else {
          categoriesMostReaded[categoryIndex].amount += 1
        }
      }
    }
  }

  const totalAuthorsReaded = amountAuthorsReaded?.length
  const [categoriesMostReadedSorted] = categoriesMostReaded.sort(
    (a, b) => b.amount - a.amount,
  )

  return response.status(200).json({
    user,
    amountPagesReaded,
    totalAuthorsReaded,
    amountBooksReaded: user?.ratings.length || 0,
    categoriesMostReaded: categoriesMostReadedSorted?.name || 0,
  })
}
