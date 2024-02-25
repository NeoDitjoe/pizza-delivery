import client from "../connectClient";

export default async function getStock(){

  const db = client.db('dashboard') 

  const stock = await db.collection('stock').aggregate([
    {$project : {_id: 0 }}
  ]).toArray()

  return stock
}