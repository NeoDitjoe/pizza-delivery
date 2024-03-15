import style from './order.module.css'

export default function Address() {

  let getAddress = localStorage.getItem("address")
  let address = JSON.parse(getAddress);

  if(!address?.address){
    return <h4 style={{ textAlign: 'center'}}>Pay and Collect</h4>
  }

  return (
    <div>
      <h4>Delivery address</h4>
      {address?.address?.map((item) => (
        <div className={style.address}>
          <div>
            <h5>Address:</h5>
            <p>{item.address}</p>
          </div>
          <div>
            <h5>Suburb:</h5>
            <p>{item.suburb}</p>
          </div>
          <div>
            <h5>Apartment:</h5>
            <p>{item.apartment}</p>
          </div>
          <div>
            <h5>City:</h5>
            <p>{item.city}</p>
          </div>
          <div>
            <h5>State:</h5>
            <p>{item.state}</p>
          </div>
          <div>
            <h5>Postcode:</h5>
            <p>{item.postcode}</p>
          </div>
          <div>
            <h5>Payment-status</h5>
            <p>{item.paymentStatus}</p>
          </div>
        </div>
      ))}
    </div>
  )
}