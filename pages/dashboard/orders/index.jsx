import Orders from "@/components/dashboard/oders/order";
import getOrders from "@/util/database/dashboard/getOrders";

import DashboardLayout from "@/components/dashboard/layout";

export default function OrdersPage(props) {

  const { ordersData } = props

  return (
    <DashboardLayout>
      <div style={{
        paddingLeft: '200px',
        paddingRight: '200px',
        paddingTop: '10px'
      }}>
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