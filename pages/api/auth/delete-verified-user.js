import deleteAccount from "@/util/database/auth/delete-verified-user"

export default async function handler(req, res) {

  if(req.method === 'DELETE') {

    const { email } = req.query

    try {
      await deleteAccount(email)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed!' })
    }
  }
}