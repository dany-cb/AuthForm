import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { jwtTokenGen } from '../../utils/authHelpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, pwd } = req.body

  if (!(username && email && pwd)) {
    res.status(400).json({ status: 400, title: 'Required inputs missing' })
  }

  let user: User

  try {
    user = await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(pwd, 10),
      },
    })
    // const crntTime = Date.now()

    // const token = createToken({
    //   id: user.id,
    //   email: user.email,
    //   time: crntTime,
    // })
    // setCookie(res, 'AUTH_TOKEN', token)

    // updateLastLogin(crntTime, user.id)

    jwtTokenGen(res, user)
    res.json('Signup success')
  } catch (e) {
    res.status(401)
    res.json({
      status: 401,
      title: 'User already exists!',
      info: e,
    })
    return
  }
}
