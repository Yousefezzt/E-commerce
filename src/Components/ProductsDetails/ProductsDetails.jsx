import axios from "axios";
import { useContext, useState } from "react";
import { ColorRing, DNA, InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductsDetails() {
  const { addProductToCart, setCartProducts } = useContext(cartContext);

  const { id } = useParams();

  async function addProduct(id) {
    const res = await addProductToCart(id);
    if (res.status === "success") {
      toast.success(res.message, { duration: 1000 });
      setCartProducts(res.numOfCartItems);
    } else {
      toast.error(res.message, { duration: 1000 });
    }
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery("productDetails", getProductDetails);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 items-center justify-center">
          <Helmet>
            <title>
              {data.data.data.title.split(" ").slice(0, 2).join(" ")}
            </title>
          </Helmet>

          <div className="img">
            <img className="w-[60%]" src={data.data.data.imageCover} alt="" />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-center">{data.data.data.title}</h2>

            <h6 className="text-center">{data.data.data.description}</h6>

            <p className="w-24 bg-green-600 rounded-md text-center my-auto text-yellow-50">
              {data.data.data.price} $
            </p>

            <button
              onClick={() => addProduct(data.data.data.id)}
              className="btn btn-success w-[100%] my-2 text-teal-50"
            > + Add Prodcut</button>
          </div>
        </div>
      </div>
    </div>
  );
}
