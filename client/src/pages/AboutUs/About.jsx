import { Helmet } from "react-helmet-async";
import "./About.css";


const About = () => {
    return (

        <div className="about-page">

            <Helmet>
                <title>About Car Inventory | Premium Pre-Owned Cars</title>

                <meta
                    name="description"
                    content="Learn about Car Inventory, a trusted pre-owned automobile dealership with over 30 years of experience serving customers across Delhi NCR."
                />

                <link
                    rel="canonical"
                    href="https://car-inventory.vercel.app/about"
                />

                <meta
                    property="og:title"
                    content="About Car Inventory | Premium Pre-Owned Cars"
                />

                <meta
                    property="og:description"
                    content="Learn about Car Inventory, a trusted pre-owned automobile dealership with over 30 years of experience serving customers across Delhi NCR."
                />

                <meta
                    property="og:url"
                    content="https://car-inventory.vercel.app/about"
                />

                <meta
                    property="og:type"
                    content="website"
                />

                <meta
                    property="og:image"
                    content="https://car-inventory.vercel.app/CarLogo.png"
                />

            </Helmet>

            <main className="about-main">

                {/* HERO */}

                <section className="about-hero">

                    <div className="about-hero-content">

                        <p className="about-eyebrow">
                            ABOUT Car Inventory
                        </p>

                        <h1>
                            Driven by Experience.
                            <span> Trusted for Quality.</span>
                        </h1>

                        <p className="about-intro">
                            For over three decades, Car Inventory has been
                            helping customers find quality pre-owned luxury
                            vehicles across Delhi NCR.
                        </p>

                    </div>

                </section>


                {/* STORY */}

                <section className="about-story">

                    <div className="about-story-heading">

                        <p className="about-eyebrow">
                            OUR STORY
                        </p>

                        <h2>
                            Experience You Can
                            <span> Trust</span>
                        </h2>

                    </div>


                    <div className="about-story-content">

                        <p>
                            Welcome to Car Inventory. With over 30 years
                            of experience in the pre-owned automobile industry,
                            we have built our reputation around quality,
                            value and customer service.
                        </p>

                        <p>
                            We specialize in nearly new, less-driven and
                            quality second-hand luxury vehicles, offering
                            customers a wide selection of makes, models and
                            body styles.
                        </p>

                        <p>
                            From Sedans and Coupés to Sports Cars, Hatchbacks,
                            Convertibles, MPVs and SUVs, our aim is to make
                            finding the right vehicle a simple and enjoyable
                            experience.
                        </p>

                    </div>

                </section>


                {/* HIGHLIGHTS */}

                <section className="about-highlights">

                    <div className="about-section-heading">

                        <p className="about-eyebrow">
                            Car Inventory
                        </p>

                        <h2>
                            Built on Experience
                        </h2>

                    </div>


                    <div className="about-cards">

                        <div className="about-card">

                            <div className="about-card-number">
                                30+
                            </div>

                            <h3>
                                Years of Experience
                            </h3>

                            <p>
                                Decades of experience in the
                                pre-owned automobile industry.
                            </p>

                        </div>


                        <div className="about-card">

                            <div className="about-card-number">
                                50+
                            </div>

                            <h3>
                                Vehicles in Stock
                            </h3>

                            <p>
                                A wide selection of quality
                                pre-owned vehicles.
                            </p>

                        </div>


                        <div className="about-card">

                            <div className="about-card-number">
                                NCR
                            </div>

                            <h3>
                                Delhi NCR
                            </h3>

                            <p>
                                Serving customers across the
                                Delhi NCR region.
                            </p>

                        </div>

                    </div>

                </section>


                {/* CTA */}

                <section className="about-cta">

                    <p className="about-eyebrow">
                        FIND YOUR NEXT CAR
                    </p>

                    <h2>
                        Looking for a quality
                        <span> pre-owned vehicle?</span>
                    </h2>

                    <p>
                        Explore our available vehicles or get in touch
                        with our team to find the right car for you.
                    </p>

                    <div className="about-cta-actions">

                        <a
                            href="/stock-cars"
                            className="about-primary-btn"
                        >
                            Explore Cars
                        </a>

                        <a
                            href="/sell-cars"
                            className="about-secondary-btn"
                        >
                            Sell Your Car
                        </a>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default About;