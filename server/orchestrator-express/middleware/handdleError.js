"use strict"

function errorHandle(err, req, res, next) {
    console.log(err);
    let code = 500
    let message = "Internal Server Error"

    res.status(code).json({
        message
    })
}

module.exports = errorHandle