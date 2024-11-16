const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(400).json({ message: "Invalid Token Format" });
    }

    const actualToken = tokenParts[1];

    try {
        const verified = jwt.verify(actualToken, process.env.JWT_SECRET);

        // Ensure that verified data contains the required user info
        req.user = verified;

        console.log('Authenticated user:', req.user);  // For debugging

        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authenticate;
