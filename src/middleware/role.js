 function adminOnly(req, res, next) {
    if (req.user && req.user.role === "admin") {
    next();
    } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
    }
}

 function validateObjectId(paramName) {
    return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
        return res.status(400).json({ message: `Invalid ${paramName}` });
    }
    next();
    };
}

module.exports = {
  validateObjectId,
  adminOnly
};