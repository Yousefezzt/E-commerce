import React from 'react'

export default function Input({formikObj}) {

  return <>

    <label htmlFor="name">Name: </label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' type="text" placeholder='UserName' className='from-current   block border w-[80%] mb-3 p-2 ' />
    {formikObj.errors.name && formikObj.touched.name ? <div className="alert alert-error w-[80%] ">{formikObj.errors.name}</div> : ""}

    <label htmlFor="email">Email: </label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="email" placeholder='Email' className='from-current block border w-[80%] mb-3 p-2 ' />
    {formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-error w-[80%] ">{formikObj.errors.email}</div> : ""}

    <label htmlFor="password">Password: </label>
    <input onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password" placeholder='password' className='from-current block border w-[80%] mb-3 p-2 ' />
    {formikObj.errors.password && formikObj.touched.password ? <div className="alert alert-error w-[80%] ">{formikObj.errors.password}</div> : ""}

    <label htmlFor="rePassword">RePassword: </label>
    <input onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword' type="password" placeholder='Password' className='from-current block border w-[80%] mb-3 p-2 ' />
    {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className="alert alert-error w-[80%] ">{formikObj.errors.rePassword}</div> : ""}

    <label htmlFor="phone">Phone: </label>
    <input onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' type="tel" placeholder='phone' className='from-current block border w-[80%] mb-3 p-2 ' />
    {formikObj.errors.phone && formikObj.touched.phone ? <div className="alert alert-error w-[80%] ">{formikObj.errors.phone}</div> : ""}


  </>
}
