import style from './form.module.css'
import { MdLockOutline } from "react-icons/md";
import PostMethod from '@/util/postMethod';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

export default function Form(props) {

  const { totaPrice, data } = props
  const router = useRouter()

  async function sendOrderHandler(e) {
    e.preventDefault()

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

        if (message === 'success') {
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

        if (response.message === 'success') {
          alert('success')
        }
      } catch (error) {
        alert('Something went wrong! please contact us on +27 00 000 0000')
      }
    }

  }


  return (

    <div>
      <form className={style.form} onSubmit={sendOrderHandler}>
        <div className={style.inputs}>
     
          <input name="address" placeholder="full name" required />
          <input name="address" placeholder="phone" type='number' required />
          <input name="address" placeholder="Address" required />
          <input name="apartment" placeholder="suburb/town" required />
          <input name="apartment" placeholder="apartment number" reqired />
          <input name="city" placeholder="City" required />
          <input name="state" placeholder="State" required />
          <input name="postcode" placeholder="Postcode" required />
        </div>

        <div className={style.placeOrder}>

          <p>Total: R {totaPrice?.reduce((a, b) => a + b, 0).toFixed(2)}</p>
          <button
            // onClick={() => /* sendOrderHandler */ setCheckout(true)}
          >
            Checkout
          </button>
          <div className={style.secure}>
            <MdLockOutline />
            <p>Secure Checkout</p>
          </div>
        </div>

      </form>
    </div>
  )
}
