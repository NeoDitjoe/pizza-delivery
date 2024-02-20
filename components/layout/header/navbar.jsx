import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import style from './navbar.module.css'

export default function Navbar() {

  const { data: session } = useSession()

  console.log(session)

  return (
    <Fragment>
      {
        !session
         ? <Link href='/auth'>Sign In</Link>
         :<button
            className={style.signOut}
           onClick={() => signOut()}
         >Sign Out</button>
      }
    </Fragment>
  )
}