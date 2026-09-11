import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {

    const navigate = useNavigate();


    const handleLogout = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            console.log("Logout response:", data);

            if (data.success) {
                navigate("/admin-login");
            }

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    };


    return (
        <main className="admin-layout">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-sidebar-logo">

                    <img
                        src="/CarLogo.png"
                        alt="Car Inventory"
                    />

                </div>


                <nav className="admin-sidebar-nav">

                    <NavLink to="/admin" end>
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/cars/add">
                        Add Car
                    </NavLink>

                    <NavLink to="/admin/cars/update">
                        Update Car
                    </NavLink>

                    <NavLink to="/admin/cars/delete">
                        Delete Car
                    </NavLink>

                    <NavLink to="/admin/enquiries">
                        Enquiries
                    </NavLink>

                </nav>


                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </aside>


            {/* CURRENT ADMIN PAGE */}

            <section className="admin-page-content">

                <Outlet />

            </section>

        </main>
    );
};

export default AdminNavbar;