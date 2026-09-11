import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Home.css"
import WhyChooseUs from "./WhyChooseUs"
import FeaturedCars from './FeaturedCars/FeaturedCars';


const Home = () => {


    return (

        <div className="homePage">


            <Helmet>

                <title>Car Inventory | Premium Pre-Owned Cars</title>

                <meta
                    name="description"
                    content="Discover quality pre-owned cars at Car Inventory. Explore our carefully selected collection of premium used vehicles and find your next car."
                />

                <link
                    rel="canonical"
                    href="https://car-inventory.vercel.app/"
                />

                <meta
                    property="og:title"
                    content="Car Inventory | Premium Pre-Owned Cars"
                />

                <meta
                    property="og:description"
                    content="Discover quality pre-owned cars at Car Inventory. Explore our carefully selected collection of premium used vehicles and find your next car."
                />

                <meta
                    property="og:url"
                    content="https://car-inventory.vercel.app/"
                />

                <meta
                    property="og:type"
                    content="website"
                />

                <meta
                    property="og:image"
                    content="https://car-inventory.vercel.app/logo.png"
                />

            </Helmet>



            <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
                poster="/black_poster.png"
            >
                <source src="/main.mp4" type="video/mp4" />
            </video>


            <main className="home-main">

                <section className="home-hero">

                    <div className="hero-content">

                        <p className="hero-eyebrow">PREMIUM PRE-OWNED CARS</p>

                        <h1 className="hero-title">Find Your Next Car</h1>

                        <p className="hero-description">
                            Discover quality pre-owned cars,
                            carefully selected for you.
                        </p>

                        <div className="hero-actions">
                            <Link to="/stock-cars" className="hero-primary-btn">
                                Explore Cars
                            </Link>

                            <Link to="/sell-cars" className="hero-secondary-btn">
                                Sell Your Car
                            </Link>

                        </div>

                    </div>

                </section>

            </main>


            < FeaturedCars />

            <WhyChooseUs />

        </div>
    )
}

export default Home