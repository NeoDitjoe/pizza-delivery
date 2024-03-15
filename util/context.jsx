import { createContext, useContext, useState } from "react";

const Context = createContext(null)

export default function stateContext(){
  return useContext(Context)
}

export function ContextProvider(props){

  const { children } = props
  const [openOverlay, setOpenOverlay] = useState(false)
  const [alert, setAlert] = useState('')
  const [address, setAddress] = useState(null)

  return(
    <Context.Provider 
      value={{ address, setAddress, alert, setAlert, openOverlay, setOpenOverlay }}
    >
      {children}
    </Context.Provider>
  )
}