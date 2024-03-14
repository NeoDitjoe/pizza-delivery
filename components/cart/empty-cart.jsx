import { Backdrop } from "@mui/material";
import Image from "next/image";
import style from './cart.module.css'
import emptyPizzaBox from '../../public/2362491aea0ced8e46d5b276fe578783-removebg-preview.png'
import { useRouter } from "next/router";

export default function EmptyCart() {
  const router = useRouter()

  return (
    <Backdrop
      sx={{ color: 'black', background: 'transparent', marginTop: '60px', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div style={{ textAlign: 'center' }}>
        <div>
          <Image
            src={emptyPizzaBox}
            alt='empty'
            width={140}
            height={140}
          />
        </div>

        <div>
          <p>Your cart is empty</p>
        </div>

        <div>
          <button
            onClick={() => router.push('/Chicago Deep Dish Pizza Dough')}
            className={style.button}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Backdrop>
  )
}