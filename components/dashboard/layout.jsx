import { CircularProgress } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function DashboardLayout(props) {

  const { children } = props

  const { data: session, status } = useSession()
  const router = useRouter()

  const isAdmin = session && session.user.email.admin

  useEffect(() => {
    if (session && !isAdmin) {
      router.push('/')
    }
  })

  if(status === 'loading'){
    return <CircularProgress />
  }

  return <div>{children}</div>
}
