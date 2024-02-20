import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

export default function Navbar() {

  const { data: session } = useSession()

  console.log(session)

  return (
    <Fragment>
      {
        !session
         ? <Link href='/auth'>Sign In</Link>
         :<button
           onClick={() => signOut()}
         >Sign Out</button>
      }
    </Fragment>
  )
}