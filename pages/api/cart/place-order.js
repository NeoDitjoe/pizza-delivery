import placeOrder from "@/util/database/cart/place-order"
import { deleteAll } from "@/util/database/cart/remove-from-cart"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    try {
      await placeOrder(req.body)
      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(500).json({ message: 'failed to place order' })
    }
  }

  if (req.method === 'DELETE') {

    const { customerEmail } = req.query

    try {
      await deleteAll(customerEmail)
      res.status(200).json({ message: 'success' })
    } catch (error) {
      res.status(500).json({ message: 'Your is placed but your cart is not cleared' })
    }
  }

}