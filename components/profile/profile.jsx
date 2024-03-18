import { signOut, useSession } from 'next-auth/react'
import style from './profile.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import TrackOrders from './track-orders.jsx/order'
import deleteMethod from '@/util/deleteMethod'
import stateContext from '@/util/context'

export default function UserProfile(props) {

  const { orderId, orderDetails } = props
  const { setAlert } = stateContext()

  const [deleteLoader, setDeleteLoader] = useState(false)

  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!status === 'loading' && !session) {
      router.push('/auth')
    }
  })

  if (status === 'loading') {
    return <CircularProgress />
  }

  if (!session) {
    return ''
  }

  async function deleteAccountHandler() {

    setDeleteLoader(true)

    try {
      await deleteMethod(`/api/profile/delete-account?email=${router?.query.me}`)

      setDeleteLoader(false)
      router.push('/')
      signOut()
    } catch (error) {
      setAlert(error.message)
      setDeleteLoader(false)
    }
  }

  return (
    <div className={style.main}>
      <button
        className={style.button}
        onClick={() => signOut()}
      >Sign Out</button>

      <button
        className={style.button}
        onClick={() => null}
      >Change Password</button>

      <button
        className={style.button}
        onClick={deleteAccountHandler}
        disabled={deleteLoader}
      >{deleteLoader ? <CircularProgress size={20} /> : 'Delete Account'}</button>

      <TrackOrders orderId={orderId} orderDetails={orderDetails} />
    </div>
  )
}