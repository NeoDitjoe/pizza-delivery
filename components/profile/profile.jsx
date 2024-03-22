import { signOut, useSession } from 'next-auth/react'
import style from './profile.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import TrackOrders from './track-orders.jsx/order'
import deleteMethod from '@/util/deleteMethod'
import stateContext from '@/util/context'
import PostMethod from '@/util/postMethod'
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export default function UserProfile(props) {

  const { orderId, orderDetails } = props
  const { setAlert } = stateContext()

  const [deleteLoader, setDeleteLoader] = useState(false)
  const [newPassword, setNewPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [changePasswordLoader, setChangePasswordLoad ] = useState(false)

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

  async function changePasswordHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const password = formData.get('password')

    try {
      const response = await PostMethod('/api/profile/change-password', {email: router?.query.me, password})

      if(response.message === 'success'){
        setAlert('password is changed')
        setNewPassword(false)
      }
    } catch (error) {
      setAlert(error.message)
    }
  }

  async function deleteAccountHandler() {

    setDeleteLoader(true)

    try {
      await deleteMethod(`/api/profile/delete-account?email=${router?.query.me}`)

      setDeleteLoader(false)
      signOut()
      router.push('/')
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
        onClick={() => setNewPassword(true)}
      >Change Password</button>

      {
        newPassword
          ? <div className={style.form}>
            <form onSubmit={changePasswordHandler}>
              <input type={showPassword ? "text" : 'password'} name='password' />
              <span
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <RiEyeCloseLine/> : <RiEyeLine/>}
              </span>
              {changePasswordLoader ? <CircularProgress size={20}/> :<input type="submit" />}
            </form>

            <button onClick={() => setNewPassword(false)}>Cancel</button>
          </div>
          : ''
      }

      <button
        className={style.button}
        onClick={deleteAccountHandler}
        disabled={deleteLoader}
      >{deleteLoader ? <CircularProgress size={20} /> : 'Delete Account'}</button>

      <TrackOrders orderId={orderId} orderDetails={orderDetails} />
    </div>
  )
}