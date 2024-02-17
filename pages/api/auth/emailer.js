import main from "@/util/mail"

export default async function handler(req, res) {
   
  if(req.method === 'POST'){

    const { userEmail, username, verificationCode } = req.body
    
    try {
      await main(userEmail, username, verificationCode)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed!'})
    }
  }

}