import { Fragment } from "react";
import Navbar from "./header/navbar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import style from './wrapper.module.css'
import stateContext from "@/util/context";

export default function Wrapper(props) {

  const { children } = props
  const { alert, setAlert } = stateContext()

  if(alert){

    setTimeout(() => {
      setAlert('')
    }, 3300);
  }

  return (
    <div className={inter.className}>
      <Navbar />
      <div className={style.children}>
        {children}
      </div>
      {alert && <p className={style.alert}>{alert}</p>}
      <div className={style.footer}>
      copyright © 2024 - All right reserved by Pizza4Real
      </div>
    </div>
  )
}