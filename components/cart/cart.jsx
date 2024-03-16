import style from './cart.module.css'
import EmptyCart from './empty-cart'
import Image from 'next/image'
import { RiDeleteBin2Line } from "react-icons/ri";
import Form from './form/form';
import { Backdrop } from '@mui/material';
import { useRef, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import PostMethod from '@/util/postMethod';

export default function Cart(props) {
  const { data } = props
  const qtyRef = useRef()
  const [checkout, setCheckout] = useState(false)

  if (!data.length > 0) {
    return (
      <EmptyCart />
    )
  }

  let totaPrice = []

  // async function qtyHandler(id, price) {

  //   const qty = qtyRef.current.value
  //   await PostMethod('/api/cart/update-qty', {id: id , price: Number(price) * qty})
  // }

  let qty = []

  for (let i = 0; i < 10; i++) {
    qty.push(i)
  }

  return (

    <div className={style.main}>
      {
        data?.map((item) => {

          totaPrice.push(Number(item.price))
          const [priceUpdate, setPriceUpdate] = useState(item.price)

          return (
            <div className={style.container}>
              <div className={style.afterContainer}>
                <div className={style.details} >

                  <div>
                    <Image
                      src={item.image}
                      alt='image'
                      width={165}
                      height={165}
                      style={{ padding: '5px' }}
                    />
                  </div>

                  <div>
                    <h3>{item.base}</h3>
                    <h4>{item.size} {item.name}</h4>
                    {item.cheese && <p>Cheese: {item.cheese}</p>}
                    {item.sauce && <p>Sauce: {item.sauce}</p>}
                  </div>

                </div>

                <div className={style.price}>
                  <div>
                    <p>R {Number(priceUpdate).toFixed(2)}</p>

                    <form action='#' onChange={async () => {
                      const qty = qtyRef.current.value
                      await PostMethod('/api/cart/update-qty',
                        {
                          id: item.id, price: Number(item.originalPrice) * qty
                        })
                      setPriceUpdate(Number(item.originalPrice) * qty)
                    }} >
                      <select ref={qtyRef}>
                        <option>{item.price / item.originalPrice}</option>
                        {
                          qty.map((no) => (
                            <option>{no + 1}</option>
                          ))
                        }
                      </select>

                    </form>
                  </div>

                  <button className={style.bin}>
                    <RiDeleteBin2Line />
                  </button>
                </div>

              </div>
            </div>
          )
        })
      }
      <div className={style.placeOrder}>

        <p>Total: R {totaPrice.reduce((a, b) => a + b, 0).toFixed(2)}</p>
        <button
          onClick={() => setCheckout(true)}
        >
          Proceed to Checkout
        </button>
      </div>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={checkout}
      >
        <div>
          <button
            className={style.closeForm}
            onClick={() => setCheckout(false)}
          >
            <IoCloseSharp
              size={30}
            />
          </button>

          <Form totaPrice={totaPrice} data={data} />
        </div>

      </Backdrop>

      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  )
}