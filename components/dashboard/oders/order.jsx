import stateContext from '@/util/context'
import style from './order.module.css'
import PostMethod from '@/util/postMethod'

export default function Orders(props) {

  const { orders } = props
  const { setAlert } = stateContext()

  async function updateStatusHandler(username, uniqueId, status) {

    try {
      const response = await PostMethod('/api/dashboard/updateStatus', {username, uniqueId, status})

      if(response.message === 'success'){
        setAlert('Customer status is updated!')
      }

    } catch (error) {
      setAlert('Failed to send status update!')
    }
  }

  return (
    <div className={style.orders}>
      {
        orders?.map((order) => {
          return (
            <div className={style.order}>
              <div>
                <h5>{order.username}</h5>
                <div className={style.cart}>
                  <div>
                    <p>{order.base}</p>
                    <p>{order.name}</p>

                    <div className={style.custom}>
                      <div>
                        <p className={style.heading}>Sauce</p>
                        <p>{order.sauce}</p>
                      </div>

                      <div>
                        <p className={style.heading}>Cheese</p>
                        <p>{order.cheese}</p>
                      </div>

                      <div>
                        <p className={style.heading}>Veggies</p>
                        <p>{order.veggies.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className={style.status}>
                    <p>Update Customer:</p>

                    <div className={style.button}>
                      <button
                        className={style.recieved}
                        onClick={() => updateStatusHandler(order.username, order.uniqueId, 'Your order has been recieved')}
                      >Recieved
                      </button>

                      <button
                        onClick={() => updateStatusHandler(order.username, order.uniqueId, 'Your order is in the Kitchen')}
                        className={style.inKitchen}
                      >In Kitchen
                      </button>

                      <button
                        onClick={() => updateStatusHandler(order.username, order.uniqueId, 'Your order is On The Way')}
                        className={style.onTheWay}
                      >On The Way
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}