import { React, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authCon } from '../../context/Authentication'
import { cartContext } from '../../context/CartContext'
import logoFresh from "../../fresh.svg";

export default function Navbar() {

    const { numOfCartItems } = useContext(cartContext)



    const navigate = useNavigate()

    const { token, setToken } = useContext(authCon)



    function logout() {
        localStorage.removeItem("ton")
        setToken(null)
        navigate("/login")
    }

    return <>
        <div className="navbar bg-base-200    ">
            <div className="flex-1 ml-[50px] ">
                <a className=" w-[15%]">
                <img src={logoFresh}  alt="momo" />
                </a>
                <ul className="menu menu-horizontal relative ">
                    {token ?
                        <>
                            <li>
                                <Link to={"/products"} >Products</Link>
                            </li>
                            <li >
                                <Link className='relative' to={"/cart"}>
                                    Cart
                                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 badge rounded-full bg-red-700 text-white">
                                        {numOfCartItems}
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/allorders"}>All Orders</Link>
                            </li>
                        </>
                        : ""}
                </ul>
            </div>

            <div className="flex-none mr-[50px] ">
                <ul className="menu menu-horizontal items-center px-1 container mx-auto">
                    <li className=' inline '>
                        <i className='p-2  fa-brands  fa-facebook'></i>
                        <i className='p-2  fa-brands  fa-twitter'></i>
                        <i className='p-2  fa-brands fa-linkedin'></i>
                        <i className='p-2  fa-brands fa-whatsapp'></i>
                    </li>
                    {token ? "" :
                        <>
                            <li>
                                <Link to={"/Login"}>Login</Link>
                            </li>
                            <li>
                                <Link to={"/register"}>Register</Link>
                            </li>
                        </>
                    }
                    {token ? <>
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li>
                            <span onClick={logout} className='cursor-pointer' >Logout</span>
                        </li>
                    </> : ""}
                </ul>
            </div>
        </div>
    </>
}
