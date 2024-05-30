import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Sidebar from "../components/Sidebar";
import productCategories from "../../data/productCategories";
import axios from "axios";

function Products({ type }) {
    const [products, setProducts] = useState([]);
    const query = useParams().query;
    let url = "http://localhost:8800/shop";

    if (type === 'Men') {
        url = url.concat("/men");
    } else if (type === 'Women') {
        url = url.concat("/women");
    } else if (type === 'Kids') {
        url = url.concat("/kids");
    } else if (type === 'Sale') {
        url = url.concat("/sale");
    } else if (type === 'Search') {
        url = url.concat(`/search/${query}`);
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
            <div id="products-header">
                <h1 id="products-title">Products - {type}</h1>
                <p>Our finest collection of products, curated from designers all over the globe.</p>
            </div>
            <Sidebar categories={productCategories}/>
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