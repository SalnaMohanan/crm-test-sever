const Contact = require("../models/contact");

exports.submitContactForm = async(req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: "Message received!" });
    } catch (error) {
        console.error("Contact form submission error:", error);
        res.status(500).json({ error: "Server error" });
    }
};