import { Link } from "react-router-dom"

function CheckoutFinish() {
    return (
        <div id='checkout-finish-page'>
            <h1>Thank You!</h1>
            <p>Your order has been placed!</p>
            <p>Please allow a few days for your order to be processed.</p>
            <Link to='/'>
                <button type='button'>Return to Home</button>
            </Link>
        </div>
    )
}

export default CheckoutFinish