const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const getToken = req.headers['access-token']

    if(!getToken){
        const replyText = {
            loginStatus: false, 
            text:"please login before access to this page."
        }
        res.send(replyText)
    }else{
        try{
            const decode = jwt.verify(getToken, process.env.TOKEN_KEY)
            const replyText = {
                loginStatus: true,
                decode: decode,
                token: getToken
            }
            res.send(replyText)
        }catch(err){
            const replyText = {
                loginStatus: false, 
                error: err.message,
                text:"please login before access to this page."
            }
            res.send(replyText)
        }
    }
    return next();
}

module.exports = verifyToken