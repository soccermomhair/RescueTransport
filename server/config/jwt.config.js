const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    console.log(req.cookies.userToken, "tring to find the cookie!")
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}