import { NextApiRequest, NextApiResponse } from 'next'
import { killCookie } from '../../utils/authHelpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  killCookie(res, 'AUTH_TOKEN')
  res.status(200)
  res.redirect('/')
}
