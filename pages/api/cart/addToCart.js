import addToCart from "@/util/database/cart/add-to-cart"

export default async function handler(req, res) {

  if( req.method === 'POST') {

    try {
      await addToCart(req.body)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to add to cart'})
    }
  }
}