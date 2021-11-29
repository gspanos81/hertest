const jwt = require('jsonwebtoken');

module.exports = function auth (req,res,next){

   // const token = req.header('auth-token');
    const token = req.body.token;
    const decoded = jwt.decode(token);
    console.log(decoded._id);
    if(!token) return res.status(400).send('ACcess Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_S);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).send('Invalid Token');

    }

}