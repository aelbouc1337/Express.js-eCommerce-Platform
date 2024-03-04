const { JWTVerifier } = require("../helpers/jwtGenerator");

exports.isAuth = (req,res,next) => {
    const [,token] = req.headers.authorization.split(' ');
    
    

    
    const verify = JWTVerifier(token)
    if(!verify)
    res.redirect('/login')
else {
    req.user = verify;
    next();
}
}