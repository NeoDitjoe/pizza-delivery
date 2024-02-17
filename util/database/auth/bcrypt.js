import { compare, hash } from "bcryptjs";

export default async function hashInput(password) {
  const encrypt = await hash(password, 13)

  return encrypt
}

export async function verifyPassword(currentPassword, hashedPassword) {
  const password = await compare(currentPassword, hashedPassword)

  return password
}