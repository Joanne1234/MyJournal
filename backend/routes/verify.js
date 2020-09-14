const jwt = require("jsonwebtoken");

function verify (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid Token")
        }
        req.user = user;
        next();
    });
}

function verifyRefresh (req, res, next) {
    const token = req.header("refresh-token");
    if (!token) return res.status(401).send("Access denied");
    jwt.verify(token, process.env.ACCESS_REFRESH_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid Token")
        }
        req.user = user;
        next();
    });
}

module.exports = {verify, verifyRefresh};
