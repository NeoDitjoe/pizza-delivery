import Home from "@/components/home/home";
import Head from "next/head";


export default function HomePage() {
  return (
    <main>
      <Head>
        <meta name="description" content="Rock your taste buds with [Shop Name] Pizza! Our 
        app lets you order delicious, customizable pizzas for delivery or quick pickup 
        at locations across South Africa. Choose your crust, cheese, veggies, and sauce 
        to create your perfect slice. Order now and experience pizza that rocks!"
        />

        <meta name="keywords"
          content="Pizza App South Africa,
            Pizza Delivery South Africa,
            Order Pizza Online South Africa,
            Customize Pizza Online South Africa,
            Build Your Own Pizza South Africa,
            Pizza Takeaway App South Africa,
            Collect Pizza Order South Africa,
            [Shop Name] Pizza App"
        />
      </Head>
      <Home />
    </main>
  );
}
