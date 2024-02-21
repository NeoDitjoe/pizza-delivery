import client from "../connectClient";

export default async function getPizza(base){

  const db = client.db('menu')

  const pizzaList = await db.collection('pizza').aggregate([
    {$match: {base: base}},
    {$project: {_id: 0}}
  ]).toArray()

  return pizzaList
}