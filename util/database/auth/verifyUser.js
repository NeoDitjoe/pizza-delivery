import client from "../connectClient";

export default async function verify(email, verificationCode, res) {

  const db = client.db('authentication')

  const checkUserEmail = await db.collection('verification').findOne({ email: email})

  if(checkUserEmail){

    if(checkUserEmail.verificationCode === verificationCode) {

        const { verificationCode, ...userDetails } = checkUserEmail

      await db.collection('users').insertOne(userDetails)
    }else{
      res.status(500).json({ message: 'Invalid Code'})
    }

  }else{
    res.status(500).json({ message: 'user not found. please sign up'})
    return
  }
}