import React, { useEffect, useState } from "react";
import "./UpdateCars.css";

const UpdateCars = () => {

    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        variant: "",
        bodyType: "SUV",
        transmission: "Automatic",
        manufacturingDate: "",
        registrationDate: "",
        fuel: "Petrol",
        registrationNumber: "",
        kilometres: "",
        owners: "",
        colour: "",
        insurance: "",
        price: "",
        images: "",
        featured: false,
        status: "available",
    });


    /* FETCH CARS */

    const fetchCars = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cars`
            );

            const data = await response.json();

            if (data.success) {
                setCars(data.cars);
            }

        } catch (error) {

            console.error(
                "Failed to fetch cars:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        fetchCars();
    }, []);


    /* SELECT CAR */

    const handleEdit = (car) => {

        setSelectedCar(car);

        setFormData({
            brand: car.brand || "",
            model: car.model || "",
            variant: car.variant || "",
            bodyType: car.bodyType || "SUV",
            transmission: car.transmission || "Automatic",
            manufacturingDate: car.manufacturingDate || "",
            registrationDate: car.registrationDate || "",
            fuel: car.fuel || "Petrol",
            registrationNumber: car.registrationNumber || "",
            kilometres: car.kilometres ?? "",
            owners: car.owners ?? "",
            colour: car.colour || "",
            insurance: car.insurance || "",
            price: car.price ?? "",

            images: Array.isArray(car.images)
                ? car.images.join("\n")
                : "",

            featured: car.featured || false,
            status: car.status || "available",
        });

        setError("");
        setSuccess("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    /* INPUT CHANGE */

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };


    /* UPDATE CAR */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!selectedCar) {
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");


        try {

            const imageLinks = formData.images
                .split("\n")
                .map((url) => url.trim())
                .filter((url) => url !== "");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cars/${selectedCar._id}`,
                {
                    method: "PATCH",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({

                        ...formData,

                        kilometres:
                            Number(formData.kilometres),

                        owners:
                            Number(formData.owners),

                        price:
                            Number(formData.price),

                        images:
                            imageLinks,

                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message ||
                    "Failed to update car"
                );

                return;
            }


            if (data.success) {

                setSuccess(
                    "Car updated successfully."
                );


                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car._id === selectedCar._id
                            ? data.car
                            : car
                    )
                );


                setSelectedCar(data.car);

            }

        } catch (error) {

            console.error(
                "Update error:",
                error
            );

            setError(
                "Unable to connect to server"
            );

        } finally {

            setSaving(false);

        }

    };


    /* CANCEL EDIT */

    const handleCancel = () => {

        setSelectedCar(null);
        setError("");
        setSuccess("");

    };


    return (

        <main className="update-cars-page">

            <div className="update-cars-container">


                {/* HEADER */}

                <header className="update-cars-header">

                    <p className="update-cars-eyebrow">
                        ADMIN PANEL
                    </p>

                    <h1>
                        Update Cars
                    </h1>

                    <p>
                        Select a vehicle and update
                        its information.
                    </p>

                </header>


                {/* UPDATE FORM */}

                {selectedCar && (

                    <form
                        className="update-car-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="update-form-top">

                            <div>

                                <p className="update-form-eyebrow">
                                    EDITING VEHICLE
                                </p>

                                <h2>
                                    {selectedCar.brand}{" "}
                                    {selectedCar.model}
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="close-edit-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>


                        <div className="update-car-fields">


                            {/* BRAND */}

                            <div className="form-group">

                                <label>
                                    Brand
                                </label>

                                <input
                                    name="brand"
                                    type="text"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* MODEL */}

                            <div className="form-group">

                                <label>
                                    Model
                                </label>

                                <input
                                    name="model"
                                    type="text"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* VARIANT */}

                            <div className="form-group">

                                <label>
                                    Variant
                                </label>

                                <input
                                    name="variant"
                                    type="text"
                                    value={formData.variant}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* BODY TYPE */}

                            <div className="form-group">

                                <label>
                                    Body Type
                                </label>

                                <select
                                    name="bodyType"
                                    value={formData.bodyType}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="SUV">
                                        SUV
                                    </option>

                                    <option value="Sedan">
                                        Sedan
                                    </option>

                                    <option value="Hatchback">
                                        Hatchback
                                    </option>

                                    <option value="Coupe">
                                        Coupe
                                    </option>

                                    <option value="Convertible">
                                        Convertible
                                    </option>

                                    <option value="MPV / MUV">
                                        MPV / MUV
                                    </option>

                                    <option value="Pickup Truck">
                                        Pickup Truck
                                    </option>

                                    <option value="Wagon">
                                        Wagon
                                    </option>

                                </select>

                            </div>


                            {/* FUEL */}

                            <div className="form-group">

                                <label>
                                    Fuel
                                </label>

                                <select
                                    name="fuel"
                                    value={formData.fuel}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="Petrol">
                                        Petrol
                                    </option>

                                    <option value="Diesel">
                                        Diesel
                                    </option>

                                </select>

                            </div>


                            {/* TRANSMISSION */}

                            <div className="form-group">

                                <label>
                                    Transmission
                                </label>

                                <select
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="Automatic">
                                        Automatic
                                    </option>

                                    <option value="Manual">
                                        Manual
                                    </option>

                                </select>

                            </div>


                            {/* MANUFACTURING DATE */}

                            <div className="form-group">

                                <label>
                                    Manufacturing Date

                                    <span className="input-hint">
                                        Month / Year
                                    </span>

                                </label>

                                <input
                                    name="manufacturingDate"
                                    type="month"
                                    value={
                                        formData.manufacturingDate
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* REGISTRATION DATE */}

                            <div className="form-group">

                                <label>
                                    Registration Date
                                </label>

                                <input
                                    name="registrationDate"
                                    type="date"
                                    value={
                                        formData.registrationDate
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* REGISTRATION NUMBER */}

                            <div className="form-group">

                                <label>
                                    Registration Number
                                </label>

                                <input
                                    name="registrationNumber"
                                    type="text"
                                    value={
                                        formData.registrationNumber
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* KILOMETRES */}

                            <div className="form-group">

                                <label>
                                    Kilometres
                                </label>

                                <input
                                    name="kilometres"
                                    type="number"
                                    min="0"
                                    value={
                                        formData.kilometres
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* OWNERS */}

                            <div className="form-group">

                                <label>
                                    Owners
                                </label>

                                <input
                                    name="owners"
                                    type="number"
                                    min="1"
                                    value={formData.owners}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* COLOUR */}

                            <div className="form-group">

                                <label>
                                    Colour
                                </label>

                                <input
                                    name="colour"
                                    type="text"
                                    value={formData.colour}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* INSURANCE */}

                            <div className="form-group">

                                <label>
                                    Insurance
                                </label>

                                <input
                                    name="insurance"
                                    type="text"
                                    value={formData.insurance}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* PRICE */}

                            <div className="form-group">

                                <label>
                                    Price
                                </label>

                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* STATUS */}

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="available">
                                        Available
                                    </option>

                                    <option value="sold">
                                        Sold
                                    </option>

                                </select>

                            </div>


                            {/* IMAGES */}

                            <div className="form-group form-group-full">

                                <label>
                                    Image Links

                                    <span className="input-hint">
                                        One URL per line
                                    </span>

                                </label>

                                <textarea
                                    name="images"
                                    value={formData.images}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder={
                                        "https://example.com/car-front.jpg\n" +
                                        "https://example.com/car-side.jpg\n" +
                                        "https://example.com/car-interior.jpg"
                                    }
                                />

                            </div>

                        </div>


                        {/* BOTTOM */}

                        <div className="update-car-bottom">

                            <label className="featured-checkbox">

                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={
                                        formData.featured
                                    }
                                    onChange={handleChange}
                                />

                                <span>
                                    Featured Car
                                </span>

                            </label>


                            {error && (

                                <p className="update-error">
                                    {error}
                                </p>

                            )}


                            {success && (

                                <p className="update-success">
                                    {success}
                                </p>

                            )}


                            <div className="update-actions">

                                <button
                                    type="button"
                                    className="update-cancel-button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="update-save-button"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}

                                </button>

                            </div>

                        </div>

                    </form>

                )}


                {/* CAR LIST */}

                <section className="update-cars-list">

                    <div className="update-cars-list-header">

                        <h2>
                            Inventory
                        </h2>

                        <span>
                            {cars.length} vehicles
                        </span>

                    </div>


                    {loading ? (

                        <p className="update-cars-message">
                            Loading cars...
                        </p>

                    ) : cars.length === 0 ? (

                        <p className="update-cars-message">
                            No cars available.
                        </p>

                    ) : (

                        <div className="update-cars-grid">

                            {cars.map((car) => (

                                <article
                                    className="update-car-card"
                                    key={car._id}
                                >

                                    <div className="update-car-image">

                                        <img
                                            src={car.images?.[0]}
                                            alt={`${car.brand} ${car.model}`}
                                        />

                                    </div>


                                    <div className="update-car-info">

                                        <p className="update-car-year">
                                            {car.manufacturingDate}
                                        </p>

                                        <h3>
                                            {car.brand}{" "}
                                            {car.model}
                                        </h3>

                                        <p className="update-car-variant">
                                            {car.variant}
                                        </p>


                                        <div className="update-car-details">

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


                                        <div className="update-car-bottom">

                                            <strong>
                                                ₹{car.price?.toLocaleString("en-IN")}
                                            </strong>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(car)
                                                }
                                            >
                                                Edit
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
};

export default UpdateCars;