import { signOut } from 'next-auth/react'
import style from './profile.module.css'

export default function UserProfile() {

  return (
    <div className={style.main}>
      <button
        className={style.signOut}
        onClick={() => signOut()}
      >Sign Out</button>
    </div>
  )
}