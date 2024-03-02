var jwt = require('jsonwebtoken');

const secretKey = 'abdo'

exports.JWTGenerator = (username , password) => {
   return jwt.sign({username,password},secretKey)
}

exports.JWTVerifier = (token) => {
  const verify = jwt.verify(token , secretKey);
  if(!verify)
  return null
return verify;
}