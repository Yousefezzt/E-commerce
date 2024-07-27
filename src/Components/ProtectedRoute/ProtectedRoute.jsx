import React, { useContext } from 'react'
import { authCon } from '../../context/Authentication'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRoute({ children }) {

    const { token } = useContext(authCon)

    if (token === null) {
        return <Login />
    }

    return <>
        {children}
    </>
}
