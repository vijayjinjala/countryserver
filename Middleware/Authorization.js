var jwt = require('jsonwebtoken');
const Auth= (req,res,next)=>  {     
    const   token = req.headers['vijay-token'];
    if(token != null){
    var data=  jwt.verify(token,process.env.PRIVATE_KEY)
    if(!data){
        res.status(403).json({ 
            "message":"access denite",
        });
     
    }else{
        req._id=data.id;
        next();
    }
}else{
    res.status(403).json({
        "message":"Access Denaid"
    })
}
}
module.exports=Auth;