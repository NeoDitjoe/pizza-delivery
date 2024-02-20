import client from "../connectClient";

export default async function sendCode(email, code) {

  const db = client.db('authentication')

  await db.collection('users').updateOne(
    {email: email},
    {$set: {verificationCode: code}}
  )
}