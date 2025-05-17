const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    company: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String, required: true },
    notes: { type: String },
    // assignedTo: { type: String, required: true } // assignedTo: String
});

module.exports = mongoose.model("Customer", customerSchema);