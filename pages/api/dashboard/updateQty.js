import updateQty from "@/util/database/dashboard/updateQty"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { base, cheese, sauce, veggies } = req.body

    try {
      await updateQty(base, cheese, sauce, veggies)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to update stock quantity'})
    }
  }
} 