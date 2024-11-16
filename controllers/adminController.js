const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminmodel");
const Assignment = require("../models/assignmentmodel");

// Register a new admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = await Admin.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login an admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View assignments tagged to the admin
const viewAssignments = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        console.log('Admin ID:', req.user.id);  // Log the user ID for debugging

        const assignments = await Assignment.find();  // Replace with your database query logic
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving assignments" });
    }
};


// Accept an assignment
const acceptAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        // Update assignment status to "Accepted"
        const assignment = await Assignment.findByIdAndUpdate(id, { status: "Accepted" }, { new: true });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.status(200).json({ message: "Assignment accepted", assignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject an assignment
const rejectAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid assignment ID format" });
        }

        // Update the assignment's status to "Rejected"
        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { status: "Rejected" },
            { new: true } // Return the updated document
        );

        // Check if assignment exists
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Respond with the updated assignment
        res.status(200).json({
            message: "Assignment rejected successfully",
            assignment,
        });
    } catch (error) {
        console.error(`Error rejecting assignment: ${error.message}`);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


module.exports = { registerAdmin, loginAdmin, viewAssignments, acceptAssignment, rejectAssignment };
