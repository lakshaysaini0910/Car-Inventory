import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedCars.css";

const FeaturedCars = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchCars = async () => {

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/cars`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch cars");
                }

                const data = await response.json();

                if (data.success) {
                    setCars(data.cars);
                } else {
                    throw new Error(
                        data.message || "Failed to fetch cars"
                    );
                }

            } catch (error) {

                console.log("Failed to fetch cars:", error);

                setError(
                    "Unable to load cars. Please try again later."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCars();

    }, []);


    const featuredCars = cars.filter(
        (car) => car.featured === true && car.status === "available"
    );

    const availableCars = cars.filter(
        (car) => car.status === "available"
    );


    const displayedCars =
        featuredCars.length > 0
            ? featuredCars.slice(0, 4)
            : availableCars.slice(0, 4);


    return (
        <section className="featured-cars">

            <div className="featured-cars-header">

                <div>

                    <p className="featured-cars-eyebrow">
                        OUR COLLECTION
                    </p>

                    <h2>
                        {featuredCars.length > 0
                            ? "Featured Cars"
                            : "Our Cars"}
                    </h2>

                </div>


                <Link
                    to="/stock-cars"
                    className="featured-view-all"
                >
                    View All Cars →
                </Link>

            </div>


            {loading ? (

                <div className="featured-no-cars">
                    <p>Loading cars...</p>
                </div>

            ) : error ? (

                <div className="featured-no-cars">

                    <h3>
                        Unable to load cars
                    </h3>

                    <p>
                        {error}
                    </p>

                </div>

            ) : displayedCars.length > 0 ? (

                <div className="featured-cars-grid">

                    {displayedCars.map((car) => (

                        <Link to={`/stock-cars/${car._id}`} className="featured-car-card" key={car._id}>

                            <div className="featured-car-image">

                                <img
                                    src={car.images?.[0]}
                                    alt={`${car.brand} ${car.model}`}
                                />

                                {car.featured && (
                                    <span className="featured-badge">
                                        Featured
                                    </span>
                                )}

                            </div>


                            <div className="featured-car-info">

                                <p className="featured-car-year">
                                    {car.manufacturingDate}
                                </p>

                                <h3>
                                    {car.brand} {car.model}
                                </h3>


                                <div className="featured-car-specs">

                                    <span>
                                        {car.kilometres?.toLocaleString()} km
                                    </span>

                                    <span>
                                        {car.fuel}
                                    </span>

                                    <span>
                                        {car.transmission}
                                    </span>

                                </div>


                                <div className="featured-car-bottom">

                                    <strong>
                                        ₹{car.price?.toLocaleString("en-IN")}
                                    </strong>

                                    <span className="featured-view-details" >
                                        View Details
                                    </span>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            ) : (

                <div className="featured-no-cars">

                    <h3>
                        No cars available right now
                    </h3>

                    <p>
                        Please check back soon for our latest vehicles.
                    </p>

                </div>

            )}

        </section>
    );
};

export default FeaturedCars;