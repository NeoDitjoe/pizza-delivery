import client from "../connectClient";

export default async function addToCart(items) {

  const db = client.db('user')

  await db.collection('cart').insertOne(items)
}