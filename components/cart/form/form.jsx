import style from './form.module.css'
import { MdLockOutline } from "react-icons/md";
import PostMethod from '@/util/postMethod';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import stateContext from '@/util/context';
import deleteMethod from '@/util/deleteMethod';

export default function Form(props) {

  const { totaPrice, data } = props
  const router = useRouter()
  const { setAlert } = stateContext()

  async function sendOrderHandler(e) {
    e.preventDefault()

    let handler = PaystackPop.setup({
      key: 'pk_test_522f7a6ef26ce82e8334520170b5dc448bffc012',
      email: router.query.me,
      amount: totaPrice.reduce((a, b) => a + b, 0).toFixed(2) * 100,
      currency: 'ZAR',
      onClose: function () {
        setAlert('Cancelled!');
      },
      callback: function (response) {
        let message = response.status;

        if (message === 'success') {
          placeOrder()
          deleteItems()
          router.reload()
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

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const address = formData.get('address')
    const suburb = formData.get('suburb')
    const apartment = formData.get('apartment')
    const city = formData.get('city')
    const state = formData.get('state')
    const postcode = formData.get('postcode')

    order.push({
      uniqueId: id,
      email: router.query.me,
      status: 'Order is sent',
      get: true,
      address: [
        {
          name,
          address,
          suburb,
          apartment,
          city,
          state,
          postcode,
          paymentStatus: 'successful',
          
        }
      ]
    })

    async function placeOrder() {
      try {
        const response = await PostMethod('/api/cart/place-order', order)

        if (response.message === 'success') {
          setAlert('Thank you for your order. check order status to track order')
        }
      } catch (error) {
        setAlert('Something went wrong! please contact us on +27 00 000 0000')
      }
    }

    async function deleteItems(){
      try {
        await deleteMethod(`/api/cart/place-order?customerEmail=${router?.query?.me}`)
      } catch (error) {
        setAlert(error.message)
      }
    }

  }

  return (

    <div>
      <form className={style.form} onSubmit={sendOrderHandler}>
        <div className={style.inputs}>

          <input name="name" placeholder="full name" required />
          <input name="phone" placeholder="phone" type='number' required />
          <input name="address" placeholder="Address" required />
          <input name="suburb" placeholder="suburb/town" required />
          <input name="apartment" placeholder="apartment number" />
          <input name="city" placeholder="City" required />
          <input name="state" placeholder="State" required />
          <input name="postcode" placeholder="Postcode" required />
        </div>

        <div className={style.placeOrder}>

          <p>Total: R {totaPrice?.reduce((a, b) => a + b, 0).toFixed(2)}</p>
          <button>
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
