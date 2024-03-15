import client from "../connectClient";

export default async function getOrders(uniqueId) {

  const db = client.db('dashboard')

  const orderId = await db.collection('orders').aggregate([
    {$match: {get: true}},
    {$project: { _id: 0}}
  ]).toArray()

  const orderDetails = await db.collection('orders').aggregate([
    {$match: {uniqueId: uniqueId, get: false}},
    {$project: { _id: 0}}
  ]).toArray()


  return {
    orderDetails,
    orderId
  }
}