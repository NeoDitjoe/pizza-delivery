import client from "../connectClient";
import hashInput from "./bcrypt";

export default async function signUp(username, email, password, image,verificationCode, res){

  const db = client.db('authentication')

  const checkUserByEmail = await db.collection('verification').findOne({ email: email})
  const checkUser = await db.collection('users').findOne({ email: email})

  if(checkUserByEmail){
    res.status(417).json({ message: 'Email already in use, but is not verified'})
    return
  }

  if(checkUser){
    res.status(417).json({ message: 'email already in use, Please Sign in'})
  }else{

    const hashPassword = await hashInput(password)

    try {
      await db.collection('verification').insertOne({
        username: username,
        email: email,
        password: hashPassword,
        image: image || '',
        verificationCode: verificationCode
      })
  
      res.status(200).json({ message: 'success'})
    } catch (error) {
      res.status(417).json({ message: 'Something went wrong'})
    }
    
  }

}
