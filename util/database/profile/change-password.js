import hashInput from "../auth/bcrypt";
import client from "../connectClient";

export default async function changePassword(email, password, res) {

  const db = client.db('authentication')

  if (password.split('').length < 7) {
    res.status(417).json({ message: 'Password should contain more then 7 or more characters' })
    return
  }

  const bcryptPassword = await hashInput(password)

  await db.collection('users').updateOne(
    { email },
    { $set: { password: bcryptPassword } }
  )
}