import verifyEmail from "@/util/database/auth/verifyEmail"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { username, email, password, image } = req.body

    try {
      await verifyEmail(username, email, password, image )
      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(500).json({ message: 'failed attempt!'})
    }
  }
}