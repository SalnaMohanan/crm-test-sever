const mongoose = require("mongoose");

const followupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, // ✅ Remove `unique: true` if it exists
    phone: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: true },
    submittedby: { type: String, required: true }
});

const Followups = mongoose.model("Followups", followupSchema);
module.exports = Followups;