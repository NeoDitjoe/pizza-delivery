import Cart from "@/components/cart/cart";
import getCartData from "@/util/database/cart/get-cart-data";

export default function CartPage(props){

  const { data } = props

  return(
    <div>
      <Cart data = {data} />
    </div>
  )
}

export async function getServerSideProps({ query }){

  const { me } = query

  const data = await getCartData(me)

  return {
    props: {
      data,
    }
  }
}