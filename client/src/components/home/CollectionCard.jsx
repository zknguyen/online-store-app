import './Home.css'
import { Link } from "react-router-dom";

function CollectionCard({ data }) {
    return (
        <Link to="/shop">
            <div className="collection-card">
                <img src={data.imageURL} alt={data.name} className="collection-card-image"/>
                <h2 className="collection-card-text">{data.name}</h2>
            </div>
        </Link>
    )
}

export default CollectionCard