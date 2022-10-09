const asyncWrapper = (controllers) => {
    return async (req, res, next) => {
        try {
            await controllers(req, res, next);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
};

module.exports = { asyncWrapper };
