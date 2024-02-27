import editQty from "@/util/database/dashboard/editQty"

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const { category, product, qty } = req.query

    try {
      await editQty(category, product, qty)
    } catch (error) {
      res.status(417).json({ message: 'failed to edit'})
    }
  }
}