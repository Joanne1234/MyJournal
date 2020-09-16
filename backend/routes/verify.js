const jwt = require("jsonwebtoken");

function verify (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({msg: "Access denied"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (verifyRefresh(req.header("refresh-token")))  {
                req.user = user;
                next();
            }
            else {
                return res.status(403).send({msg: "Access denied"})
            }
        }
        req.user = user;
        next();
    });
}

function verifyRefresh (token) {
    if (!token) return null;
    jwt.verify(token, process.env.ACCESS_REFRESH_TOKEN, (err, user) => {
        if (err) {
            return null
        }
        return user;
    });
}

module.exports = {verify, verifyRefresh};
