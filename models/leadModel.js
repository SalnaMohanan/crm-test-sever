const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    source: { type: String, required: true },
    status: { type: String, required: true },
    assignedTo: { type: String, required: true },
    notes: { type: String, required: true },
});

module.exports = mongoose.model("Lead", LeadSchema);