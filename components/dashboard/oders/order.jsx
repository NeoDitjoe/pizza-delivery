import style from './order.module.css'

export default function Orders(props) {

  const { orders } = props
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
                      <button className={style.recieved}>Recieved</button>
                      <button className={style.inKitchen}>In Kitchen</button>
                      <button className={style.onTheWay}>On The Way</button>
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