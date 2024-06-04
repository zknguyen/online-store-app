import { useEffect, useState, useCallback } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useShop } from "../../contexts/shop/ShopContext";

function ProductDetails() {
    const id = useParams().productsid;
    const [product, setProduct] = useState({
        productsid: -1,
        name: "",
        brand: "",
        description: "",
        price: 0.00,
        type: "",
        category: "",
        on_sale: 0,
    });
    const [size, setSize] = useState("S");
    const shop = useShop();
    // TODO: get absolute path for files
    const imageURL = `../../../public/products/${product.brand}-${product.productsid}.webp`
    
    let handleSizeSelected;

    // Attach handler to event
    useEffect(() => {
        document.querySelectorAll(".product-size-button").forEach((button) => {
            button.addEventListener("click", handleSizeSelected);
        })
    }, [handleSizeSelected])

    // Load product info from server
    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const response = await axios.get(`http://localhost:8800/product/${id}`);
                setProduct(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchProduct();
    }, [id]);

    // Function to handle size selected
    handleSizeSelected = useCallback((e) => {
        const selectedSize = e.currentTarget.id;
        setSize(selectedSize);
        Array.from(e.currentTarget.parentNode.children).forEach(
            (target) => target.classList.remove("selected-size")
        );
        e.currentTarget.classList.add("selected-size");
    }, []);

    const handleItemAdded = async() => {
        await shop.addToCart(product, size);
    }


    return (
        <div className="page margin-page" id="product-details-page">
            <div className="product-image-container">
                <img src={imageURL} className="product-details-image" alt="Image Placeholder"/>
            </div>
            <div className="product-details-container">
                <div className="product-details-header">
                    <h1>{product.name}</h1>
                    <h2>${product.price}.00</h2>
                </div>
                <h3>{product.brand}</h3>
                <br />
                <h3 className="product-details-title">Size</h3>
                <div className="product-size-buttons">
                    <button type="button" className="product-size-button selected-size" id="S">S</button>
                    <button type="button" className="product-size-button" id="M">M</button>
                    <button type="button" className="product-size-button" id="L">L</button>
                    <button type="button" className="product-size-button" id="XL">XL</button>
                </div>
                <button type="button" className="add-to-cart-button" onClick={handleItemAdded}>Add to Cart</button>
                <div className="side-panel-section" id="description">
                    <h3 className="product-details-title">Description</h3>
                    <p>{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="side-panel-section" id="features">
                    <h3 className="product-details-title">Features</h3>
                    <div className="product-feature">
                        <h4>Durable Material</h4>
                        <p>Lorem ipsum dolor sit amet sed do eiusmod tempor incididunt ut labore</p>
                    </div>
                    <div className="product-feature">
                        <h4>Elevated Insole</h4>
                        <p>Consectetur adipiscing elit sed do sit amet sed do eiusmod tempor incididunt ut labore</p>
                    </div>
                    <div className="product-feature">
                        <h4>Exceptional Craftsmanship</h4>
                        <p>Put labore et dolore magna aliqua sit exercitation ullamco laboris nisi ut</p>
                    </div>
                </div>
                <div className="side-panel-section" id="details">
                    <h3 className="product-details-title">Details</h3>
                    <p>Style: T20240226</p>
                    <p>Color: White</p>
                    <p>Material: 40% Polyester, 60% Cotton</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails