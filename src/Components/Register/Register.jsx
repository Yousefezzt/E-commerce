import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Input from './Input'
import { useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'

export default function Register() {

  const navigate = useNavigate()
  const [errMes, setErrMes] = useState(null)
  const [success, setSuccess] = useState(null)
  const [spinner, setSpinner] = useState(false)


  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  async function registerNewUser(values) {
    setSpinner(true)

    setErrMes("")

    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      console.log(data.message);
      setSuccess(data.message)


      setTimeout(() => {
        navigate("/login")
      }, 2000);

    } catch (error) {

      setErrMes(error.response.data.message)

      console.log(error.response.data.message);
    }

    setSpinner(false)
  }




  let formikObj = useFormik({

    initialValues: user,

    onSubmit: registerNewUser,

    validate: (values) => {

      setErrMes(null)
      const error = {}


      if (values.name.length < 4 || values.name.length > 12) {
        error.name = "Name must be form 4 character to 12 characters"
      }

      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        error.email = "email invalid"
      }

      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        error.phone = "Phone in valid"
      }

      if (values.password.length < 6 || values.password.length > 12) {
        error.password = "Password must be form 6 character to 12 characters"
      }

      if (values.rePassword !== values.password) {
        error.rePassword = "Password and or Password doesn't match"
      }





      return error

    }




  })







  return (
    <div className='py-5 w-[75%] m-auto'>

      
      <div className='container m-auto'>

        {errMes ? <div className="alert alert-error text-slate-50">{errMes}</div> : ""}

        {success ? <div className="alert alert-success text-slate-50">{success}</div> : ""}


        <h2>Register Now:</h2>

        <form onSubmit={formikObj.handleSubmit} className='my-7  ' >

          <Input formikObj={formikObj} />

          <button  disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-success text-white'>
            {spinner ? (<FallingLines
              color="#fff"
              width="50"
              visible={true}
              ariaLabel="falling-circles-loading"
            />) : "Register"}

          </button>

        </form>

      </div>

    </div>

  )

}
