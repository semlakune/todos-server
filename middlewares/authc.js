const { User } = require('../models/User');
const { verify } = require("jsonwebtoken")

module.exports = function authc (req, res, next) {
    const { access_token } = req.headers
    const checkToken = verify(access_token, process.env.JWT_TOKEN)
    User.findById(checkToken.id)
        .then((data) => {
            if (!data) throw { name: "Unauthorized" };
            req.user = { id: data._id };
            next()
        })
        .catch((err) => {
            next(err)
        })

}