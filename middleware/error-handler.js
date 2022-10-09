const { Custom404Error } = require("../errors/Custom404Error");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof Custom404Error) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    } else {
        return res.status(500).json({
            success: false,
            data: "Invalid task id",
        });
    }
};

module.exports = { errorHandler };

//this guy handles errors that comes from the async-wrapper using the next middleware
//err.message coming from the instnce of the error class
