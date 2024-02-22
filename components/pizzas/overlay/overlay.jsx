import stateContext from '@/util/context'
import style from './overlay.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { cheeseType, pizzaSauces, veggies } from '@/util/pizzaOptions'
import { useEffect, useState } from 'react'
import Select from 'react-select';
import { useSession } from 'next-auth/react'

export default function Overlay() {

  const { data: session } = useSession()
  const router = useRouter()

  const { setOpenOverlay } = stateContext()
  const [selectedSauce, setSelectSauce] = useState('')
  const [selectedCheese, setSelectCheee] = useState('')

  async function addToCartHandler(){
    if(!session){
      alert('please login to add to cart')
      return
    }
  }

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

      <Select
        defaultValue={[veggies[1], veggies[3]]}
        isMulti
        name="colors"
        options={veggies}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder='Select your veggies'
      />

      <h3>{router.query.name}</h3>
      <p>{router.query.toppings}</p>
      <p>Size: {router.query.size && router.query.size.split('-')[0]}</p>

      <h3 className={style.option}>Pick your favourite sauce: </h3>
      <div className={style.sauces}>
        {
          pizzaSauces.map((sauce) => (
            <p
              onClick={() => {
                setSelectSauce(sauce)
              }}
              className={selectedSauce === sauce && style.selected}
            >{sauce}</p>
          ))
        }
      </div>

      <h3 className={style.option}>which Cheese would you like ? </h3>
      <div className={style.sauces}>
        {
          cheeseType.map((sauce) => (
            <p
              onClick={() => {
                setSelectCheee(sauce)
              }}
              className={selectedCheese === sauce && style.selected}
            >{sauce}</p>
          ))
        }
      </div>

      <br />

      <button 
        onClick={addToCartHandler}
        className={style.addToCart}>
        Add To Cart
      </button>
    </div>
  )
}