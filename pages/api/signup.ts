import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, pwd } = req.body

  console.log(req.body)
}
