import { Fragment } from "react";
import Navbar from "./header/navbar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import style from './wrapper.module.css'

export default function Wrapper(props) {

  const { children } = props

  return (
    <div className={inter.className}>
      <Navbar />
      <div className={style.children}>
        {children}
      </div>
    </div>
  )
}