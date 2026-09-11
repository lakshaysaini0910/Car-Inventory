import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./CarDetails.css";

const CarDetails = () => {

    const { id } = useParams();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeImage, setActiveImage] = useState(0);


    useEffect(() => {

        const fetchCar = async () => {

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/cars/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(
                        data.message || "Car not found"
                    );
                    return;
                }

                if (data.success) {
                    setCar(data.car);
                }

            } catch (error) {

                console.error(
                    "Failed to fetch car:",
                    error
                );

                setError(
                    "Unable to load car details"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCar();

    }, [id]);


    if (loading) {

        return (
            <main className="car-details-page">

                <div className="car-details-message">
                    Loading car details...
                </div>

            </main>
        );

    }


    if (error || !car) {

        return (
            <main className="car-details-page">

                <div className="car-details-message">

                    <h2>
                        Car Not Found
                    </h2>

                    <p>
                        {error || "This vehicle is no longer available."}
                    </p>

                    <Link
                        to="/stock-cars"
                        className="back-to-cars"
                    >
                        Back to Stock Cars
                    </Link>

                </div>

            </main>
        );

    }


    const images = car.images?.length
        ? car.images
        : ["/car-placeholder.jpg"];


    const whatsappMessage =
        `Hi Car Inventory, I am interested in the ${car.brand} ${car.model} ${car.variant}. Price: ₹${car.price?.toLocaleString("en-IN")}. Please share more details.`;


    const whatsappUrl =
        `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(
            whatsappMessage
        )}`;


    return (

        <main className="car-details-page">


            <Helmet>
                <title>
                    {car.brand} {car.model} {car.manufacturingDate} | Car Inventory
                </title>

                <meta
                    name="description"
                    content={`Explore the ${car.brand} ${car.model} ${car.variant || ""} at Car Inventory. View vehicle details, specifications, price and availability.`}
                />

                <link
                    rel="canonical"
                    href={`https://car-inventory.vercel.app/stock-cars/${car._id}`}
                />


                <meta
                    property="og:title"
                    content={`${car.brand} ${car.model} ${car.manufacturingDate} | Car Inventory`}
                />

                <meta
                    property="og:description"
                    content={`Explore the ${car.manufacturingDate} ${car.brand} ${car.model} ${car.variant || ""} at Car Inventory. View price, specifications, mileage and availability.`}
                />

                <meta
                    property="og:url"
                    content={`https://car-inventory.vercel.app/stock-cars/${car._id}`}
                />

                <meta
                    property="og:type"
                    content="website"
                />

                <meta
                    property="og:image"
                    content={images[0]}
                />


                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Vehicle",

                        name: `${car.brand} ${car.model} ${car.variant || ""}`,

                        image: images,

                        brand: {
                            "@type": "Brand",
                            name: car.brand,
                        },

                        model: car.model,

                        vehicleModelDate: String(car.manufacturingDate),

                        fuelType: car.fuel,

                        vehicleTransmission: car.transmission,

                        mileageFromOdometer: {
                            "@type": "QuantitativeValue",
                            value: car.kilometres,
                            unitCode: "KMT",
                        },

                        offers: {
                            "@type": "Offer",
                            price: car.price,
                            priceCurrency: "INR",
                            availability:
                                car.status === "available"
                                    ? "https://schema.org/InStock"
                                    : "https://schema.org/OutOfStock",
                            url: `https://car-inventory.vercel.app/stock-cars/${car._id}`,
                        },
                    })}
                </script>



            </Helmet>


            <div className="car-details-container">


                {/* BACK */}

                <Link
                    to="/stock-cars"
                    className="car-details-back"
                >
                    ← Back to Stock Cars
                </Link>


                {/* IMAGES */}

                <section className="car-gallery">

                    <div className="car-main-image">

                        <img
                            src={images[activeImage]}
                            alt={`${car.brand} ${car.model}`}
                        />

                    </div>


                    {images.length > 1 && (

                        <div className="car-thumbnails">

                            {images.map((image, index) => (

                                <button
                                    type="button"
                                    key={index}
                                    className={
                                        activeImage === index
                                            ? "thumbnail active"
                                            : "thumbnail"
                                    }
                                    onClick={() =>
                                        setActiveImage(index)
                                    }
                                >

                                    <img
                                        src={image}
                                        alt={`${car.brand} ${car.model} ${index + 1}`}
                                    />

                                </button>

                            ))}

                        </div>

                    )}

                </section>


                {/* CAR HEADER */}

                <section className="car-details-header">

                    <div>

                        <p className="car-details-year">
                            {car.manufacturingDate}
                        </p>

                        <h1>
                            {car.brand} {car.model}
                        </h1>

                        <p className="car-details-variant">
                            {car.variant}
                        </p>

                    </div>


                    <div className="car-details-price">

                        <span>
                            Price
                        </span>

                        <strong>
                            ₹{car.price?.toLocaleString("en-IN")}
                        </strong>

                    </div>

                </section>


                {/* QUICK SPECS */}

                <section className="car-quick-specs">

                    <div>
                        <span>
                            Kilometres
                        </span>

                        <strong>
                            {car.kilometres?.toLocaleString()} km
                        </strong>
                    </div>


                    <div>
                        <span>
                            Fuel
                        </span>

                        <strong>
                            {car.fuel}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Transmission
                        </span>

                        <strong>
                            {car.transmission}
                        </strong>
                    </div>


                    <div>
                        <span>
                            Body Type
                        </span>

                        <strong>
                            {car.bodyType || "—"}
                        </strong>
                    </div>

                </section>


                {/* DETAILS */}

                <section className="vehicle-details">

                    <div className="section-heading">

                        <p>
                            VEHICLE INFORMATION
                        </p>

                        <h2>
                            Car Details
                        </h2>

                    </div>


                    <div className="vehicle-details-grid">

                        <div>
                            <span>
                                Brand
                            </span>

                            <strong>
                                {car.brand}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Model
                            </span>

                            <strong>
                                {car.model}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Variant
                            </span>

                            <strong>
                                {car.variant}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Manufacturing Date
                            </span>

                            <strong>
                                {car.manufacturingDate}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Registration Date
                            </span>

                            <strong>
                                {car.registrationDate}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Registration Number
                            </span>

                            <strong>
                                {car.registrationNumber}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Owners
                            </span>

                            <strong>
                                {car.owners}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Colour
                            </span>

                            <strong>
                                {car.colour}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Insurance
                            </span>

                            <strong>
                                {car.insurance}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Status
                            </span>

                            <strong>
                                {car.status}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* INTERESTED */}

                <section className="car-enquiry">

                    <div>

                        <p className="car-enquiry-eyebrow">
                            INTERESTED IN THIS VEHICLE?
                        </p>

                        <h2>
                            Get in touch with us
                        </h2>

                        <p>
                            Contact Car Inventory for
                            more information, availability
                            and a viewing.
                        </p>

                    </div>


                    <div className="car-enquiry-buttons">

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-button"
                        >
                            WhatsApp
                        </a>


                        <a
                            href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-button"
                        >
                            Instagram
                        </a>

                    </div>

                </section>

            </div>

        </main>

    );

};

export default CarDetails;