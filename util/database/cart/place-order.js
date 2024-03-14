import client from "../connectClient";

export default async function placeOrder(order){

  const db = client.db('dashboard')

  await db.collection('orders').insertMany(order)

}