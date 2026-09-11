const requireAdmin = (req, res, next) => {

    if (req.session.isAdmin) {
        return next();
    }

    res.status(401).json({
        success: false,
        message: "Unauthorized",
    });
};

module.exports = requireAdmin;