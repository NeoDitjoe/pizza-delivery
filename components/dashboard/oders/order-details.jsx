import style from './order.module.css'


export default function OrderDetails(props) {

  const { orderDetails } = props
  return (
    <div className={style.orders}>
      {
        orderDetails?.map((order) => {
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
                        <p>{order.veggies?.join(', ')}</p>
                      </div>
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