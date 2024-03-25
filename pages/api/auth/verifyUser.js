import verify from "@/util/database/auth/verifyUser"

export default async function handler(req, res) {

  if(req.method === 'POST') {

    const { email, verificationCode } = req.body

    try {
      await verify(email, verificationCode, res)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: error || 'verification failed. Check your internet connection' })
    }
  }
}