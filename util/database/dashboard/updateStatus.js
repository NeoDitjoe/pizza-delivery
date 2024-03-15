// import { ObjectId } from "mongodb";
import client from "../connectClient";

export default async function statusUpdate(email, uniqueId, status) {

  const db = client.db('dashboard')

  await db.collection('orders').updateOne(
    {email, uniqueId},
    {$set: {status: status}}
  )
}