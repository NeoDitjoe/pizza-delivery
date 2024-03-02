import client from "../connectClient";

export default async function getOrders() {

  const db = client.db('user')

  const orders = await db.collection('cart').aggregate([]).toArray()

  const idToString = orders.map((order) => {
    const id = order._id.toString()

    return {...order, _id: id}
  })

  return idToString
}