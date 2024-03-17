import UserProfile from "@/components/profile/profile";
import trackOrder from "@/util/database/profile/track-order";

export default function ProfilePage(props) {

  const { orderId, orderDetails } = props

  console.log(orderDetails)

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