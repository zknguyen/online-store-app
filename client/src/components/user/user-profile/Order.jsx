import { useState, useEffect } from "react";
import axios from "axios";

function Order({ order }) {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const response = await axios.get(`http://localhost:8800/order_items/${order.ordersid}`);
                setOrderItems(response.data);
                console.log(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchOrders();
    }, [order.ordersid])


    return (
        <div className="order">
            <h3>Order No. {order.ordersid}</h3>
            {
                orderItems.map((orderItem) => <p key={orderItem.order_itemsid}>Product #{orderItem.productsid} / Size {orderItem.size} / Quantity {orderItem.quantity}</p>)
            }
        </div>
    )
}

export default Order;