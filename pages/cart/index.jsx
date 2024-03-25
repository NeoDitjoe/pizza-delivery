import Cart from "@/components/cart/cart";
import getCartData from "@/util/database/cart/get-cart-data";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CartPage(props){

  const { data } = props

  const { data: session, status} = useSession()

  const router = useRouter()

  if(status === 'loading'){
    return <CircularProgress />
  }

  if(!session){
    router.push('/auth')
    return ''
  }

  return(
    <div>
      <Cart data = {data} />
    </div>
  )
}

export async function getServerSideProps({ query }){

  const { me } = query

  const { results } = await getCartData(me)

  return {
    props: {
      data: results
    }
  }
}