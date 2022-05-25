import prisma from '../lib/prisma'
import data from './userData'

const seed = async () => {
  await Promise.all(
    data.map(async (user) => {
      await prisma.user.upsert({
        where: {
          username: user.username,
        },
        update: {},
        create: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      })
    }),
  )
}

seed()
