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

  if (isAdmin) {
    return (
      <div className={isHomePage ? style.background : style.backgroundB}>
        <div className={style.navbar}>

          <Link href={'/'}>View-as-Customer</Link>
          <Link href={'/dashboard'}>Dashboard</Link>
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
            : <Link href={'/'}>Home</Link>
          }
          <Link href={'/user-profile'}>{username}</Link>
        </navbar>
      </div>
    </Fragment>
  )
}