import sendCode from "@/util/database/auth/resetPassord/sendCode"
import { sendCodeToEmail } from "@/util/mail"

export default async function handler(req, res){

  if(req.method === 'POST'){

    const { email, code } = req.body

    try {
      await sendCode(email, code)
      await sendCodeToEmail(email, code)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to send code'})
    }
  }
}