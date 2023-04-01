const router = require('express').Router();
const UserModel = require('./../models/user_model');
const bcrypt = require('bcrypt');
router.get("/:userid",async (req,res)=>{
    const userid = req.params.userid;
    const foundUser = await UserModel.findOne({ userid:userid });
    if(!foundUser){
        res.json({success:false , message: "User not found"})
    }
    res.json({success:true,data:foundUser});
})
router.post("/createaccount",async function(req,res){
    const userData = req.body;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    userData.password = hashedPassword;
    const newUser = new UserModel({...userData});
    try{
    await newUser.save();
    res.send({newUser ,message: "user created Successfully"});
    }catch(err){
        console.log(err);
        res.send({error:"couldn't create account"})
    }
});
router.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const foundUser = await UserModel.findOne({email:email});
    if(!foundUser){
        res.json({success: false, error: "User Email not found"});
        return;
    }
    const correctPassword = await bcrypt.compare(password,foundUser.password);
    if(!correctPassword){
        res.json({success: false, error: "Incorrect Password"});
        return;
    }
    res.json({success:true, message:"successfully logined",data:foundUser});
});
module.exports = router;