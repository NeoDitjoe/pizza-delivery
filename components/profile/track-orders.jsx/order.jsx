import style from './order.module.css'

export default function TrackOrders(props) {

  const { orderId, orderDetails } = props

  return (
    <div className={style.container}>
      { orderId.length > 0 && <h1>Track My Order</h1>}
      {
        orderId?.map((order) => {

          return (
            <div className={style.cart}>
              <h5>order id</h5>
              <p>{order.uniqueId}</p>
              <h5>Status</h5>
              <p>{order.status}</p>

              <div>
                {
                  orderDetails?.map((details) => {
                    if (order.uniqueId === details.uniqueId) {
                      return (
                        <div className={style.order}>
                          <h5>{details.name}</h5>
                          <p>R {Number(details.price).toFixed(2)}</p>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}