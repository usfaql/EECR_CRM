const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied: No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), "YOUR_SECRET_KEY");
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: "Invalid or Expired Token" });
    }
};

module.exports = authenticateUser;
