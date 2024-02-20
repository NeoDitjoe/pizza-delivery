import { verifyPassword } from '@/util/database/auth/bcrypt';
import client from '@/util/database/connectClient';
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({

  session: {
    jwt: true

  },

  providers: [
    CredentialsProvider({

      async authorize(credentials) {
        const users = client.db('authentication').collection('users')
        const checkUserEmail = await users.findOne({ email: credentials.email })

        if (!checkUserEmail) {
          throw new Error('User not found!')
        }

        const isValid = await verifyPassword(credentials.password, checkUserEmail.password)

        if (!isValid) {
          throw new Error('Incorrect Password')
        }
        return { email: checkUserEmail }
      }
    })
  ],
})
