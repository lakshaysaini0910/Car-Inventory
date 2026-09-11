import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                navigate("/admin");
            } else {
                setError(data.message);
            }

        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    return (
        <main className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-logo">
                    <img
                        src="/logo.png"
                        alt="Car Inventory"
                    />
                </div>


                <div className="admin-login-heading">

                    <p>
                        Car Inventory
                    </p>

                    <h1>
                        Admin Login
                    </h1>

                    <span>
                        Access your dealership dashboard
                    </span>

                </div>


                <form
                    className="admin-login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="admin-form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter username"
                            required
                        />

                    </div>


                    <div className="admin-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />

                    </div>


                    {error && (
                        <p className="admin-login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-login-button"
                    >
                        Login
                    </button>

                </form>


                <p className="admin-login-footer">
                    Authorized personnel only
                </p>

            </div>

        </main>
    );
};

export default AdminLogin;