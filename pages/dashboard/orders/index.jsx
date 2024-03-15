import getOrders from "@/util/database/dashboard/getOrders";
import style from '../../../components/dashboard/oders/order.module.css'
import DashboardLayout from "@/components/dashboard/layout";
import OrderList from "@/components/dashboard/oders/order-list";

export default function OrdersPage(props) {

  const { orderId } = props

  return (
    <DashboardLayout>
      <div className={style.page}>
        <OrderList orderList={orderId} />
      </div>
    </DashboardLayout>
  )
}

export async function getServerSideProps() {

  const { orderId } = await getOrders()

  return {
    props: {
      orderId,
    }
  }
}