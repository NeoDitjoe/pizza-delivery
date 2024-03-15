import { useRouter } from 'next/router'
import style from './cart.module.css'
import EmptyCart from './empty-cart'
import Image from 'next/image'
import { RiDeleteBin2Line } from "react-icons/ri";
import PostMethod from '@/util/postMethod';
import { v4 as uuidv4 } from 'uuid';

export default function Cart(props) {
  const { data } = props
  const router = useRouter()

  if (!data.length > 0) {
    return (
      <EmptyCart />
    )
  }

  let totaPrice = []

  function qtyHandler(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const qty = formData.get('qty')
  }

  async function sendOrderHandler() {

    let handler = PaystackPop.setup({
      key: 'pk_test_522f7a6ef26ce82e8334520170b5dc448bffc012',
      email: router.query.me,
      amount: totaPrice.reduce((a, b) => a + b, 0).toFixed(2) * 100,
      currency: 'ZAR',
      onClose: function () {
        alert('Window closed.');
      },
      callback: function (response) {
        let message = response.status;

        if(message === 'success'){
          placeOrder()
        }
      }
    });

    handler.openIframe();

    const id = uuidv4()

    function addId(arr) {
      for (let item of arr) {
        item.uniqueId = id;
      }
      return arr;
    }
    
    const modifiedOrder = addId(data);

    const order = []
    order.push(...modifiedOrder)

    order.push({
      uniqueId: id, 
      email: router.query.me, 
      status: 'Order is sent',
      get: true 
    })
    


    async function placeOrder() {
      try {
        const response = await PostMethod('/api/cart/place-order', order)
  
        if( response.message === 'success'){
          alert('success')
        }
      } catch (error) {
        alert('Something went wrong! please contact us on +27 00 000 0000')
      }
    }


  }

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
                    <p>R {Number(item.price).toFixed(2)}</p>

                    <form action='#' onSubmit={qtyHandler} >
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
        <button
          onClick={sendOrderHandler}
        >
          Place Order
        </button>
      </div>
      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  )
}