const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    campaignname: { type: String, required: true },
    type: { type: String, required: true },
    beginDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["Active", "Planned", "Completed"], // Ensure "Planned" is included
        required: true
    },
    description: { type: String, required: true },
    image: { type: String }
});

module.exports = mongoose.model("Campaign", campaignSchema);