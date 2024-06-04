import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useShop } from "../../../contexts/shop/ShopContext";
import Order from "./Order";
import axios from "axios";

function UserProfile() {
    const auth = useAuth();
    const shop = useShop();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const response = await axios.post('http://localhost:8800/orders/search', {email: auth.user.email});
                setOrders([...response.data])
            } catch(err) {
                console.log(err);
            }
        }
        fetchOrders();
    }, [auth.user.email, orders])


    const handleLogOut = async() => {
        shop.clearCart();
        await auth.logoutAction();
    }

    return (
        <div id="logged-in-display">
            <h1>Welcome, {auth.user.firstname} {auth.user.lastname}!</h1>
            <div id="grid-container">
                <div id="account-details" className="detail-container">
                    <h2 className="detail-container-header">Account</h2>
                    <h6 className="field-header">First Name</h6>
                    <h4 className="field-entry">{auth.user.firstname}</h4>
                    <h6 className="field-header">Last Name</h6>
                    <h4 className="field-entry">{auth.user.lastname}</h4>
                    <h6 className="field-header">Email</h6>
                    <h4 className="field-entry">{auth.user.email}</h4>
                    <h6 className="field-header">Password</h6>
                    <h4 className="field-entry">********</h4>
                    <button type="button" className="log-in-out-button" onClick={handleLogOut}>Log out</button>
                </div>
                <div id="address-details" className="detail-container">
                    <h2 className="detail-container-header">Address</h2>
                </div>
                <div id="payment-details" className="detail-container">
                    <h2 className="detail-container-header">Payment</h2>
                </div>
                <div id="orders-details" className="detail-container">
                    <h2 className="detail-container-header">Orders</h2>
                    {
                        orders.map(order => <Order key={order.ordersid} order={order}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile;