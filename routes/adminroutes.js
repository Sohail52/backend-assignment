const express = require("express");
const { registerAdmin, loginAdmin, viewAssignments, acceptAssignment, rejectAssignment } = require("../controllers/adminController");
const authenticate = require("../middlware/authmiddleware"); // Updated path
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/assignments", authenticate, viewAssignments);  // Protect the assignments route
router.post("/assignments/:id/accept", acceptAssignment);
router.post("/assignments/:id/reject", rejectAssignment);

module.exports = router;
