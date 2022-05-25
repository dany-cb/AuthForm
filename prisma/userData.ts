import bcrypt from 'bcrypt'

const data: { username: string; email: string; password: string }[] = [
  {
    username: 'test1',
    email: 'test1@test.com',
    password: bcrypt.hashSync('test@123', 10),
  },
]

export default data
