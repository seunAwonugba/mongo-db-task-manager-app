const resourceNotFound = (req, res) => {
    res.status(404).json({
        success: false,
        data: "Resource not found",
    });
};

module.exports = { resourceNotFound };
