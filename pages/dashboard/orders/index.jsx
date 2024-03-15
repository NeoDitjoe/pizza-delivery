import getOrders from "@/util/database/dashboard/getOrders";
import style from '../../../components/dashboard/oders/order.module.css'

import DashboardLayout from "@/components/dashboard/layout";
import OrderList from "@/components/dashboard/oders/order-list";

export default function OrdersPage(props) {

  const { orderId, orderDetails } = props

  return (
    <DashboardLayout>
      <div className={style.page}>

        <OrderList orderList={orderId} orderDetails={orderDetails} />

      </div>
    </DashboardLayout>
  )
}

export async function getServerSideProps({query}) {

  const { id } = query

  const { orderDetails, orderId } = await getOrders(id)

  return {
    props: {
      orderId,
      orderDetails
    }
  }
}