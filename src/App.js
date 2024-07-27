import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Authentication from "./context/Authentication";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import AllOrder from "./Components/AllOrder/AllOrder";
import { Offline } from "react-detect-offline";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          )
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          )
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "productDetails/:id",
          element: (
            <ProductsDetails>
              {" "}
              <Register />{" "}
            </ProductsDetails>
          )
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          )
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          )
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <AllOrder />{" "}
            </ProtectedRoute>
          )
        },
        {
          path: "payment",
          element: (
            <ProtectedRoute>
              {" "}
              <Payment />{" "}
            </ProtectedRoute>
          )
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          )
        },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  let clientQuery = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={clientQuery}>
        <CartContextProvider>
          <Authentication>
            <RouterProvider router={myRouter} />
          </Authentication>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>

      <Offline>
        <div className="flex justify-center items-start min-h-screen">
          <h1 className="mt-4 bg-gray-800 text-white text-center p-4 rounded">
            opse..you are offline now.
          </h1>
        </div>
      </Offline>
    </div>
  );
}

export default App;
