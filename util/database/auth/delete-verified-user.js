import client from "../connectClient";

export default async function deleteAccount(email){

  const db = client.db('authentication')

  await db.collection('verification').deleteOne(
    {email}
  )
}