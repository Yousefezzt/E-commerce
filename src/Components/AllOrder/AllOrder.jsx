import axios from "axios";
import {jwtDecode} from "jwt-decode";
import React, { useEffect, useState } from "react";

export default function AllOrder() {
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const res = jwtDecode(localStorage.getItem("ton"));
    getUserOrders(res.id);
  }, []);

  async function getUserOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(data);
      setUserOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  if (!userOrders) {
    return <h1 className="text-center text-xl">Loading...</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {userOrders.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <div className="grid grid-cols-2 gap-4">
              {item.cartItems?.map((order) => (
                <div key={order.product.id} className="flex flex-col items-center">
                  <img
                    className="w-40 h-40 object-cover mb-2"
                    src={order.product.imageCover}
                    alt={order.product.name}
                  />
                  {/* <h3 className="text-lg font-semibold">Title: {order.product.title}</h3> */}
                  <p className="text-sm">Count: {order.count}</p>
                  <p className="text-sm">Price: {order.price}</p>
                </div>
              ))}
            </div>

            <p className="text-lg mt-4">
              Order sent to user with phone {item.shippingAddress.phone} and
              with details {item.shippingAddress.details} at{" "}
              {item.shippingAddress.city}
            </p>

            <h4 className="text-md font-semibold mt-2">
              Payment method: {item.paymentMethodType}
            </h4>

            <h4 className="text-md font-semibold mt-2">
              Total cart Price: {item.totalOrderPrice}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
