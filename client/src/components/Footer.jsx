import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-main">

                <div className="footer-brand">
                    <img
                        src="/CarLogo.png"
                        alt="Car Inventory"
                    />

                    <p>
                        Premium pre-owned automobiles
                        serving Delhi NCR.
                    </p>
                </div>


                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>

                        <li>
                            <a href="/buy-cars">Buy Cars</a>
                        </li>

                        <li>
                            <a href="/sell-cars">Sell Your Car</a>
                        </li>

                        <li>
                            <a href="/about">About Us</a>
                        </li>
                    </ul>

                </div>


                <div className="footer-contact">

                    <h3>Contact Us</h3>

                    <p>Delhi NCR</p>

                    <a href="#">
                        WhatsApp
                    </a>

                    <a href="#">
                        Contact Us
                    </a>

                </div>


                <div className="footer-social">

                    <h3>Follow Us</h3>

                    <a href="#">
                        Instagram
                    </a>

                    <a href="#">
                        YouTube
                    </a>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © 2026 Car Inventory. All rights reserved.
                </p>

            </div>

        </footer>
    );
};

export default Footer;