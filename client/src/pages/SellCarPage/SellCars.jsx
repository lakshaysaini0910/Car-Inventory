import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./SellCars.css";

const SellCars = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        brand: "",
        model: "",
        year: "",
        kilometresDriven: "",
        fuel: "",
        transmission: "",
        expectedPrice: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        // Backend connection will be added later
    };

    return (

        <main className="sell-cars-page">


            <Helmet>
                <title>Sell Your Car | Car Inventory</title>

                <meta
                    name="description"
                    content="Sell your car with Car Inventory. Submit your vehicle details and our team will get in touch to discuss the next steps."
                />

                <link
                    rel="canonical"
                    href="https://car-inventory.vercel.app/sell-cars"
                />

                <meta
                    property="og:title"
                    content="Sell Your Car | Car Inventory"
                />

                <meta
                    property="og:description"
                    content="Sell your car with Car Inventory. Submit your vehicle details and our team will get in touch to discuss the next steps."
                />

                <meta
                    property="og:url"
                    content="https://car-inventory.vercel.app/sell-cars"
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


            {/* HERO */}

            <section className="sell-hero">

                <div className="sell-hero-content">

                    <p className="sell-eyebrow">
                        SELL YOUR CAR
                    </p>

                    <h1>
                        Ready to Sell
                        <span>Your Car?</span>
                    </h1>

                    <p>
                        Tell us about your vehicle and our team
                        will get in touch with you to discuss
                        the next steps.
                    </p>

                </div>

            </section>


            {/* FORM */}

            <section className="sell-form-section">

                <div className="sell-form-intro">

                    <p className="sell-eyebrow">
                        VEHICLE DETAILS
                    </p>

                    <h2>
                        Tell Us About Your Car
                    </h2>

                    <p>
                        Fill in the details below to help us
                        understand your vehicle.
                    </p>

                </div>


                <form
                    className="sell-form"
                    onSubmit={handleSubmit}
                >

                    {/* PERSONAL DETAILS */}

                    <div className="form-section">

                        <h3>
                            Your Details
                        </h3>

                        <div className="form-grid">

                            {/* FULL NAME */}

                            <div className="form-group">

                                <label htmlFor="name">
                                    Full Name
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label htmlFor="phone">
                                    Phone Number
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your phone number"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group full-width">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your email address"
                                />

                            </div>

                        </div>

                    </div>


                    {/* VEHICLE DETAILS */}

                    <div className="form-section">

                        <h3>
                            Vehicle Details
                        </h3>

                        <div className="form-grid">

                            {/* BRAND */}

                            <div className="form-group">

                                <label htmlFor="brand">
                                    Brand
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <input
                                    id="brand"
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. BMW"
                                    required
                                />

                            </div>


                            {/* MODEL */}

                            <div className="form-group">

                                <label htmlFor="model">
                                    Model
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <input
                                    id="model"
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    placeholder="e.g. 5 Series"
                                    required
                                />

                            </div>


                            {/* YEAR */}

                            <div className="form-group">

                                <label htmlFor="year">
                                    Year
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <input
                                    id="year"
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (/^\d{0,4}$/.test(value)) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                year: value,
                                            }));
                                        }
                                    }}
                                    placeholder="e.g. 2022"
                                    inputMode="numeric"
                                    pattern="[0-9]{4}"
                                    required
                                />

                            </div>


                            {/* KILOMETRES DRIVEN */}

                            <div className="form-group">

                                <label htmlFor="kilometresDriven">
                                    Kilometres Driven
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <input
                                    id="kilometresDriven"
                                    type="number"
                                    name="kilometresDriven"
                                    value={formData.kilometresDriven}
                                    onChange={handleChange}
                                    placeholder="e.g. 25,000"
                                    required
                                />

                            </div>


                            {/* FUEL */}

                            <div className="form-group">

                                <label htmlFor="fuel">
                                    Fuel Type
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <select
                                    id="fuel"
                                    name="fuel"
                                    value={formData.fuel}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select fuel type
                                    </option>

                                    <option value="Petrol">
                                        Petrol
                                    </option>

                                    <option value="Diesel">
                                        Diesel
                                    </option>

                                    <option value="Hybrid">
                                        Hybrid
                                    </option>

                                    <option value="Electric">
                                        Electric
                                    </option>

                                </select>

                            </div>


                            {/* TRANSMISSION */}

                            <div className="form-group">

                                <label htmlFor="transmission">
                                    Transmission
                                    <span style={{ color: "red" }}> *</span>
                                </label>

                                <select
                                    id="transmission"
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select transmission
                                    </option>

                                    <option value="Automatic">
                                        Automatic
                                    </option>

                                    <option value="Manual">
                                        Manual
                                    </option>

                                </select>

                            </div>


                            {/* EXPECTED PRICE - OPTIONAL */}

                            <div className="form-group full-width">

                                <label htmlFor="expectedPrice">
                                    Expected Price
                                </label>

                                <input
                                    id="expectedPrice"
                                    type="text"
                                    name="expectedPrice"
                                    value={formData.expectedPrice}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (/^\d*$/.test(value)) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                expectedPrice: value,
                                            }));
                                        }
                                    }}
                                    placeholder="₹ Expected selling price"
                                    inputMode="numeric"
                                />

                            </div>

                        </div>

                    </div>


                    {/* ADDITIONAL INFORMATION */}

                    <div className="form-section">

                        <h3>
                            Additional Information
                        </h3>

                        <div className="form-group">

                            <label htmlFor="message">
                                Tell Us More
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about the condition of your car, service history, modifications, etc."
                                rows="6"
                            />

                        </div>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="sell-submit"
                    >
                        Submit Vehicle Details
                    </button>

                </form>

            </section>

        </main>
    );
};

export default SellCars;