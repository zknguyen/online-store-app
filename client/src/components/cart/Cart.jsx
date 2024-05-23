import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useShop } from '../../contexts/shop/ShoppingCartContext';
import { Link } from "react-router-dom";
import CartItem from './CartItem';
import './Cart.css'


function Cart() {
    const auth = useAuth();
    const shop = useShop();
    const navigate = useNavigate();

    const handleCheckoutAction = () => {
        if (shop.cartItems.length < 1) {
            alert('Your cart is empty!');
            return;
        }
        navigate('/checkout');
    }
    
    const CartEmptyDisplay = () => {
        return (
            <div id='cart-empty-display'>
                <h2>Your cart is empty</h2>
                {auth.auth ? <></> : <><p>If you have an account, log in to see your items.</p>
                <Link to="/login" className="hyperlink"><input type="submit" className="log-in-out-button" value="Log in"/></Link></>}
                <Link to="/shop" className="hyperlink">
                    <p id='return-to-shop-hyperlink'><b>Return to Shop</b></p>
                </Link>
            </div>
        )
    }

    const CartFilledDisplay = () => {
        return (
            <div id="cart-items">
                {shop.cartItems.map(
                    (item) => <CartItem item={item} key={item.cart_itemsid}/>
                )}
            </div>
        )
    }

    return (
        <div className="page margin-page" id="cart-page">
            <h1 id="cart-header">Cart</h1>
            <div id="cart">
                {shop.cartItems.length > 0 ? <CartFilledDisplay/> : <CartEmptyDisplay/>}
                <div id="order-panel">
                    <div id="order-summary">
                        <h3>Order Summary</h3>
                        <p>Subtotal: $0.00</p>
                        <p>Promos: $0.00</p>
                        <p>Estimated Tax: $0.00</p>
                        <h3>Order Total: ${shop.total}</h3>
                    </div>
                    {shop.cartItems.length > 0 ? <button type="button" className="checkout-button" onClick={handleCheckoutAction}>Checkout</button> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Cart;