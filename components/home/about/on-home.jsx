import Image from 'next/image'
import motobike from '../../../public/home-page/7fcacecdc99bf625233bc7f2e5fe19e5.jpg'
import rockstarpizza from '../../../public/home-page/rockstarpizza.jpg'
import pizza from '../../../public/home-page/Screenshot 2024-03-18 035127.png'
import hotPizza from '../../../public/home-page/hotpizza.avif'
import deepDish from '../../../public/home-page/+.png'
import style from './on-home.module.css'
import Link from 'next/link'

const first = [motobike, rockstarpizza, pizza]

export default function AboutOnHome() {

  return (
    <div>
      <div className={style.first}>
        <h2>Pizza that Rocks!</h2>
        <p>Order & customize your perfect pizza for delivery or pickup.</p>

        <div>
          {
            first.map((img) => (
              <Image
                src={img}
                width={230}
                height={230}
                alt='IMG'
              />
            ))
          }
        </div>
      </div>

      <div className={style.orderNow}>
        <Link href={'/Classic%20Neapolitan%20Pizza%20Dough'}>
          <h1>Order now</h1>
          <Image 
            src={deepDish}
            alt='hot pizza'
            width={500}
            height={500}
            
          />
        </Link>
      </div>

      <div className={style.hotPizza}>
        <div>
          <Link href={'/Sicilian%20Pizza%20Dough'}>
          <h1>Click Here to Get Your Slice of Hot Pizza Bliss!</h1></Link>
          <p>Made with love, delivered hot. Order your pizza bliss now!</p>
        </div>

        <div>
          <Image 
            src={hotPizza}
            alt='hot pizza'
            width={500}
            height={700}
          />
        </div>
      </div>
    </div>
  )
}