import { signOut, useSession } from 'next-auth/react'
import style from './profile.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import TrackOrders from './track-orders.jsx/order'

export default function UserProfile(props) {

  const { orderId, orderDetails } = props

  const router = useRouter()
  const { data: session, status } = useSession()

  // useEffect(() => {
  //   if(!session){
  //     router.push('/auth')
  //   }
  // })

  // if(status === 'loading'){
  //   return <CircularProgress />
  // }

  // if(!session){
  //   return ''
  // }

  return (
    <div className={style.main}>
      <button
        className={style.button}
        onClick={() => signOut()}
      >Sign Out</button>

      <TrackOrders orderId={orderId} orderDetails={orderDetails} />
    </div>
  )
}