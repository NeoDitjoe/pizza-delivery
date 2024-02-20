import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import style from './navbar.module.css'

export default function Navbar() {

  const { data: session } = useSession()

  const username = session
    && session
      .user
      .email
      .username
      .charAt(0)
      .toUpperCase()
    + session
      .user
      .email
      .username.slice(1)

  return (
    <Fragment>
      {
        !session
          ? <Link href='/auth'>Sign In</Link>
          : <button
            className={style.signOut}
            onClick={() => signOut()}
          >Sign Out</button>
      }

      <Link href={'/user-profile'}>{username}</Link>
    </Fragment>
  )
}