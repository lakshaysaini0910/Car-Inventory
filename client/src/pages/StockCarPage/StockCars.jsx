import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./StockCars.css";

const StockCars = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("All");
    const [fuel, setFuel] = useState("All");
    const [transmission, setTransmission] = useState("All");
    const [bodyType, setBodyType] = useState("All");


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



    const filteredCars = cars.filter((car) => {

        const matchesSearch =
            `${car.brand} ${car.model}`
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesBrand =
            brand === "All" || car.brand === brand;

        const matchesFuel =
            fuel === "All" || car.fuel === fuel;

        const matchesTransmission =
            transmission === "All" ||
            car.transmission === transmission;

        const matchesBodyType =
            bodyType === "All" ||
            car.bodyType === bodyType;

        return (
            matchesSearch &&
            matchesBrand &&
            matchesFuel &&
            matchesTransmission &&
            matchesBodyType
        );
    });


    return (

        <main className="stock-cars-page">

            <Helmet>
                <title>Used Cars for Sale | Car Inventory</title>

                <meta
                    name="description"
                    content="Browse quality pre-owned cars for sale at Car Inventory. Explore our available vehicles by brand, fuel type, transmission and body type."
                />

                <link
                    rel="canonical"
                    href="https://car-inventory.vercel.app/stock-cars"
                />

                <meta
                    property="og:title"
                    content="Used Cars for Sale | Car Inventory"
                />

                <meta
                    property="og:description"
                    content="Browse quality pre-owned cars for sale at Car Inventory. Explore our available vehicles by brand, fuel type, transmission and body type."
                />

                <meta
                    property="og:url"
                    content="https://car-inventory.vercel.app/stock-cars"
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


            <section className="stock-cars-header">

                <p className="stock-cars-eyebrow">
                    Car Inventory
                </p>

                <h1>
                    Find Your Next Car
                </h1>

                <p>
                    Explore our collection of quality
                    pre-owned vehicles.
                </p>

            </section>


            {/* FILTERS */}

            <section className="car-filters">

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search brand or model..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>


                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                >
                    <option value="All">All Brands</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Porsche">Porsche</option>
                </select>


                <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                >
                    <option value="All">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>


                <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                >
                    <option value="All">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>


                <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                >
                    <option value="All">All Body Types</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupe">Coupe</option>
                </select>

            </section>


            {/* RESULTS */}

            {loading && (

                <div className="cars-message">
                    <p>Loading cars...</p>
                </div>

            )}

            {error && !loading && (

                <div className="cars-message">
                    <h3>
                        Unable to load cars
                    </h3>

                    <p>
                        {error}
                    </p>

                </div>

            )}

            {!loading && !error && (

                <section className="cars-section">


                    <div className="cars-result-header">

                        <h2>
                            Available Cars
                        </h2>

                        <span>
                            {filteredCars.length} vehicles
                        </span>

                    </div>


                    <div className="cars-grid">

                        {filteredCars.map((car) => (

                            <article
                                className="car-card"
                                key={car._id}
                            >

                                <div className="car-image">

                                    <img
                                        src={car.images?.[0]}
                                        alt={`${car.brand} ${car.model}`}
                                    />

                                </div>


                                <div className="car-info">

                                    <p className="car-year">
                                        {car.manufacturingDate}
                                    </p>

                                    <h3>
                                        {car.brand} {car.model}
                                    </h3>


                                    <div className="car-specs">

                                        <span>
                                            {car.kilometres.toLocaleString()} km
                                        </span>

                                        <span>
                                            {car.fuel}
                                        </span>

                                        <span>
                                            {car.transmission}
                                        </span>

                                    </div>


                                    <div className="car-bottom">

                                        <strong>
                                            ₹{car.price.toLocaleString("en-IN")}
                                        </strong>

                                        <Link to={`/stock-cars/${car._id}`} className="view-details-button">
                                            View Details
                                        </Link>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>


                    {filteredCars.length === 0 && (

                        <div className="no-cars">

                            <h3>
                                No cars found
                            </h3>

                            <p>
                                Try changing your search or filters.
                            </p>

                        </div>

                    )}

                </section>

            )}

        </main>
    );
};

export default StockCars;