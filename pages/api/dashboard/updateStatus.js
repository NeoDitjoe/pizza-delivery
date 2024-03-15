import statusUpdate from "@/util/database/dashboard/updateStatus"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { email, uniqueId, status } = req.body

    try {
      await statusUpdate(email, uniqueId, status)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message : 'failed to send update' })
    }
  }
}