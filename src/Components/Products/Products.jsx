import axios from 'axios';
import React, { useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Products() {
    const { addProductToCart } = useContext(cartContext);

    async function addProduct(id) {
        const res = await addProductToCart(id);
        if (res.status === "success") {
            toast.success(res.message, { duration: 1000 });
        }
    }

    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    const { data, isLoading } = useQuery("allProducts", getAllProducts, {
        refetchOnMount: false,
        
    });

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="color-ring-loading"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        );
    }

    return (
        <>

        <Helmet>

        <title>All Product</title>

        </Helmet>


            <div className="container mx-auto py-5">

                <HomeSlider />
                <CategorySlider />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {data?.data.data.map((item, idx) => {
                        return (
                            <div key={idx} className="bg-white shadow rounded-lg p-4">
                                <Link to={`/productDetails/${item.id}`}>
                                    <div className="product">
                                        <img className='w-full h-48 object-cover mb-2 rounded' src={item.imageCover} alt={item.title} />
                                        <p className='text-[#5DB067] font-medium mb-1'>{item.category.name}</p>
                                        <h5 className='text-lg font-semibold mb-1'>{item.title.split(" ").slice(0, 2).join(" ")}</h5>
                                        <div className="flex justify-between items-center">
                                            <p className='text-gray-700 font-medium '>{item.price} EGP</p>
                                            <span className="flex items-center">
                                                <i className="fa-solid fa-star text-yellow-300"></i>
                                                <span className='ml-1 text-gray-700'>{item.ratingsAverage}</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <button onClick={() => addProduct(item.id)} className='btn btn-success w-full mt-4 py-2 text-teal-50'>+ Add to Cart</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
