import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const checkAuthentication = async () => {

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/admin/check`,
                    {
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    setAuthenticated(true);
                }

            } catch (error) {
                console.error("Authentication check failed:", error);
            }

            setLoading(false);
        };

        checkAuthentication();

    }, []);

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

export default ProtectedRoute;