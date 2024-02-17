import signUp from "@/util/database/auth/signUp"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { username, email, password, image, verificationCode } = req.body

    try {
      await signUp(username, email, password, image, verificationCode, res )
    } catch (error) {
      res.status(500).json({ message: error || 'failed attempt!'})
    }
  }
}