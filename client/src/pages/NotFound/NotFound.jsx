import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {

    return (
        <main className="not-found-page">

            <p className="not-found-eyebrow">
                Car Inventory
            </p>

            <h1>
                404
            </h1>

            <h2>
                Page Not Found
            </h2>

            <p>
                The page you're looking for doesn't exist
                or may have been moved.
            </p>

            <Link to="/" className="not-found-button">
                Back to Home
            </Link>

        </main>
    );
};

export default NotFound;