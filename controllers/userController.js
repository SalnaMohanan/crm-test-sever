const users = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


exports.addUserController = async(req, res) => {
    console.log("Inside addUserController");
    const { username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json({ error: "User already exists" });
        }

        // Validate role
        if (!["manager", "salesperson"].includes(role.toLowerCase())) {
            return res.status(400).json({ error: "Invalid role! Choose 'manager' or 'salesperson'." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new users({ username, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error in addUserController:", err);
        res.status(500).json({ error: "Registration failed" });
    }
};

exports.loginController = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if the user exists
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userid: existingUser._id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET, { expiresIn: "1h" }
        );

        // Return response
        res.status(200).json({ message: "Login successful", user: existingUser, token });
    } catch (err) {
        console.error("Error in loginController:", err);
        res.status(500).json({ error: "Login failed" });
    }
};

exports.getSalespersons = async(req, res) => {
    try {
        const salespersons = await users.find({ role: "salesperson" }); // Fetch only salespersons
        res.json(salespersons);
    } catch (error) {
        console.error("Error fetching salespersons:", error);
        res.status(500).json({ error: "Failed to fetch salespersons" });
    }
};