import client from "../connectClient";

export default async function verifyEmail(username, email, password, image, res){

  const db = client.db('authentication')

  const checkUserByEmail = await db.collection('verification').findOne({ email: email})
  // const checkUserByEmail = await db.collection('users').findOne({ email: email})

  if(checkUserByEmail){
    res.status(417).json({ message: 'user already sign up, please verify email to continue'})
    return
  }

  await db.collection('verification').insertOne({
    username: username,
    email: email,
    password: password,
    image: image || ''
  })
}