import './Home.css'
import { Link } from "react-router-dom";

function ArticleCard({ data }) {
    return (
        <Link to="/shop">
            <div className="article-card">
                <img src={data.imageURL} alt={data.name} className="article-card-image"/>
                <h2 className="article-card-text">{data.name}</h2>
            </div>
        </Link>
    )
}

export default ArticleCard