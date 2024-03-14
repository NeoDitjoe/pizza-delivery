import placeOrder from "@/util/database/cart/place-order"

export default async function handler( req, res ){

  if( req.method === 'POST'){

    try {
      await placeOrder(req.body)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to place order'})
    }
  }

}