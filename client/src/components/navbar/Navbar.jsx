import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
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
                <i className="fa-solid fa-magnifying-glass"></i>
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