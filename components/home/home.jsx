import pizzaBase from "@/util/pizza-base";
import Image from "next/image";
import Link from "next/link";
import style from './home.module.css'

export default function Home({children}){

  return(
    <main className={style.main}>
      <h2>Choose Your Pizza Base</h2>
      <div className={style.pizzaBase}>
        {
          pizzaBase.map((item, index) => {
            return(
              <Link href={item.link} key={index}>
                <Image 
                  src={item.image}
                  width={200}
                  height={200}
                  alt='pizza'
                  className={style.img}
                />
                <h5>{item.name}</h5>
              </Link>
            )
          })
        }
      </div>
      
        <div className={style.children}>
          {children}
        </div>
    </main>
  )
}
