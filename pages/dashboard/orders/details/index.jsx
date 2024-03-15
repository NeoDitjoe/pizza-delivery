import DashboardLayout from "@/components/dashboard/layout";
import Address from "@/components/dashboard/oders/address";
import OrderDetails from "@/components/dashboard/oders/order-details";
import getOrders from "@/util/database/dashboard/getOrders";
import style from '../../../../components/dashboard/oders/order.module.css'

export default function Order(props) {

  const { orderDetails } = props

  return (
    <DashboardLayout>
      <div className={style.page}>
        <Address />
        <h4>Ordered</h4>
        <OrderDetails orderDetails={orderDetails} />
      </div>
    </DashboardLayout>

  )
}

export async function getServerSideProps({ query }) {

  const { id } = query

  const { orderDetails } = await getOrders(id)

  return {
    props: {
      orderDetails,
    }
  }

}