import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '../../lib/prisma'
import { jwtTokenGen } from '../../utils/authHelpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.AUTH_TOKEN
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const data: { id: number; email: string; time: number } = decoded as any
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        lastlogin: {
          select: {
            loginAt: true,
          },
        },
      },
    })
    const tokenTime = BigInt(data.time)
    if (
      user.lastlogin.loginAt == tokenTime &&
      tokenTime - user.lastlogin.loginAt < 28800000 // >8hrs
    ) {
      jwtTokenGen(res, user)
      res.json({
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      })
    } else {
      res.status(401).json({
        status: 401,
        title: 'Session timeout. Login Again!',
      })
    }
  } catch (error) {
    console.error('Invalid JWT', error)
    res.status(401).json({
      status: 401,
      title: 'Invalid token specified',
    })
  }
}
