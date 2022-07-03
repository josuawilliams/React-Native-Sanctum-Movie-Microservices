"use strict";
const jwt = require('jsonwebtoken');

function CreateToken(data) {
    var token = jwt.sign(data, process.env.SECRET);
    return token
}

function readToken(data) {
    var decoded = jwt.verify(data, process.env.SECRET);
    return decoded
}

module.exports = {
    CreateToken,
    readToken
}