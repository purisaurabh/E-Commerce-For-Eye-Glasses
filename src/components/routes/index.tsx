import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import Home from "../pages/Home"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import ProductListing from "../pages/ProductListing"
import ProductDetails from "../pages/ProductDetails"
import Cart from "../pages/Cart"
import ErrorPage from "../pages/ErrorPage"
import Protected from "../../protectRoutes/authRoutes"
const Index = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        // <Protected authentication={true}>
                        <Home />
                        // </Protected>} />
                    }
                    />

                    <Route path="/products" element={
                        // <Protected authentication={true}>
                        <ProductListing />
                        // </Protected>
                    } />

                    <Route path="/products/:productId" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />


                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Index
