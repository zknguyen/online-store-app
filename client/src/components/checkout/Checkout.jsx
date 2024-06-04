import { useAuth } from "../../contexts/auth/AuthContext";
import { useShop } from "../../contexts/shop/ShopContext";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import axios from "axios";
import './Checkout.css';

function Checkout() {
    const auth = useAuth();
    const shop = useShop();
    const navigate = useNavigate();
    // const [addressData, setAddressData] = useState({
    //     firstname: auth.user.firstname,
    //     lastname: auth.user.lastname,
    // })

    const handleCheckout = async(e) => {
        console.log('Checking out...');
        e.preventDefault();
        let email;
        if (auth.auth) {
            email = auth.user.email;
        } else {
            email = document.getElementById('checkout-email').value;
        }
        
        const addressData = { 
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipcode: document.getElementById('zipcode').value,
        };

        // TODO
        // const paymentData = {
        //     cardholderName: document.getElementById('name-on-card').value,
        //     cardNumber: document.getElementById('card-number').value,
        //     cardExpirationDate: document.getElementById('card-expiration-date').value,
        //     cardCVC: document.getElementById('card-cvc').value,
        // }

        // Verify address or create new one
        const addressResponse = await axios.post('http://localhost:8800/addresses/search', addressData);
        let addressesId = addressResponse.data.addressesid;
        
        if (!addressesId) {
            const response = await axios.post('http://localhost:8800/addresses', addressData);
            addressesId = response.data.addressesid;
        }

        // Create an entry in the orders table
        const orderData = {
            usersid: auth.usersId,
            email: email,
            total: shop.total,
            addressesid: addressesId,
        }
        const orderResponse = await axios.post('http://localhost:8800/orders', orderData);
        
        if (!orderResponse) {
            console.log('Error while creating order');
        }
        const ordersId = orderResponse.data.ordersid;

        // For each item in the cart, create an order_item object
        shop.cartItems.forEach(async(item) => {
            const orderItemData = {
                ordersid: ordersId,
                productsid: item.product.productsid,
                size: item.size,
                quantity: item.quantity,
            }
            await axios.post('http://localhost:8800/order_items', orderItemData);
        })

        // Clear cart
        // TODO: error handling
        if (auth.auth) {
            const clearResponse = await axios.delete(`http://localhost:8800/cart_items/clear/${shop.cartsId}`);
            if (!clearResponse) {
                console.log('Error!')
            }
        }
        shop.clearCart();
        navigate('/checkout-finish');
    }

    const GuestDisplay = () => {
        return (
            <>
                <h4>Please enter your email addresss:</h4>
                <input type='email' id='checkout-email' placeholder='Email'/>
            </>
        )
    }

    const AuthDisplay = () => {
        return (
            <>
                <p>Email: <b>{auth.user.email}</b></p>
            </>
        )
    }

    return (
        <div id='checkout-page'>
            <h1 id="checkout-header">Checkout</h1>
            <form id='checkout-user-form'>
                <div id="user-info" className="user-form-panel">
                    <h3>User Info</h3>
                    <div id='checkout-user-info'>
                        {auth.auth ? <AuthDisplay/> : <GuestDisplay/>}
                    </div>
                </div>
                <div id='checkout-address-info' className='checkout-form user-form-panel'>
                    <h3 className="section-title full-col">Address</h3>
                    <input type='text' id='firstname' placeholder='First Name'/>
                    <input type='text' id='lastname' placeholder='Last Name'/>
                    <input type='text' id='street' className='full-col' placeholder='Street'/>
                    <input type='text' id='city' className='full-col' placeholder='City'/>
                    <input type='text' id='state' placeholder='State'/>
                    <input type='number' id='zipcode' placeholder='Zipcode'/>
                </div>
                <div id='checkout-payment-info' className='checkout-form user-form-panel'>
                    <h3 className="section-title full-col">Payment</h3>
                    <input type='text' id='name-on-card' className='full-col' placeholder='Name on Card'/>
                    <input type='number' id='card-number' className='full-col' placeholder='Card Number'/>
                    <input type='date' id='card-expiration-date' placeholder='Expiration Date'/>
                    <input type='number' id='card-cvc' placeholder='CVC'/>
                </div>
            </form>
            <div id="order-summary-panel">
                <div id="order-items">
                {shop.cartItems.map(
                    (item) => <OrderItem item={item} key={item.cart_itemsid}/>
                )}
                </div>
                <div id="order-total">
                    <p>Subtotal: $0.00</p>
                    <p>Promos: $0.00</p>
                    <p>Estimated Tax: $0.00</p>
                    <h3>Order Total: ${shop.total}</h3>
                </div>
                <button type='submit' id='place-order-button' onClick={handleCheckout}>Place Your Order</button>
            </div>
        </div>
    )
}

export default Checkout;