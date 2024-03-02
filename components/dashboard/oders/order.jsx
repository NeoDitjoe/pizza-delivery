
export default function Orders(props) {

  const { orders } = props
  return (
    <div>
      {
        orders?.map((order) => {
          return (
            <div>
              <div>
                <h5>{order.user}</h5>
                <div>
                  <div>
                    <p>{order.base}</p>
                    <p>{order.name}</p>
                    <div>
                      <p>Sauce</p>
                      <p>{order.sauce}</p>
                    </div>

                    <div>
                      <p>Cheese</p>
                      <p>{order.cheese}</p>
                    </div>

                    <div>
                      <p>Veggies</p>
                      {order.veggies.join(', ')}
                    </div>
                  </div>

                  <div>
                    buttons
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