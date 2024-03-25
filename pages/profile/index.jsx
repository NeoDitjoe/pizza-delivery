import UserProfile from "@/components/profile/profile";
import trackOrder from "@/util/database/profile/track-order";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfilePage(props) {

  const { orderId, orderDetails } = props
  const { data: session, status} = useSession()

  const router = useRouter()

  if(status === 'loading'){
    return <CircularProgress />
  }

  if(!session){
    router.push('/auth')
    return ''
  }

  return (
    <div>
      <UserProfile orderId={orderId} orderDetails={orderDetails} />
    </div>
  )
}

export async function getServerSideProps({ query }){

  const { me } = query
  const { orderId, orderDetails } = await trackOrder(me) 

  return {
    props: {
      orderId,
      orderDetails
    }
  }
}