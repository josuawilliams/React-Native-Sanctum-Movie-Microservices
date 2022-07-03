"use strict";

const errorHandle = ((err, req, res, next) => {
    let code = 500
    let message = "Internal Server Error"
    // 401 Unauthorized
    if(err.name === "Username Or Password Wrong"){
        code = 401
        message = "Username or Password Wrong"
    }
    if(err.name === "JsonWebTokenError"){
        code = 401
        message = "Invalid Token"
    }

    //404 Not Found
    if(err.name === "User Not Found"){
        code = 404,
        message = "User Not Found"
    }
    if(err.name === "Movie Not Found"){
        code = 404,
        message = "Movie Not Found"
    }

    //400 Bad Request
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        code = 400,
        message = err.errors.map((el)=> el.message).join(", ")
    }
    //403 Forbidden
    if(err.name === "Not Allowed"){
        code = 403,
        message = "Customer Not Allowed"
    }
    if(err.name === "Staff Not Allowed"){
        code = 403,
        message = "Staff Not Allowed"
    }
    if(err.name === "Not Allowed To Delete This"){
        code = 403,
        message = "Not Allowed For You"
    }
    res.status(code).json({
        message
    })
})

module.exports = errorHandle