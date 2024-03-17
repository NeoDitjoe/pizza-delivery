import client from "../connectClient";

export default async function trackOrder(email) {

  const db = client.db('dashboard')

  const orderId = await db.collection('orders').aggregate([
    {$match: {get: true, email: email}},
    {$project: { _id: 0}}
  ]).toArray()

  const orderDetails = await db.collection('orders').aggregate([
    {$match: {get: false, user: email}},
    {$project: { _id: 0}}
  ]).toArray()

  return {
    orderId,
    orderDetails
  }
}