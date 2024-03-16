import client from "../connectClient";

export default async function updateQty(id, price) {

  const db = client.db('user')

  await db.collection('cart').updateOne(
    {id: id},
    {$set: {price: price}}
  )
}