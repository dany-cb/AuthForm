import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { jwtTokenGen } from '../../utils/authHelpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, pwd } = req.body
  const userInfo = await prisma.user.findFirst({
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
      email: true,
      password: true,
    },
  })

  if ((await userInfo) && (await bcrypt.compare(pwd, userInfo.password))) {
    // const crntTime = Date.now()

    // const token = createToken({
    //   id: userInfo.id,
    //   email: userInfo.email,
    //   time: crntTime,
    // })

    // setCookie(res, 'AUTH_TOKEN', token)

    // const error = updateLastLogin(crntTime, userInfo.id)

    jwtTokenGen(res, userInfo)
    res.json('Login Successful')
  } else {
    res.status(401)
    res.json({
      title: 'Invalid Username/Password',
      status: 401,
    })
  }
}
