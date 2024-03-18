import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import style from './navbar.module.css'
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import logo from '../../../public/logo/nobglogo.png'

export default function Navbar() {

  
  const { data: session } = useSession()
  const router = useRouter()
  const [ count, setCount ] = useState(null)
  
  const isHomePage = router.asPath === '/'
  const isAdmin = session?.user?.email?.admin
  const user = session?.user?.email.email

  useEffect(() => {
    fetch(`/api/cart/cart-count?customer=${session?.user?.email.email}`)
      .then(res => res.json())
      .then(data => setCount(data?.count))
  })

  if (isAdmin) {
    return (
      <div className={isHomePage ? style.background : style.backgroundB}>
        <div className={style.navbar}>

          <div>
            <Image
              src={logo}
              alt="Pizza4Real"
              width={200}
              height={200}
              className={style.img}
            />
          </div>

          <div className={style.menuDash}>
            <Link href={'/'}>View-as-Customer</Link>
            <Link href={'/dashboard'}>Dashboard</Link>
            <Link href={'/dashboard/orders'}>Orders</Link>
            <Link onClick={() => signOut()} href={'/'}>SignOut</Link>
           
          </div>
        </div>

      </div>
    )
  }

  return (
    <Fragment>
      <div className={isHomePage ? style.background : style.backgroundB}>

        <navbar className={style.navbar}>
          <div>
            <Image
              src={logo}
              alt="Pizza4Real"
              width={200}
              height={200}
              className={style.img}
            />
          </div>
          <div>
            {!session
              ? <Link className={style.signIn} href='/auth'>Sign In</Link>
              : <div className={style.menu}>

                <div>
                  <Link href={'/'}>Home </Link>
                </div>

                <div>
                  <Link href={`/cart?me=${user}`}>
                    <div className={style.cart}>
                      <FaShoppingCart /> {count}
                    </div>
                  </Link>
                </div>

                <div>
                  <Link href={`/profile?me=${user}`}> Profile</Link>
                </div>
              </div>
            }
          </div>
        </navbar>
      </div>
    </Fragment>
  )
}