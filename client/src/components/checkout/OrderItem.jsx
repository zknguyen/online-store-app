function OrderItem({ item }) {
    const imageURL = `/products/${item.product.brand}-${item.product.productsid}.webp`

    return (
        <div className="order-item">
            <img src={imageURL} alt={item.product.name} className="order-item-image"></img>
            <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>Item T20240226 / {item.size}</p>
                <p>QTY {item.quantity} @ ${item.product.price.toFixed(2)} - <b>${(item.product.price * item.quantity).toFixed(2)}</b></p>
            </div>
        </div>
    )
}

export default OrderItem;