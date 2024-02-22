import stateContext from '@/util/context'
import style from './overlay.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { pizzaSauces } from '@/util/pizzaOptions'
import { useState } from 'react'

export default function Overlay() {

  const { setOpenOverlay } = stateContext()
  const [ selectedSauce, setSelectSauce ] = useState('')
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
        className={style.img}
      />

      <h3>{router.query.name}</h3>
      <p>{router.query.toppings}</p>
      <p>Size: {router.query.size && router.query.size.split('-')[0]}</p>


      <div className={style.sauces}>
        {
          pizzaSauces.map((sauce) => (
              <p
                onClick={() => {
                  setSelectSauce(sauce)
                }}
                className={selectedSauce === sauce && style.selectedSauce}
              >{sauce}</p>
          ))
        }
      </div>

      <button className={style.addToCart}>
        Cost: R {router.query.size && Number(router.query.size.split('-')[1]).toFixed(2)}
      </button>
    </div>
  )
}