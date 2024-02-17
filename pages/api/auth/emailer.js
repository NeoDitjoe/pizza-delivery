import main from "@/util/mail"

export default async function handler(req, res) {
   
  if(req.method === 'POST'){

    const { userEmail, username } = req.body
    
    try {
      await main(userEmail, username)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed!'})
    }
  }

}