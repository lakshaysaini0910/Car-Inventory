import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCars.css";

const AddCars = () => {

    const navigate = useNavigate();

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

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const imageLinks = formData.images
                .split("\n")
                .map((url) => url.trim())
                .filter((url) => url !== "");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cars`,
                {
                    method: "POST",
                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({

                        ...formData,

                        kilometres: Number(formData.kilometres),

                        owners: Number(formData.owners),

                        price: Number(formData.price),

                        images: imageLinks,

                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message || "Failed to add car"
                );

                return;
            }


            if (data.success) {

                setSuccess(
                    "Car added successfully."
                );


                setFormData({
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

            }

        } catch (error) {

            setError(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <main className="add-car-page">

            <div className="add-car-container">


                {/* HEADER */}

                <header className="add-car-header">

                    <p className="add-car-eyebrow">
                        ADMIN PANEL
                    </p>

                    <h1>
                        Add Car
                    </h1>

                    <p>
                        Add a vehicle to the Car Inventory inventory.
                    </p>

                </header>


                {/* FORM */}

                <form
                    className="add-car-form"
                    onSubmit={handleSubmit}
                >


                    <div className="add-car-fields">


                        {/* BRAND */}

                        <div className="form-group">

                            <label htmlFor="brand">
                                Brand
                            </label>

                            <input
                                id="brand"
                                name="brand"
                                type="text"
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
                            </label>

                            <input
                                id="model"
                                name="model"
                                type="text"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="e.g. 5 Series"
                                required
                            />

                        </div>


                        {/* VARIANT */}

                        <div className="form-group">

                            <label htmlFor="variant">
                                Variant
                            </label>

                            <input
                                id="variant"
                                name="variant"
                                type="text"
                                value={formData.variant}
                                onChange={handleChange}
                                placeholder="e.g. 530d M Sport"
                                required
                            />

                        </div>


                        {/* BODY TYPE */}

                        <div className="form-group">

                            <label htmlFor="bodyType">
                                Body Type
                            </label>

                            <select
                                id="bodyType"
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

                            <label htmlFor="fuel">
                                Fuel
                            </label>

                            <select
                                id="fuel"
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

                            <label htmlFor="transmission">
                                Transmission
                            </label>

                            <select
                                id="transmission"
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

                            <label htmlFor="manufacturingDate">

                                Manufacturing Date

                                <span className="input-hint">
                                    Month / Year
                                </span>

                            </label>

                            <input
                                id="manufacturingDate"
                                name="manufacturingDate"
                                type="month"
                                value={formData.manufacturingDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* REGISTRATION DATE */}

                        <div className="form-group">

                            <label htmlFor="registrationDate">
                                Registration Date
                            </label>

                            <input
                                id="registrationDate"
                                name="registrationDate"
                                type="date"
                                value={formData.registrationDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* REGISTRATION NUMBER */}

                        <div className="form-group">

                            <label htmlFor="registrationNumber">
                                Registration Number
                            </label>

                            <input
                                id="registrationNumber"
                                name="registrationNumber"
                                type="text"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                placeholder="e.g. HR26"
                                required
                            />

                        </div>


                        {/* KILOMETRES */}

                        <div className="form-group">

                            <label htmlFor="kilometres">
                                Kilometres
                            </label>

                            <input
                                id="kilometres"
                                name="kilometres"
                                type="number"
                                min="0"
                                value={formData.kilometres}
                                onChange={handleChange}
                                placeholder="e.g. 49544"
                                required
                            />

                        </div>


                        {/* OWNERS */}

                        <div className="form-group">

                            <label htmlFor="owners">
                                Owners
                            </label>

                            <input
                                id="owners"
                                name="owners"
                                type="number"
                                min="1"
                                value={formData.owners}
                                onChange={handleChange}
                                placeholder="e.g. 1"
                                required
                            />

                        </div>


                        {/* COLOUR */}

                        <div className="form-group">

                            <label htmlFor="colour">
                                Colour
                            </label>

                            <input
                                id="colour"
                                name="colour"
                                type="text"
                                value={formData.colour}
                                onChange={handleChange}
                                placeholder="e.g. Black"
                                required
                            />

                        </div>


                        {/* INSURANCE */}

                        <div className="form-group">

                            <label htmlFor="insurance">
                                Insurance
                            </label>

                            <input
                                id="insurance"
                                name="insurance"
                                type="text"
                                value={formData.insurance}
                                onChange={handleChange}
                                placeholder="e.g. 2027-02-05 ZD"
                                required
                            />

                        </div>


                        {/* PRICE */}

                        <div className="form-group">

                            <label htmlFor="price">
                                Price
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 2095000"
                                required
                            />

                        </div>


                        {/* STATUS */}

                        <div className="form-group">

                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
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


                        {/* IMAGE LINKS */}

                        <div className="form-group form-group-full">

                            <label htmlFor="images">

                                Image Links

                                <span className="input-hint">
                                    One URL per line
                                </span>

                            </label>

                            <textarea
                                id="images"
                                name="images"
                                value={formData.images}
                                onChange={handleChange}
                                placeholder={
                                    "https://example.com/car-front.jpg\n" +
                                    "https://example.com/car-side.jpg\n" +
                                    "https://example.com/car-interior.jpg"
                                }
                                rows="5"
                            />

                        </div>

                    </div>


                    {/* BOTTOM */}

                    <div className="add-car-bottom">


                        {/* FEATURED */}

                        <label className="featured-checkbox">

                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                            />

                            <span>
                                Featured Car
                            </span>

                        </label>


                        {/* ERROR */}

                        {error && (

                            <p className="add-car-error">
                                {error}
                            </p>

                        )}


                        {/* SUCCESS */}

                        {success && (

                            <p className="add-car-success">
                                {success}
                            </p>

                        )}


                        {/* ACTIONS */}

                        <div className="add-car-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => navigate("/admin")}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="add-car-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Adding Car..."
                                    : "Add Car"}

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </main>
    );
};

export default AddCars;