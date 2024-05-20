import './Cart.css'
import { useShop } from '../../contexts/shop/ShoppingCartContext';
import { useSessionStorage } from '../hooks/useSessionStorage';

function CartItem({ item }) {
    const [quantity, setQuantity] = useSessionStorage(`${item.cart_itemsid}`, item.quantity);
    const shop = useShop();


    const handleItemQuantityChanged = async(e) => {
        const updatedQuantity = e.target.value;
        setQuantity(updatedQuantity);
        await shop.updateItemQuantity(item, updatedQuantity);
    }

    const handleItemRemoved = async() => {
        await shop.removeFromCart(item);
    }

    return (
        <div className="cart-item" id={item.cartid}>
            <img src={item.imageURL} alt={item.product.name} className="cart-item-image"></img>
            <div className="cart-item-details">
                <div className="cart-item-top-row">
                    <div className="item-info">
                        <h3>{item.product.name}</h3>
                        <p>Style: T20240226</p>
                        <p>Size: {item.size}</p>
                    </div>
                    <h3>${(item.product.price * item.quantity).toFixed(2)}</h3>
                </div>
                <div className="cart-item-bottom-row">
                    <select className="cart-item-quantity" value={quantity} onChange={handleItemQuantityChanged}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div className="bottom-row-buttons">
                        <button type="button" className="cart-item-button save-for-later-button">Save For Later</button>
                        <button type="button" className="cart-item-button favorite-button"><i className="fa-regular fa-heart"></i></button>
                        <button type="button" className="cart-item-button remove-button" onClick={handleItemRemoved}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;