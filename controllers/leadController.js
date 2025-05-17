const Leads = require('../models/leadModel')

exports.addLeadController = async (req, res) => {
  console.log('Request Body:', req.body)

  const { name, email, phone, source, status, assignedTo, notes } = req.body

  try {
    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !source ||
      !status ||
      !assignedTo ||
      !notes
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if the email already exists
    const existingLead = await Leads.findOne({ email })
    if (existingLead) {
      return res
        .status(400)
        .json({ message: 'Lead with this email already exists' })
    }

    const newLead = new Leads({
      name,
      email,
      phone,
      source,
      status,
      assignedTo,
      notes,
    })

    await newLead.save()
    res.status(201).json(newLead)
  } catch (error) {
    console.error('Error adding lead:', error)
    // Handle Mongoose duplicate key error for unique fields
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Lead with this email already exists' })
    }
    res.status(400).json({ message: 'Validation failed', error: error.message })
  }
}



exports.getAllLeadsController = async(req, res) => {
    try {
        const leads = await Leads.find(); // Fetch all leads
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leads", error: error.message });
    }
};
// Get lead by ID
exports.getLeadById = async(req, res) => {
    try {
        const lead = await Leads.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json(lead);
    } catch (error) {
        console.error("Error fetching lead:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Delete Campaign Controller
exports.deleteLead = async(req, res) => {
    try {
        const lead = await Leads.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "lead not found" });
        }
        res.status(200).json({ message: "lead deleted successfully" });
    } catch (error) {
        console.error("Error deleting lead:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Update laad by ID
exports.updateLead = async(req, res) => {
    try {
        console.log("Updating lead ID:", req.params.id); // Debugging line

        const updatedLead = await Leads.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (!updatedLead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.status(200).json({ message: "Lead updated successfully", campaign: updatedLead });
    } catch (error) {
        console.error("Error updating lead:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};