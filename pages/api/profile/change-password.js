import changePassword from "@/util/database/profile/change-password"

export default async function handler(req, res){

  if(req.method === 'POST'){

    const { email, password } = req.body

    try {
      await changePassword(email, password, res)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to change password'})
    }
  }
}