import client from "../connectClient";

export default async function verify(email, verificationCode, res) {

  const db = client.db('authentication')

  const checkUserEmail = await db.collection('verification').findOne({ email: email})

  if(!checkUserEmail){
    res.status(417).json({ message: 'user not found. please sign up'})
    return
  }

  if(!checkUserEmail.verificationCode === verificationCode) {
    res.status(417).json({ message: 'Invalid Code'})
    return
  }

  if(checkUserEmail.verificationCode === verificationCode){
    await db.collection('users').insertOne(checkUserEmail)
  }else{
    res.status(417).json({ message: 'Invalid Code'})
    return 
  }

}