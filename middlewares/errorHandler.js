function errorHandler(err, req, res, next) {
    let code = 500
    let message = "Internal Server Error"

    if (err.name === "invalid_username/password") {
        code = 401
        message = "Invalid Username or Password"
    } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        code = 401
        message = "Invalid token"
    } else if (err.name === "Unauthorized") {
        code = 401
        message = "Unauthorized"
    } else if (err.name === "not_found") {
        code = 404
        message = "Data not found"
    } else if (err.name === "forbidden") {
        code = 403
        message = "Forbidden"
    }

    res.status(code).json({ message })
}

module.exports = errorHandler