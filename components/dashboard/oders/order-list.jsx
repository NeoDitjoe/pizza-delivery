import stateContext from '@/util/context'
import PostMethod from '@/util/postMethod'
import { useState } from 'react'
import style from './order.module.css'
import { useRouter } from 'next/router'

export default function OrderList(props) {

  const { orderList } = props
  const { setAlert } = stateContext()
  const [disableButton, setDisableButton] = useState(false)
  const router = useRouter()

  async function updateStatusHandler(email, uniqueId, status) {

    try {
      setDisableButton(true)
      const response = await PostMethod('/api/dashboard/updateStatus', { email, uniqueId, status })

      if (response.message === 'success') {
        setAlert('Customer status is updated!')
        setDisableButton(false)
      }

    } catch (error) {
      setAlert('Failed to send status update!')
      setDisableButton(false)
    }
  }

  return (
    <div className={style.orders}>
      {
        orderList?.map((order) => {
          return (
            <div className={style.order}>
              <div>
                <div>
                  <h5>{order.email}</h5>
                  <button
                    className={style.viewButton}
                    onClick={() => {
                      router.push(`/dashboard/orders/details?id=${order.uniqueId}`)
                      let address = JSON.stringify(order)
                      localStorage.setItem("address", address)
                    }}
                  >View</button>
                </div>
                <div className={style.cart}>
                  <div>
                    <div>
                      <h4>Order Id</h4>
                      <p>{order.uniqueId}</p>
                    </div>
                    <div>
                      <h4>Order Status</h4>
                      <p>{order.status}</p>
                    </div>
                  </div>

                  <div className={style.status}>
                    <p>Update Customer:</p>

                    <div className={style.button}>
                      <button
                        disabled={
                          disableButton
                          || order.status === 'Order has been recieved'
                          || order.status === 'Order is in the Kitchen'
                          || order.status === 'Order is On The Way'
                        }
                        className={style.recieved}
                        onClick={() => updateStatusHandler(order.email, order.uniqueId, 'Order has been recieved')}
                      >Recieved
                      </button>

                      <button
                        disabled={
                          disableButton
                          || order.status === 'Order is in the Kitchen'
                          || order.status === 'Order is On The Way'
                        }
                        onClick={() => updateStatusHandler(order.email, order.uniqueId, 'Order is in the Kitchen')}
                        className={style.inKitchen}
                      >In Kitchen
                      </button>

                      <button
                        disabled={
                          disableButton
                          || order.status === 'Order is On The Way'
                        }
                        onClick={() => updateStatusHandler(order.email, order.uniqueId, 'Order is On The Way')}
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