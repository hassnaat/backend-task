const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)
    if (!authorization) {
        return res.status(401).send("You are not logged in")
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403)


        next();

    })
}