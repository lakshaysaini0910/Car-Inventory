const express = require("express")
const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "12345") {

        req.session.isAdmin = true;

        return res.json({
            success: true,
            message: "Login successful",
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password",
    });
});




router.get("/check", (req, res) => {

    if (req.session.isAdmin) {
        return res.json({
            authenticated: true,
        });
    }

    res.status(401).json({
        authenticated: false,
    });
});




router.post("/logout", (req, res) => {
    req.session.destroy((err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed",
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    });
});

module.exports = router;