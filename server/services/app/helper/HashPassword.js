const bcrypt = require('bcryptjs');

function hashPass(data) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data, salt);
    return hash
}

function readHash(data, hash) {
   return bcrypt.compareSync(data, hash);
}

module.exports = {
    hashPass,
    readHash
}
