import { useEffect } from 'react';
import CollectionCard from './CollectionCard';
import Carousel from '../components/Carousel';
import collectionsData from '../../collections';
import axios from 'axios';
import './Home.css';

function Home() {
    const collections = collectionsData;

    // User authentication
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const authenticateUser = async() => {
          try {
            const response = await axios.get("http://localhost:8800/");
            if (response.data.status === 200) {
              // TODO: handle this
              // pass
            }
          } catch(err) {
            console.log(err);
          }
        }
        authenticateUser();
      }, [])

    return (
        <div id="home-page">
            <div id="billboard">
                <div id="billboard-text">
                    <h1>Spring/Summer Collection 2024</h1>
                    <h3>The new spring/summer colletion for the new year has just dropped. Be one of the first to see.</h3>
                </div>
                <button type="button" id="billboard-button" className="home-page-button">View Collection</button>
            </div>
            <div id="collections">
                <h1>Featured Collections</h1>
                <Carousel content={collections.map((collection) => <CollectionCard data={collection} key={collection.id}/>)}/>
            </div>
            <div id="article-1">
                <div id="article-1-text">
                    <h1>Article 1</h1>
                    <h3>Everyone is talking about this brand now. Find out why.</h3>
                </div>
                <button type="button" id="article-1-button" className="home-page-button">Learn More</button>
            </div>
            {/* TODO: Add slider for featured products */}
            {/* <div id="featured-products">
                <Slider {...settings}>

                </Slider>
            </div> */}
        </div>
    )
}

export default Home;