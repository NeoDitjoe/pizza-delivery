import getCartData from "@/util/database/cart/get-cart-data"

export default async function handler(req, res){

  if(req.method === 'GET'){
    const { customer } = req.query

    try {
      const { count } = await getCartData(customer)
      res.status(200).json({ count })
    } catch (error) {
      res.status(500).json({ message: 'failed!'})
    }
  }
}