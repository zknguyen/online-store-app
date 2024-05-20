import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products({ type }) {
    const [products, setProducts] = useState([]);
    let url = "http://localhost:8800/shop";

    if (type === 'Men') {
        url = url.concat("/men");
    } else if (type === 'Women') {
        url = url.concat("/women");
    } else if (type === 'Kids') {
        url = url.concat("/kids");
    } else if (type === 'Sale') {
        url = url.concat("/sale");
    }

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const result = await axios.get(url);
                setProducts(result.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, [url]);

    return (
        <div className="page margin-page" id="products-page">
            <h1 id="products-header">Products - {type}</h1>
            <div className="products">
                {products.map(
                    (product) => <Link to={"/product/" + product.productsid} key={product.productsid} className="product-card-wrapper">
                                    <ProductCard product={product}/>
                                </Link>
                )}
            </div>
        </div>
    )
}

export default Products