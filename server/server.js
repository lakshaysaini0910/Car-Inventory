const express = require("express");
const cors = require("cors");
const session = require("express-session");

require("dotenv").config();
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();
const port = 3000;


// const dns = require("dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);


app.use(
    cors({
        // origin: "http://localhost:5173",
        origin: "https://car-inventory.vercel.app",
        credentials: true,
    })
);
app.use(express.json());
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 30 * 60 * 1000,
        },
    })
);
app.use("/api/admin", adminRoutes);
app.use("/api/cars", carRoutes);



app.get("/", (req, res) => {
    res.send("Car Inventory API is running");
});

connectDB()

app.listen(port, () => {
    console.log(`Car Inventory server running on port ${port}`);
});