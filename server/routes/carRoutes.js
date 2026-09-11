const express = require("express");
const Car = require("../models/car");

const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();



router.post("/", requireAdmin, async (req, res) => {

    try {

        const car = await Car.create(req.body);

        res.status(201).json({
            success: true,
            message: "Car added successfully",
            car,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to add car",
            error: error.message,
        });

    }

});




router.get("/" ,  async (req, res) => {

    try {

        const cars = await Car.find();

        res.json({
            success: true,
            cars,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch cars",
            error: error.message,
        });

    }

});



router.get("/:id", async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.json({
            success: true,
            car,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch car",
            error: error.message,
        });

    }

});




router.patch("/:id", requireAdmin, async (req, res) => {

    try {

        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.json({
            success: true,
            message: "Car updated successfully",
            car,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to update car",
            error: error.message,
        });

    }

});



router.delete("/:id", requireAdmin, async (req, res) => {

    try {

        const car = await Car.findByIdAndDelete(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.json({
            success: true,
            message: "Car deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete car",
            error: error.message,
        });

    }

});

module.exports = router;