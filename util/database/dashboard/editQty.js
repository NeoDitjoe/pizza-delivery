import client from "../connectClient";

export default async function editQty(category, product, qty){

  const db = client.db('dashboard')

  await db.collection('stock').insertOne(
    {category: category},
    {$set: {[product] : qty}}
  )
}