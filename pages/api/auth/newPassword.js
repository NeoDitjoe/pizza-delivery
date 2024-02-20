import setNewPassword from "@/util/database/auth/resetPassord/newPassword"

export default async function handler(req, res){

  if(req.method === 'POST'){

    const { email, code, password } = req.body

    try {
      await setNewPassword(email, code, password, res)
      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong'})
    }
  }
}