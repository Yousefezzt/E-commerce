import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function Profile() {

  const [name, setName] = useState(null)

  useEffect(() => {
  const {name} = jwtDecode(localStorage.getItem("ton"))
  
  setName(name);

  }, [])

  if(name === null) {
    return <h1>Loading...</h1>
  }


  return (
    <h2>Welcome to {name}</h2>
  )
}
