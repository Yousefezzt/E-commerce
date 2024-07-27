import { createContext, useEffect, useState } from "react";

export const authCon = createContext()


export default function Authentication({ children }) {

  const [token, setToken] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("ton") !== null) {
      setToken(localStorage.getItem("ton"))
    }
  })


  return <authCon.Provider value={{ token, setToken }}>
    {children}

  </authCon.Provider>
}
