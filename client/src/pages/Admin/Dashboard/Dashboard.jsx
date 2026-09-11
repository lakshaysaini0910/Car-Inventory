import { useEffect, useState } from "react";
import "./Dashboard.css";


const Dashboard = () => {

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

                console.error(
                    "Failed to fetch cars:",
                    error
                );

                setError(
                    "Unable to load dashboard data. Please try again later."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCars();

    }, []);


    if (loading) {

        return (
            <main className="admin-dashboard">

                <section className="admin-content">

                    <div className="admin-message">

                        Loading dashboard...

                    </div>

                </section>

            </main>
        );

    }


    if (error) {

        return (
            <main className="admin-dashboard">

                <section className="admin-content">

                    <div className="admin-message">

                        <h2>
                            Unable to load dashboard
                        </h2>

                        <p>
                            {error}
                        </p>

                    </div>

                </section>

            </main>
        );

    }


    const totalCars = cars.length;

    const activeCars = cars.filter(
        (car) => car.status === "available"
    ).length;

    const soldCars = cars.filter(
        (car) => car.status === "sold"
    ).length;


    return (
        <main className="admin-dashboard">

            {/* MAIN CONTENT */}

            <section className="admin-content">

                {/* TOP BAR */}

                <div className="admin-topbar">

                    <div>

                        <p className="admin-eyebrow">
                            ADMIN PANEL
                        </p>

                        <h1>
                            Dashboard
                        </h1>

                    </div>


                    <div className="admin-user">
                        Admin
                    </div>

                </div>


                {/* STAT CARDS */}

                <div className="admin-stats">

                    <div className="admin-stat-card">

                        <span>
                            Total Cars
                        </span>

                        <h2>
                            {totalCars}
                        </h2>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Active Cars
                        </span>

                        <h2>
                            {activeCars}
                        </h2>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            Sold Cars
                        </span>

                        <h2>
                            {soldCars}
                        </h2>

                    </div>


                    <div className="admin-stat-card">

                        <span>
                            New Enquiries
                        </span>

                        <h2>
                            0
                        </h2>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default Dashboard;