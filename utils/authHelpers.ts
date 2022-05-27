import mode from './mode'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiResponse } from 'next/types'
import prisma from '../lib/prisma'

export const createToken = (
  data: object,
  duration = mode<'LONG' | 'SHORT'>('LONG', 'SHORT'),
) => {
  const time = {
    LONG: '8h',
    SHORT: '4h',
  }

  return jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: time[duration],
  })
}

export const killCookie = (res: NextApiResponse, cookieName: string) => {
  res.setHeader(
    'SET-COOKIE',
    cookie.serialize(
      cookieName,
      {},
      {
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    ),
  )
}

export const setCookie = (
  res: NextApiResponse,
  cookieName: string,
  payload: string,
  options?: { lifetime: 'LONG' | 'SHORT' },
) => {
  res.setHeader(
    'SET-COOKIE',
    cookie.serialize(cookieName, payload, {
      httpOnly: true,
      maxAge: options?.lifetime === 'LONG' ? 8 * 60 * 60 : 2 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  )
}

/**
 * Updates the lastLogin field of DB of userID with the data
 */
const updateLastLogin = async (date: number, userID: number) => {
  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        lastlogin: {
          upsert: {
            create: {
              loginAt: date,
            },
            update: {
              loginAt: date,
            },
          },
        },
      },
    })
  } catch (e) {
    return e
  }
}

export const jwtTokenGen = (
  res: NextApiResponse,
  user: { id: number; email: string },
) => {
  const crntTime = Date.now()
  const token = createToken({
    id: user.id,
    email: user.email,
    time: crntTime,
  })
  setCookie(res, 'AUTH_TOKEN', token)

  updateLastLogin(crntTime, user.id)
}
