class Custom404Error extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const create404ErrorMessage = (message, statusCode) => {
    return new Custom404Error(message, statusCode);
};

module.exports = { Custom404Error, create404ErrorMessage };
