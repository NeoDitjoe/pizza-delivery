import client from "../connectClient";

export default async function verifyEmail(username, email, password, image ){

  const db = client.db('authentication')

  await db.collection('verification').insertOne({
    username: username,
    email: email,
    password: password,
    image: image || ''
  })
}