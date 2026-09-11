import { useEffect, useState } from "react";
import "./DeleteCars.css";

const DeleteCars = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);


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

            console.error(
                "Failed to fetch cars:",
                error
            );

            setError(
                "Unable to load cars. Please try again later."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchCars();
    }, []);


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this car?"
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cars/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (data.success) {

                setCars((prevCars) =>
                    prevCars.filter((car) => car._id !== id)
                );

            } else {

                alert(
                    data.message || "Failed to delete car"
                );

            }

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                "Unable to connect to server"
            );

        } finally {

            setDeletingId(null);

        }

    };


    return (
        <main className="delete-cars-page">

            <section className="delete-cars-container">

                <header className="delete-cars-header">

                    <p className="delete-cars-eyebrow">
                        ADMIN PANEL
                    </p>

                    <h1>
                        Delete Cars
                    </h1>

                    <p>
                        Remove vehicles from the Car Inventory inventory.
                    </p>

                </header>


                <section className="delete-cars-list">

                    <div className="delete-cars-list-header">

                        <h2>
                            Inventory
                        </h2>

                        <span>
                            {cars.length} vehicles
                        </span>

                    </div>


                    {loading ? (

                        <p className="delete-cars-message">
                            Loading cars...
                        </p>

                    ) : error ? (

                        <p className="delete-cars-message">
                            {error}
                        </p>

                    ) : cars.length === 0 ? (

                        <p className="delete-cars-message">
                            No cars available.
                        </p>

                    ) : (

                        <div className="delete-cars-grid">

                            {cars.map((car) => (

                                <article
                                    className="delete-car-card"
                                    key={car._id}
                                >

                                    <div className="delete-car-image">

                                        <img
                                            src={car.images?.[0]}
                                            alt={`${car.brand} ${car.model}`}
                                        />

                                    </div>


                                    <div className="delete-car-info">

                                        <p className="delete-car-year">
                                            {car.manufacturingDate}
                                        </p>

                                        <h3>
                                            {car.brand} {car.model}
                                        </h3>

                                        <p className="delete-car-variant">
                                            {car.variant}
                                        </p>


                                        <div className="delete-car-details">

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


                                        <div className="delete-car-bottom">

                                            <strong>
                                                ₹{car.price.toLocaleString("en-IN")}
                                            </strong>

                                            <button
                                                onClick={() =>
                                                    handleDelete(car._id)
                                                }
                                                disabled={
                                                    deletingId === car._id
                                                }
                                            >
                                                {deletingId === car._id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </section>

        </main>
    );
};

export default DeleteCars;