import { useAuth } from "../../../contexts/auth/AuthContext";
import { useShop } from "../../../contexts/shop/ShoppingCartContext";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const auth = useAuth();
    const shop = useShop();

    const handleLogin = async(e) => {
        e.preventDefault();
        const data = { 
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        const usersId = await auth.loginAction(data);
        await shop.initializeCart(usersId);
    }

    const handleLogOut = async() => {
        shop.clearCart();
        await auth.logoutAction();
    }

    // Display login
    const LoginFormDisplay = () => {
        return (
            <div id='login-form-display'>
                <h1 id="login-header">Log In</h1>
                <form method="post" id="login-form" onSubmit={handleLogin}>
                    <input type="email" name="email" id="email" className="input-field" placeholder="Email" required/><br/>
                    <input type="password" name="password" id="password" className="input-field" placeholder="Password" required/><br/>
                    <input type="submit" className="log-in-out-button" value="Log in"/>
                </form>
                <p>Not a member?</p>
                <Link to="/create-user" className='hyperlink'>
                    <p id='create-user-hyperlink'><b>Create an Account</b></p>
                </Link>
            </div>
        )
    }

    const LoggedInDisplay = () => {
        return (
            <div id="logged-in-display">
                <h1>Welcome, {auth.user.firstname} {auth.user.lastname}!</h1>
                <div id="grid-container">
                    <div id="account-details" className="detail-container">
                        <h2 className="detail-container-header">Account</h2>
                        <h6 className="field-header">First Name</h6>
                        <h4 className="field-entry">{auth.user.firstname}</h4>
                        <h6 className="field-header">Last Name</h6>
                        <h4 className="field-entry">{auth.user.lastname}</h4>
                        <h6 className="field-header">Email</h6>
                        <h4 className="field-entry">{auth.user.email}</h4>
                        <h6 className="field-header">Password</h6>
                        <h4 className="field-entry">********</h4>
                        <button type="button" className="log-in-out-button" onClick={handleLogOut}>Log out</button>
                    </div>
                    <div id="address-details" className="detail-container">
                        <h2 className="detail-container-header">Address</h2>
                    </div>
                    <div id="payment-details" className="detail-container">
                        <h2 className="detail-container-header">Payment</h2>
                    </div>
                    <div id="collection-details" className="detail-container">
                        <h2 className="detail-container-header">Collections</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="login-page">
            {auth.auth ? <LoggedInDisplay/> : <LoginFormDisplay/>}
        </div>
    )
}

export default Login;