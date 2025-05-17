const Customer = require("../models/customerModel");

// ✅ Add a new customer (with salesperson tracking)
exports.addCustomer = async(req, res) => {
    try {
        console.log("Received Data:", req.body); // Log incoming request data

        const { name, email, phone, address, company, industry, website, notes } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !address || !company || !industry || !website) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
            company,
            industry,
            website,
            notes
        });

        await newCustomer.save();
        return res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
        console.error("Error adding customer:", error.message);
        res.status(500).json({ error: "Failed to add customer", details: error.message });
    }
};




exports.getAddedCustomers = async(req, res) => {
    try {
        const customers = await Customer.find(); // Get all customers

        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCustomerById = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update customer by ID
exports.updateCustomerById = async(req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.json(updatedCustomer);
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteCustomerById = async(req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Server error" });
    }
};