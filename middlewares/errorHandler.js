const errorHandler = (err, req, res, next) => {
    res.json({
        "title": "Error Title",
        "message": err.message,
        "stackTrace": err.stack,
    });
}

module.exports = errorHandler;