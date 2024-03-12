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

  async function sendOrderHandler(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const qty = formData.get('qty')

    console.log(qty)
  }

  let qty = []

  for(let i = 0; i < 10; i++){
    qty.push(i)
  }

  return (

    data?.map((item) => {

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
                <p>{item.status}</p>
                <p>R {Number(item.price).toFixed(2)}</p>

                <form action='#' onSubmit={sendOrderHandler} >
                  <select name='qty'>
                   {
                    qty.map((no) => (
                      <option>{no + 1}</option>
                    ))
                   }
                  </select>

                  <input type='submit' />
                </form>
              </div>

              <div className={style.bin}>
                <RiDeleteBin2Line />
              </div>
            </div>

          </div>
        </div>
      )
    })

  )
}