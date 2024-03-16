import deleteItem from "@/util/database/cart/remove-from-cart"

export default async function handler(req, res){

  if(req.method === 'DELETE'){

    const { itemId } = req.query

    try {
      await deleteItem(itemId)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to remove item!'})
    }
  }
}