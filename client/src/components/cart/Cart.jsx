import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useShop } from '../../contexts/shop/ShoppingCartContext';
import CartItem from './CartItem';
import './Cart.css'


const sum = (items) => {
    return items.reduce(
        (accumulator, currentItem) => accumulator + (currentItem.product.price * currentItem.quantity),
        0
    )
}

function Cart() {
    const shop = useShop();
    const [subtotal, setSubtotal] = useState(1)
    const [tax, setTax] = useState(subtotal * 0.1)
    const [total, setTotal] = useState(subtotal + tax);
    const navigate = useNavigate();


    const setTotals = (cartItems) => {
        const updatedSubtotal = sum(cartItems);
        const updatedTax = updatedSubtotal * 0.1;
        const updatedTotal = updatedSubtotal + updatedTax;

        setSubtotal(updatedSubtotal);
        setTax(updatedTax);
        setTotal(updatedTotal);
    }

    // Updates totals when cart item is removed / added
    useEffect(() => {
        setTotals(shop.cartItems);
    }, [shop.cartItems]);

    // Updates totals when cart item's quantity is changed
    const handleCartItemQuantityChanged = () => {
        setTotals(shop.cartItems);
    }

    const handleCheckoutAction = () => {
        if (shop.cartItems.length < 1) {
            alert('Your cart is empty!');
            return;
        }
        navigate('/checkout');
    }

    return (
        <div className="page margin-page" id="cart-page">
            <h1 id="cart-header">Cart</h1>
            <div id="cart">
                <div id="cart-items" onChange={() => handleCartItemQuantityChanged()}>
                    {shop.cartItems.map(
                        (item) => <CartItem item={item} key={item.cart_itemsid}/>
                    )}
                </div>
                <div id="order-panel">
                    <div id="order-summary">
                        <h3>Order Summary</h3>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Promos: $0.00</p>
                        <p>Estimated Tax: ${tax.toFixed(2)} </p>
                        <h3>Order Total: ${total.toFixed(2)}</h3>
                    </div>
                    <button type="button" className="checkout-button" onClick={handleCheckoutAction}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;