import { Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/auth/AuthContext";
import ShopProvider from "./contexts/shop/ShoppingCartContext";
import Navbar from './components/navbar/Navbar'
import Login from "./components/user/login/Login";
import CreateUser from "./components/user/create-user/CreateUser";
import Home from './components/home/Home'
import Products from './components/products/Products'
import ProductDetails from './components/products/ProductDetails'
import AboutUs from './components/about-us/AboutUs'
import Cart from "./components/cart/Cart"
import Checkout from "./components/checkout/Checkout";
import CheckoutFinish from "./components/checkout/CheckoutFinish";
import Footer from "./components/footer/Footer"
import './App.css'

function App() {
  return (
    <>
          <AuthProvider>
            <ShopProvider>
              <Navbar/>
              <Routes>
                <Route index path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/create-user" element={<CreateUser/>}/>
                <Route path="/shop" element={<Products type="All Products"/>}/>
                <Route path="/shop/men" element={<Products type="Men"/>}/>
                <Route path="/shop/women" element={<Products type="Women"/>}/>
                <Route path="/shop/kids" element={<Products type="Kids"/>}/>
                <Route path="/shop/sale" element={<Products type="Sale"/>}/>
                <Route path="/product/:productsid" element={<ProductDetails/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/checkout-finish" element={<CheckoutFinish/>}/>
              </Routes>
              <Footer/>
            </ShopProvider>
          </AuthProvider>
    </>
  )
}

export default App
