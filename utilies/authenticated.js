const jwt = require('jsonwebtoken');

function authenticated(req, res, next){
    const authHeader = req.headers.token;
    
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err)res.status(403).json("Token is not Valid!");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports = authenticated;