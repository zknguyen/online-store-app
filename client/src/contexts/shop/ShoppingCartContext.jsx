import { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocalStorage } from "../../components/hooks/useLocalStorage";
import { uid } from "uid";
import axios from "axios";

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
    const [cartsId, setCartsId] = useState(-1);
    const [total, setTotal] = useState(0.00);
    const auth = useAuth();
    
    useEffect(() => {
        const fetchCart = async() => {
            if (auth.auth && auth.usersId !== -1) {
                try {
                    const response = await axios.get(`http://localhost:8800/carts/${auth.usersId}`);
                    if (response.data) {
                        setCartsId(response.data.cartsid);
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        }
        fetchCart();
    }, [auth.auth, auth.usersId]);

    useEffect(() => {
        const sumCartItems = () => {
            const sum = cartItems.reduce(
                (accumulator, currentItem) => accumulator + (currentItem.product.price * currentItem.quantity),
                0
            )
            setTotal(sum.toFixed(2));
        }
        sumCartItems();
    }, [cartItems]);

    const initializeCart = async(usersId) => {
        if (usersId !== -1) {
            try {
                const response = await axios.get(`http://localhost:8800/carts/${usersId}`);
                if (response.data) {
                    setCartsId(response.data.cartsid);
                    await loadCartItems(response.data.cartsid);
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    const isInCart = (product, size, cart) => {
        return cart.some(cartItem => {
            return cartItem.product.productsid === product.productsid && cartItem.size === size;
        })
    }

    // TODO: Rename this
    const saveCartItem = async(item, cartsId, cart) => {
        try {
            if (isInCart(item.product, item.size, cart)) {
                // TODO: deal with this response
                const response = await axios.put(
                    `http://localhost:8800/cart_items/${item.cart_itemsid}`,
                    {
                        productsid: item.product.productsid,
                        cartsid: cartsId,
                        quantity: item.quantity,
                        size: item.size,
                    }
                )
                if (response.data.code) {
                    return false;
                }
            } else {
                const response = await axios.post(
                    `http://localhost:8800/cart_items`,
                    {
                        productsid: item.product.productsid,
                        cartsid: cartsId,
                        quantity: item.quantity,
                        size: item.size,
                    }
                )
                item.cart_itemsid = response.data.cart_itemsid;

            }
        } catch(err) {
            console.log(err);
        }

        return true;
    }

    const addToCart = async(product, size) => {
        // Create new cart if one doesn't exist TODO: Test this
        if (auth.auth && cartsId === -1) {
            try {
                const response = await axios.post('http://localhost:8800/carts', {usersid: auth.usersId});
                if (response) {
                    setCartsId(response.cartsid);
                }
            } catch(err) {
                console.log(err);
            }
        }

        let item; 

        if (isInCart(product, size, cartItems)) {
            item = cartItems.find(
                (cartItem) => cartItem.product.productsid === product.productsid && cartItem.size === size
            );
            if (item.quantity >= 5) {
                alert('Maximum quantity exceeded!');
                return;
            }
            item.quantity++;
        } else {
            item = {
                cart_itemsid: uid(),
                product: product,
                cartsid: cartsId,
                quantity: 1,
                size: size,
            }
            setCartItems([...cartItems, item])
        }

        if (auth.auth) {
            await saveCartItem(item, cartsId, cartItems);
        }
    };
    
    const removeFromCart = async(item) => {
        if (auth.auth) {
            await axios.delete(`http://localhost:8800/cart_items/${item.cart_itemsid}`)
        }
        setCartItems(cartItems.filter((cartItem) => cartItem.cart_itemsid !== item.cart_itemsid));
    };

    const normalizeCartItem = (cartItemData) => {
        return {
            cart_itemsid: cartItemData.cart_itemsid,
            product: {
                productsid: cartItemData.productsid,
                name: cartItemData.name,
                brand: cartItemData.brand,
                description: cartItemData.description,
                price: cartItemData.price,
                type: cartItemData.type,
                category: cartItemData.category,
                on_sale: cartItemData.on_sale,
            },
            cartsid: cartItemData.cartsid,
            quantity: cartItemData.quantity,
            size: cartItemData.size,
        }
    }

    // TODO: Rename this
    const loadCartItems = async(cartsId) => {
        try {
            const response = await axios.post(
                'http://localhost:8800/cart_items/search',
                {
                    cartsid: cartsId,
                }
            )
            const responseData = response.data.map((item) => normalizeCartItem(item));

            const savedItems = [];
            for (const item of cartItems) {
                const saveResponse = await saveCartItem(item, cartsId, responseData);
                if (saveResponse && item.cartsid === -1) {
                    savedItems.push(item);
                }
            }
            setCartItems([...responseData, ...savedItems]);
        } catch(err) {
            console.log(err);
        }
    }

    const clearCart = () => {
        setCartItems([]);
    }
    
    const updateItemQuantity = async(item, quantity) => {
        if (auth.auth) {
            try {
                await axios.put(
                    `http://localhost:8800/cart_items/${item.cart_itemsid}`,
                    {
                        productsid: item.product.productsid,
                        cartsid: cartsId,
                        size: item.size,
                        quantity: quantity,
                    }
                )
            } catch(err) {
                console.log(err);
            }
        }

        item.quantity = quantity;
        setCartItems([...cartItems]);
    };

    return (
        <ShopContext.Provider value={{ 
            cartItems,
            total,
            addToCart,
            removeFromCart,
            updateItemQuantity,
            loadCartItems,
            clearCart,
            initializeCart,
        }}>
            {children}
        </ShopContext.Provider>
    )
};

export default ShopProvider;

export const useShop = () => {
    return useContext(ShopContext);
}