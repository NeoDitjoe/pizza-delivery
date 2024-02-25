import Dashboard from "@/components/dashboard/dashboard/dashboard";
import DashboardLayout from "@/components/dashboard/layout";
import getStock from "@/util/database/dashboard/getStock";


export default function DashboardPage(props) {

  const { stock } = props

  return (
    <DashboardLayout>
      <Dashboard 
        data={stock}
      />
    </DashboardLayout>
  )
}

export async function getServerSideProps(){

  const stock = await getStock()

  return{
    props: {
      stock
    }
  }
}