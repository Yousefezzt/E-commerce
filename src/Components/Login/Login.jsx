import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import InputLogin from './InputLogin'
import { authCon } from '../../context/Authentication'

export default function Login() {

  const { setToken } = useContext(authCon)

  const navigate = useNavigate()
  const [errMes, setErrMes] = useState(null)
  const [success, setSuccess] = useState(null)
  const [spinner, setSpinner] = useState(false)


  let user = {
    name: "",
    password: "",
  }
  async function LoginNewUser(values) {
    setSpinner(true)

    setErrMes("")

    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      console.log(data.token);
      setSuccess("Welcome Back")
      localStorage.setItem("ton", data.token)
      setToken(data.token)

      setTimeout(() => {
        navigate("/products")
      }, 2000);

    } catch (error) {

      setErrMes(error.response.data.message)

      console.log(error.response.data.message);
    }

    setSpinner(false)
  }




  let formikObj = useFormik({

    initialValues: user,

    onSubmit: LoginNewUser,

    validate: (values) => {

      setErrMes(null)
      const error = {}



      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        error.email = "email invalid"
      }


      if (values.password.length < 6 || values.password.length > 12) {
        error.password = "Password must be form 6 character to 12 characters"
      }

      return error

    }




  })







  return (
    <div className='py-5 w-[75%] m-auto'>

      <div className='container m-auto'>

        {errMes ? <div className="alert alert-error text-slate-50">{errMes}</div> : ""}

        {success ? <div className="alert alert-success text-slate-50">{success}</div> : ""}


        <h2>Login Now:</h2>

        <form onSubmit={formikObj.handleSubmit} className='my-7  ' >

          <InputLogin formikObj={formikObj} />

          <button disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-success text-white'>
            {spinner ? (<FallingLines
              color="#fff"
              width="50"
              visible={true}
              ariaLabel="falling-circles-loading"
            />) : "Login"}

          </button>

        </form>

      </div>

    </div>

  )

}
