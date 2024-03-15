import Orders from "@/components/dashboard/oders/order";
import getOrders from "@/util/database/dashboard/getOrders";
import style from '../../../components/dashboard/oders/order.module.css'

import DashboardLayout from "@/components/dashboard/layout";
import OrderList from "@/components/dashboard/oders/orderList";

export default function OrdersPage(props) {

  const { orderId } = props

  return (
    <DashboardLayout>
      <div className={style.page}>
        {/* <Orders
          orders={orderDetails}
        /> */}

        <OrderList orderList={orderId} />

      </div>
    </DashboardLayout>
  )
}

export async function getServerSideProps() {

  const { orderDetails, orderId} = await getOrders()

  return {
    props: {
      orderId
    }
  }
}