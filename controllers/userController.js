const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminmodel");
const User = require("../models/usermodel");
const Assignment = require("../models/assignmentmodel");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload an assignment
const uploadAssignment = async (req, res) => {
    const { userId, task, admin } = req.body;

    console.log("Received Request Body: ", req.body); // Debugging log

    try {
        // Lookup the admin by email
        const adminDoc = await Admin.findOne({ email: admin });
        if (!adminDoc) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Ensure `userId` is provided
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Create a new assignment with the admin's ObjectId
        const assignment = await Assignment.create({
            userId,
            task,
            admin: adminDoc._id, // Convert email to ObjectId
        });

        res.status(201).json({ message: "Assignment uploaded successfully", assignment });
    } catch (error) {
        console.error("Error during assignment upload: ", error); // Detailed log
        res.status(500).json({ message: error.message });
    }
};



module.exports = { registerUser, loginUser, uploadAssignment };
