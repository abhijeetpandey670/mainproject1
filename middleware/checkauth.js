const jwt =require('jsonwebtoken')
const UserModel = require("../models/user")

const checkUserAuth = async(req,res,next) =>{
    // console.log("hello authentication")
    const {token}=req.cookies
    if (!token) {
        req.flash('error', 'Please login first');
        res.redirect('/')

    }else{
        const verifyToken = jwt.verify(token, "mjnbvrydctfvyijmkol");
        //console.log(verifyToken)
        const data = await UserModel.findOne({_id: verifyToken.ID});
        //console.log(data)
        req.userData = data;
        next();
    }
}
module.exports=checkUserAuth