import Orders from "@/components/dashboard/oders/order";
import getOrders from "@/util/database/dashboard/getOrders";

import DashboardLayout from "@/components/dashboard/layout";

export default function OrdersPage(props){

  const { ordersData }  = props

  return(
    <DashboardLayout>
      <Orders 
        orders={ordersData}
      />
    </DashboardLayout>
  )
}

export async function getServerSideProps(){

  const ordersData = await getOrders()

  return{
    props: {
      ordersData
    }
  }
}