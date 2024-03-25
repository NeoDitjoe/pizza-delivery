import client from "../connectClient";

export default async function removeCompletedOrder(uniqueId){

  const db = client.db('dashboard')

  await db.collection('orders').deleteMany(
    {uniqueId}
  )
}