import { useRouter } from 'next/router'
import style from './cart.module.css'
import Backdrop from '@mui/material/Backdrop';
import Image from 'next/image';
import emptyPizzaBox from '../../public/2362491aea0ced8e46d5b276fe578783-removebg-preview.png'

export default function Cart(props) {
  const { data } = props
  const router = useRouter()

  console.log(data)

  if (!data.length > 0) {
    return (
      <div>

        <Backdrop
          sx={{ color: 'black', background: 'transparent', marginTop: '60px', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <div style={{ textAlign: 'center'}}>
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
      </div>
    )
  }

  return (
    'user cart'
  )
}