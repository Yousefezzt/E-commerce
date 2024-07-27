import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext()


export default function CartContextProvider({ children }) {

    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartProduct, setCartProduct] = useState(null)
    const [cartID, setCartID] = useState(null)

    async function addProductToCart(productId) {

        try {

            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {

                "productId": productId
            },

                {
                    headers: { token: localStorage.getItem("ton") }
                }

            )

            getUserCart();

            return data;


        }
        catch (error) {
            console.log("Error", error);
        }
    }


    async function getUserCart() {
        try {

            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {

                headers: { token: localStorage.getItem("ton") }

            })

            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProduct(data.data.products)
            setCartID(data.data._id)


        }

        catch (error) {
            console.log("error", error);
        }
    }


    async function deleteItems(productId) {

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {

                headers: { token: localStorage.getItem("ton") }


            })

            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProduct(data.data.products)


            return data;
        }
        catch (error) {
            console.log("error", error);

        }


    }


    async function updateProduct(productId, count) {

        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                "count": count
            },
                {
                    headers: { token: localStorage.getItem("ton") }

                })


            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProduct(data.data.products)


            return data;

        } catch (error) {
            console.log("error", error);
        }

    }


    async function DeleteAll() {

        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {

                headers: { token: localStorage.getItem("ton") }


            })

            setNumOfCartItems(0)
            setTotalCartPrice(0)
            setCartProduct([])


            return data;
        }
        catch (error) {
            console.log("error", error);

        }


    }


    useEffect(() => {
        getUserCart()

    }, [])







    return <cartContext.Provider value={{
        getUserCart,
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        cartProduct,
        deleteItems,
        updateProduct,
        DeleteAll,
        cartID,
        setNumOfCartItems,
        setTotalCartPrice,
        setCartProduct,
    }}>
        {children}
    </cartContext.Provider>

}
