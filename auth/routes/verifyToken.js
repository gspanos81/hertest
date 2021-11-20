const jwt = require('jsonwebtoken');

function auth (req,res,next){

    const token = req.header('auth-token');
    if(!token) return res.status(400).send('ACcess Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_S);
        req.user = verified;

    }catch(err) {
        res.status(400).send('Invalid Token');

    }

}