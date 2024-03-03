import updateAdmin from "@/util/database/dashboard/notifyAdminOnStock"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { base, cheese, sauce } = req.body

    try {
      await updateAdmin(base, cheese, sauce)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to update'})
    }
  }
}