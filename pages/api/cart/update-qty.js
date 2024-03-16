import updateQty from "@/util/database/cart/update-qty"

export default async function handler(req, res) {

  if(req.method === 'POST') {
    const { id, price } = req.body

    try {
      await updateQty(id, price)
      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(500).json({ message: 'failed attempt!' })
    }
  }
}