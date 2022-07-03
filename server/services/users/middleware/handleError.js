const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = "Internal Server Error"
    //400 Bad Request

    if(err.name === "Validation Error"){
        code = 400,
        message = err.errors.map((el)=>el).join(", ")
    }
    //404 Not Found
    if(err.name === "User Not Found"){
        code = 404,
        message = "User Not Found"
    }
    if(err.name === "BSONTypeError"){
        code = 404,
        message = "User Not Found"
    }
    res.status(code).json({
        message
    })
}

module.exports = errorHandler