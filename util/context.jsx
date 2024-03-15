import { createContext, useContext, useState } from "react";

const Context = createContext(null)

export default function stateContext(){
  return useContext(Context)
}

export function ContextProvider(props){

  const { children } = props
  const [openOverlay, setOpenOverlay] = useState(false)
  const [alert, setAlert] = useState('')

  return(
    <Context.Provider 
      value={{ alert, setAlert, openOverlay, setOpenOverlay }}
    >
      {children}
    </Context.Provider>
  )
}