const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ success: false, message: "Access Denied: No Role Provided" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Access Denied: Unauthorized Role" });
        }

        next(); // السماح بتمرير الطلب إلى الوظيفة التالية
    };
};

module.exports = authorize;