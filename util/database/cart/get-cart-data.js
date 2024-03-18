import client from "../connectClient";

export default async function getCartData(user) {

  const db = client.db('user')

  const results = await db.collection('cart').aggregate([
    {$project: { _id: 0}},
    {$match: { user: user}}
  ]).toArray()

  const count = results.length

  return {
    results,
    count
  }
}