import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import style from './navbar.module.css'
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Navbar() {

  const { data: session } = useSession()
  const router = useRouter()

  const isHomePage = router.asPath === '/'
  const isAdmin = session?.user?.email?.admin
  const user = session?.user?.email.email

  if (isAdmin) {
    return (
      <div className={isHomePage ? style.background : style.backgroundB}>
        <div className={style.navbar}>

          <Link href={'/'}>View-as-Customer</Link>
          <Link href={'/dashboard'}>Dashboard</Link>
          <Link href={'/dashboard/orders'}>Orders</Link>
          <button
                className={style.signOut}
                onClick={() => signOut()}
              >Sign-Out</button>
        </div>

      </div>
    )
  }

  return (
    <Fragment>
      <div className={isHomePage ? style.background : style.backgroundB}>

        <navbar className={style.navbar}>
          {!session
            ? <Link href='/auth'>Sign In</Link>
            : <div>
              <Link href={'/'}>Home </Link>
              <Link href={`/cart?me=${user}`}> Cart</Link>
              <button
                className={style.signOut}
                onClick={() => signOut()}
              >Sign-Out</button>
            </div>
          }
        </navbar>
      </div>
    </Fragment>
  )
}