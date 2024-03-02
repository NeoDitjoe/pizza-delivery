import Orders from "@/components/dashboard/oders/order";
import getOrders from "@/util/database/dashboard/getOrders";
import style from '../../../components/dashboard/oders/order.module.css'

import DashboardLayout from "@/components/dashboard/layout";

export default function OrdersPage(props) {

  const { ordersData } = props

  return (
    <DashboardLayout>
      <div className={style.page}>
        <Orders
          orders={ordersData}
        />

      </div>
    </DashboardLayout>
  )
}

export async function getServerSideProps() {

  const ordersData = await getOrders()

  return {
    props: {
      ordersData
    }
  }
}