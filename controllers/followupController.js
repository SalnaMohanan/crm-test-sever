const Followups = require('../models/fowlloupModal');

// ✅ Create Follow-up

exports.addFollowup = async (req, res) => {
  try {
    console.log('📥 Incoming Data:', req.body)

    const { name, email, phone, date, status, notes, submittedby } = req.body

    // Type checks (optional, but great for debugging)
    console.log('🧪 Field Types:', {
      name: typeof name,
      email: typeof email,
      phone: typeof phone,
      date: typeof date,
      status: typeof status,
      notes: typeof notes,
      submittedby: typeof submittedby,
    })

    // Field validation
    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !status ||
      !notes ||
      !submittedby
    ) {
      return res.status(400).json({ message: 'All fields are required!' })
    }

    // Duplicate check
    const existingFollowup = await Followups.findOne({ email })
    if (existingFollowup) {
      return res
        .status(400)
        .json({ message: 'Email already exists. Use a different email.' })
    }

    // Create and save follow-up
    const newFollowup = new Followups({
      name,
      email,
      phone,
      date,
      status,
      notes,
      submittedby,
    })

    await newFollowup.save()

    console.log('✅ Follow-up Saved:', newFollowup)

    res.status(201).json({
      message: 'Follow-up added successfully',
      followup: newFollowup,
    })
  } catch (error) {
    console.error('❌ Backend Error:', error)
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}




// Get Followups 
exports.getAddedFollowp = async(req, res) => {
    try {
        const follows = await Followups.find(); // Get all followup

        res.status(200).json(follows);
    } catch (error) {
        console.error("Error fetching followup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get by id

exports.getFollowupById = async(req, res) => {
    try {
        const followup = await Followups.findById(req.params.id);
        if (!followup) {
            return res.status(404).json({ error: "followup not found" });
        }
        res.status(200).json(followup);
    } catch (error) {
        console.error("Error fetching followup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}