import "./Product.css";

function ProductCard({ product }) {
    // TODO: get absolute path for files
    const imageURL = `../../../public/products/${product.brand}-${product.productsid}.webp`
    
    return (
        <div className="product-card" id={product.productsid}>
            <img src={imageURL} alt={product.name} className="product-card-image"/>
            <div className="product-description">
                <h2>{product.name}</h2>
                <h3>{product.brand}</h3>
                <p>${product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard