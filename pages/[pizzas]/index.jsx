import Home from "@/components/home/home";
import ShowPizza from "@/components/pizzas/pizza";
import getPizza from "@/util/database/getPizza/get-pizza";

export default function Pizzas(props){

  const { pizzas } = props

  return(
    <Home 
      children={<ShowPizza data={pizzas}/>}
    />
  )
}

export async function getServerSideProps(props){

  const { pizzas } = props.params
  const pizzaList = await getPizza(pizzas)

  return{
    props: {
      pizzas : pizzaList
    }
  }
}