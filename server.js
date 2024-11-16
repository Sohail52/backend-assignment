const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userroutes");
const adminRoutes = require("./routes/adminroutes");

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Assignment Submission Portal API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
