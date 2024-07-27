import React from 'react'

export default function InputLogin({ formikObj }) {
    return <>


        <label htmlFor="email">Email: </label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="email" placeholder='Email' className='from-current block border w-[80%] mb-3 p-2 ' />
        {formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-error w-[80%] ">{formikObj.errors.email}</div> : ""}

        <label htmlFor="password">Password: </label>
        <input onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password" placeholder='password' className='from-current block border w-[80%] mb-3 p-2 ' />
        {formikObj.errors.password && formikObj.touched.password ? <div className="alert alert-error w-[80%] ">{formikObj.errors.password}</div> : ""}


    </>
}
