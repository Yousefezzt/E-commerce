import React, { useContext } from 'react';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const { DeleteAll, updateProduct, numOfCartItems, totalCartPrice, cartProduct, deleteItems, } = useContext(cartContext);

    const navigate = useNavigate()

    async function updateCount(id, count) {
        await updateProduct(id, count)
    }


    async function RemoveAll() {
        const res = await DeleteAll()
        if (res.message === "success") {
            navigate('/products')
        }
    }



    if (!cartProduct) {
        return <h1>Loading</h1>
    }


    async function deleteElement(id) {

        const res = await deleteItems(id)

        if (res.status === "success") {
            toast.success("Product Remove")
        } else {
            toast.error("Error")

        }
    }



    return (
        <div className='container mx-auto bg-[#f3f3f39c] my-5 p-5 rounded-lg'>

            <h2 className='text-2xl font-semibold mb-4'>Shop Cart:</h2>
            <h4 className='font-semibold text-lg'>Total Items : <span className='text-[#5DB067]'>{numOfCartItems}</span> </h4>
            <h4 className=' text-xl mb-4'>Total Cart Price: $ <span className='text-[#5DB067] text-xl'>{totalCartPrice}</span> </h4>
            
            <div className='flex justify-between items-center'>
            <button onClick={RemoveAll} className='btn btn-error text-white'>DeleteAll</button>
            <Link to={"/payment"} className='btn btn-success text-white'>Confirm Payment</Link>
            

            </div>


            {cartProduct.map((item) => {
                return (
                    <div key={item.product.id} className="flex flex-col sm:flex-row justify-between items-center py-5 border-b border-blue-400">
                        <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                            <img className='w-full sm:w-20' src={item.product.imageCover} alt={item.product.title} />
                        </div>
                        <div className="w-full sm:w-1/2 text-center sm:text-left mb-4 sm:mb-0">
                            <h4 className='text-lg font-medium'>Title: {item.product.title}</h4>
                            <h5 className='text-md '>Price: $ <span className='text-[#31A633]'>{item.price}</span> </h5>
                            <button onClick={() => deleteElement(item.product.id)} className='text-md btn btn-error text-white '>Remove</button>
                        </div>
                        <div className="w-full sm:w-1/4 flex justify-center sm:justify-end items-center">
                            <button onClick={() => updateCount(item.product.id, item.count + 1)} className='btn btn-outline-success  w-8 h-8 flex justify-center items-center text-xl'>+</button>
                            <span className='px-3'>{item.count}</span>
                            <button onClick={() => updateCount(item.product.id, item.count - 1)} className='btn btn-outline-success w-8 h-8 flex justify-center items-center text-xl'>-</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
