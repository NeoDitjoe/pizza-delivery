import client from "../../connectClient";
import hashInput from "../bcrypt";

export default async function setNewPassword(email, code, password, res){

  const db = client.db('authentication')

  const userDetails = await db.collection('users').findOne({email: email})

  if(!userDetails){
    res.status(500).json({ message: 'User not found, create account'})
    return
  }

  if(userDetails.verificationCode !== code){
    res.status(500).json({ message: 'Invalid Code!'})
    return
  }

  if(password.split('').length < 7){
    res.status(500).json({ message: 'Password should contain 7 or more characters!'})
    return
  }

  const hashPassword = await hashInput(password)

  await db.collection('users').updateOne(
    {email: email, verificationCode: code},
    {$set: {password: hashPassword}}
  )
}