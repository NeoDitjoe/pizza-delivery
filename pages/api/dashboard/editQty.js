import editQty from "@/util/database/dashboard/editQty"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { category, product, qty } = req.body

    try {
      await editQty(category, product, qty)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(417).json({ message: 'failed to edit'})
    }
  }
}