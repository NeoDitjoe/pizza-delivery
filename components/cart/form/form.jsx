import style from './form.module.css'
import { MdLockOutline } from "react-icons/md";

export default function Form(props) {

  const { totaPrice } = props

  return (

    <div>
      <form className={style.form}>
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
