import { useRouter } from 'next/router'
import style from './cart.module.css'
import EmptyCart from './empty-cart'
import Image from 'next/image'
import { RiDeleteBin2Line } from "react-icons/ri";

export default function Cart(props) {
  const { data } = props
  const router = useRouter()

  console.log(data)

  if (!data.length > 0) {
    return (
      <EmptyCart />
    )
  }

  async function sendOrderHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const qty = formData.get('qty')

    console.log(qty)
  }

  let totaPrice = []
  let qty = []

  for (let i = 0; i < 10; i++) {
    qty.push(i)
  }

  return (

    <div className={style.main}>
      {
        data?.map((item) => {

          totaPrice.push(Number(item.price))
          
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
                    <p>Status: {item.status}</p>
                    <p>R {Number(item.price).toFixed(2)}</p>

                    <form action='#' onSubmit={sendOrderHandler} >
                      <select name='qty'>
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
        <button>
          Place Order
        </button>
      </div>
    </div>
  )
}