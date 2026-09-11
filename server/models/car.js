const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },

    model: {
        type: String,
        required: true,
    },

    variant: {
        type: String,
        required: true,
    },

    bodyType: {
        type: String,
        required: true,
        enum: [
            "SUV",
            "Sedan",
            "Hatchback",
            "Coupe",
            "Convertible",
            "MPV / MUV",
            "Pickup Truck",
            "Wagon"
        ]
    },

    transmission: {
        type: String,
        required: true,
    },

    manufacturingDate: {
        type: String,
        required: true,
    },

    registrationDate: {
        type: String,
        required: true,
    },

    fuel: {
        type: String,
        required: true,
    },

    registrationNumber: {
        type: String,
        required: true,
    },

    kilometres: {
        type: Number,
        required: true,
    },

    owners: {
        type: Number,
        required: true,
    },

    colour: {
        type: String,
        required: true,
    },

    insurance: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    images: {
        type: [String],
        default: [],
    },

    featured: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        default: "available",
    },
});

module.exports = mongoose.model("Car", carSchema);