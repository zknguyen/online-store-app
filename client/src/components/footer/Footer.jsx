import './Footer.css'

function Footer() {
    return (
        <div id="footer">
            <div id="column-1" className="footer-column">
                <h3>Newsletter</h3>
                <input placeholder="E-Mail*"></input>
                <button type="button">Sign me up!</button>
            </div>
            <div id="column-2" className="footer-column">
                <h3>Need Help?</h3>
                <ul>
                    <li>Help Center</li>
                    <li>Order Status</li>
                    <li>Size & Fit Guide</li>
                    <li>Returns & Exchanges</li>
                    <li>Accessibility Statement</li>
                </ul>
            </div>
            <div id="column-3" className="footer-column">
                <h3>More Info</h3>
                <ul>
                    <li>Find a Store</li>
                    <li>Gift Cards</li>
                    <li>Careers</li>
                    <li>Lookbooks</li>
                    <li>Press</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;