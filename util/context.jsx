import { createContext, useContext, useState } from "react";

const Context = createContext(null)

export default function stateContext(){
  return useContext(Context)
}

export function ContextProvider(props){

  const { children } = props
  const [openOverlay, setOpenOverlay] = useState(false)

  return(
    <Context.Provider 
      value={{ openOverlay, setOpenOverlay }}
    >
      {children}
    </Context.Provider>
  )
}