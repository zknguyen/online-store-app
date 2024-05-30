import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    document.addEventListener('click', (e) => {
        if (e.target.id !== 'search-bar' && e.target.id !== 'search-icon') {
            const searchIcon = document.getElementById('search-icon');
            const searchBar = document.getElementById('search-bar');
            searchIcon.classList.remove('hidden');
            searchBar.classList.add('hidden');
        }
    })

    const handleSearchClicked = () => {
        const searchIcon = document.getElementById('search-icon');
        const searchBar = document.getElementById('search-bar');
        searchIcon.classList.add('hidden');
        searchBar.classList.remove('hidden');
    }

    const handleSearchSubmitted = async(e) => {
        // e.preventDefault();
        const query = e.target.childNodes[0].value;
        navigate(`/shop/search/${query}`);
        // try {
        //     // const response = await axios.get(`http://localhost:8800/shop/search/${query}`);
        //     navigate(`/shop/search/${query}`);
        // } catch(err) {
        //     console.log(err);
        // }
    }

    return (
        <div id="navbar">
            <div id="navbar-column-1">
                <Link to="/">
                    <img src="/vite.svg" alt="" id="navbar-logo"/>
                </Link>
            </div>
            <div id="navbar-column-2">
                <Link to="/shop/men">
                    <button type="button" className="navbar-link-tab" id="men-tab">Men</button>
                </Link>
                <Link to="/shop/women">
                    <button type="button" className="navbar-link-tab" id="women-tab">Women</button>
                </Link>
                <Link to="/shop/kids">
                    <button type="button" className="navbar-link-tab" id="kids-tab">Kids</button>
                </Link>
                <Link to="/shop/sale">
                    <button type="button" className="navbar-link-tab" id="sale-tab">Sale</button>
                </Link>
                <Link to="/about-us">
                    <button type="button" className="navbar-link-tab" id="about-us-tab">About Us</button>
                </Link>
            </div>
            <div id="navbar-column-3">
                <div id="search">
                    <form id="search-form" onSubmit={handleSearchSubmitted}>
                        <input type="text" id="search-bar" className="hidden" placeholder="Search"/>
                    </form>
                    <i id="search-icon" className="fa-solid fa-magnifying-glass" onClick={handleSearchClicked}></i>
                </div>
                <Link to="/login">
                    <i className="fa-solid fa-user"></i>
                </Link>
                <Link to="/cart">
                    <i className="fa-solid fa-bag-shopping"></i>
                </Link>
            </div>
        </div>
    )
}

export default Navbar