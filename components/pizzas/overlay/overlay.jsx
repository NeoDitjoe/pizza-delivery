import stateContext from '@/util/context'
import style from './overlay.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { cheeseType, pizzaSauces, selectedPizza, veggies } from '@/util/pizzaOptions'
import { useRef, useState } from 'react'
import Select from 'react-select';
import { useSession } from 'next-auth/react'
import PostMethod from '@/util/postMethod'
import { CircularProgress } from '@mui/material'

export default function Overlay() {
  
  const { data: session } = useSession()
  const router = useRouter()
  const viggiesRef = useRef()
  
  const { setOpenOverlay, setAlert } = stateContext()
  const [selectedSauce, setSelectSauce] = useState('')
  const [selectedCheese, setSelectCheee] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)
  
  const selectedItem = selectedPizza(session, router)

  async function addToCartHandler(){
    if(!session){
      setAlert('please login to add to cart')
      return
    }

    await PostMethod('/api/dashboard/updateQty', {base: router.query.pizzas, cheese: selectedCheese, sauce: selectedSauce})

    const selectedVeggies = viggiesRef.current.props.value
    const cartItems = selectedPizza(session, router, selectedSauce, selectedCheese, selectedVeggies)

    try {
      setLoadingButton(true)
      const response = await PostMethod('/api/cart/add-to-cart', cartItems)

      if(response.message === 'success'){
        setAlert('added to cart')
        setLoadingButton(false)
      }

    } catch (error) {
      setAlert('failed attepmt! Could not add to cart!')
      setLoadingButton(false)
    }
  }

  return (
    <div className={style.backdrop}>

      <p className={style.close} onClick={() => {
        setOpenOverlay(false)
        router.push(selectedItem.base)
      }}
      >close
      </p>
      <Image
        src={selectedItem.image}
        alt={selectedItem.name}
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
        ref={viggiesRef}
      />

      <h3>{selectedItem.name}</h3>
      <p>{selectedItem.toppings}</p>
      <p>Size: {selectedItem.size}</p>

      <h3 className={style.option}>Add your favourite Sauce: </h3>
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

      <h3 className={style.option}>With your prefered Cheese: </h3>
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
        {loadingButton ? <CircularProgress size={'20px'}/> :'Add To Cart'}
      </button>
    </div>
  )
}