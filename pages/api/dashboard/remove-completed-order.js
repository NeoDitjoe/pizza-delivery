import removeCompletedOrder from "@/util/database/dashboard/remove-completed-order"

export default async function handler(req, res) {

  if (req.method === 'DELETE') {

    const { uniqueId } = req.query

    try {
      await removeCompletedOrder(uniqueId)
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(500).json({ message: 'failed to remove Item!'})
    }
  }
}