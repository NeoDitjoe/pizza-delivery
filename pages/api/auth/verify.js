import main from "@/util/mail"

export default function handler(req, res) {
   
  if(req.method === 'POST'){
    try {
      main()
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed!'})
    }
  }
}