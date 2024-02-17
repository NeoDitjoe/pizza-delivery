import { compare, hash } from "bcryptjs";

export default async function hashInput(password) {
  const encrypt = await hash(password, 13)

  return encrypt
}

export async function verifyHashed(password, hashedPassword) {
  const verify = await compare(password, hashedPassword)

  return verify
}