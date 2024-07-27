import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Payment() {

const navigate = useNavigate()
  const { cartID, setNumOfCartItems, setTotalCartPrice, setCartProduct } =
    useContext(cartContext);
  console.log("cartID", cartID);

  async function confirmCashPayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;

    const shippingAddress = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue
      }
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("ton") }
        }
      );

      if (data.status === "success") {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setCartProduct([]);
        navigate("/")

      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function confirmOnlinePayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;

    const shippingAddress = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue
      }
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("ton") },
          params: { url: "http://localhost:3000" }
        }
      );
      window.open(data.session.url, "_blank");


      if (data.status === "success") {

        navigate("/")

      }



    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <form className="my-7 w-[80%] m-auto ">
        <label htmlFor="" className="">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Phone"
          className="from-current   block border w-[100%]  mb-3 p-2 outline-none"
        />

        <label htmlFor="" className="">
          City
        </label>
        <input
          id="city"
          type="tel"
          placeholder="City"
          className="from-current   block border w-[100%]  mb-3 p-2 outline-none"
        />

        <label htmlFor="" className="">
          Details
        </label>
        <textarea
          id="details"
          type="tel"
          placeholder="Details"
          className="from-current   block border w-[100%]  mb-3 p-2 outline-none"
        ></textarea>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={confirmCashPayment}
            className="btn btn-primary"
          >
            Confirm cash Payment
          </button>
          <button
            type="button"
            onClick={confirmOnlinePayment}
            className="btn btn-success text-white"
          >
            Confirm Online Payment
          </button>
        </div>
      </form>
    </>
  );
}
