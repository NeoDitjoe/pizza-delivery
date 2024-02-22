import stateContext from '@/util/context'
import style from './overlay.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Overlay() {

  const { setOpenOverlay } = stateContext()
  const router = useRouter()

  return (
    <div className={style.backdrop}>
      <p className={style.close} onClick={() => {
        setOpenOverlay(false)
        router.push(router.query.pizzas)
      }}
      >close
      </p>
      <Image
        src={router.query.image}
        alt={router.query.name}
        width={300}
        height={300}
      />

      <h3>{router.query.name}</h3>
      <p>{router.query.toppings}</p>
      <p>Size: {router.query.size && router.query.size.split('-')[0]}</p>

      <button className={style.addToCart}>
        Add to cart
        Total cost: R {router.query.size && Number(router.query.size.split('-')[1]).toFixed(2)}
      </button>

      <div>

      </div>

    </div>
  )
}