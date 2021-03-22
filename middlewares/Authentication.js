const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const {authorization} = req.headers;
        const signedData = jwt.verify(authorization, 'my-signing-secret');
        req.signedData = signedData;
        next();
    }
    catch(err){
        console.log(err.message);
        statusCode=422;
        res.send({success:false,message:"Authentication failed"});
    }
}