import React, { useContext } from 'react'
import { authCon } from '../../context/Authentication'

export default function Brands() {
  const { token } = useContext(authCon)


 

  return (
    <h1 className=' text-primary '>Brands</h1>
  )
}
