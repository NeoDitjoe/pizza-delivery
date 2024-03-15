import client from "../connectClient";

export default async function getOrders() {

  const db = client.db('dashboard')

  const orders = await db.collection('orders').aggregate([
    {$project: { _id: 0}}
  ]).toArray()

  return orders
}