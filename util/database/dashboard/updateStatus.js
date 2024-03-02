// import { ObjectId } from "mongodb";
import client from "../connectClient";

export default async function statusUpdate(username, uniqueId, status) {

  const db = client.db('user')

  await db.collection('cart').updateOne(
    {username, uniqueId},
    {$set: {status: status}}
  )
}