import client from "../connectClient";

const db = client.db('user')

export default async function deleteItem(id) {

  await db.collection('cart').deleteOne(
    {id}
  )
}

export async function deleteAll(user) {

  await db.collection('cart').deleteMany(
    {user}
  )
}