import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, pwd } = req.body
  const details = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: user,
        },
        {
          email: user,
        },
      ],
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  })

  if ((await details) && (await bcrypt.compare(pwd, details.password))) {
    const token = jwt.sign(
      {
        id: details.id,
        username: details.username,
        time: Date.now(),
      },
      process.env.JWT_KEY,
      {
        expiresIn: '8h',
      },
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('AUTH_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
    )

    res.json('Credentials match!')
  } else {
    res.status(401)
    res.json({
      title: 'Invalid Username/Password',
      status: 401,
    })
  }
}
