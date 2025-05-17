const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Message must be at least 10 characters"],
    },
});

module.exports = mongoose.model("Contact", contactSchema);