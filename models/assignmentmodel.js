const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists to prevent overwriting
const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
