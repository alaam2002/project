const express =require ("express");
const app=express();
const User = require('./models/Users');
const Cart=require('./models/Cart');
const mongoose=require("mongoose");
const bodyP =require("body-parser");
const bcrypt=require("bcryptjs");
const multer=require("multer");
const path=require("path");

const {body ,validationResult}=require("express-validator");
app.use(express.json());

mongoose
.connect('mongodb://127.0.0.1:27017/ourstor')
.then(() => {console.log('connected to MongoDB')})  
.catch((error) => {console.log('faild connect to mongodb'+error)})

app.get("/user",async (req, res) => {
try{
    const user= await User.find({});
    res.status(200).json(user);
}catch(error){
res.status(400).jason({message: error.message})
}

});


app.listen(3000,()=>{console.log(" server runing on port 3000")})
app.post('/signUp',  [body("username","username required and  must have min 4 characterand max 30 character ").isLength({min:4,max:30}).notEmpty(),
body('password','password required must be min 8 character').isLength({min:8}).notEmpty(),
body('phoneNumber','wrong phone namber').isLength({min:11,max:11}).notEmpty(),
body('email','wrong email').isEmail().notEmpty()],async (req, res,next) => {


try{
    //get user object from body
    let userParam = req.body;
    // validate



    const error=validationResult(req);

    if (!error.isEmpty()) {
         res.status(400).json( {error : error.array()});
      }
    // const isValid = validator.validate(userParam.email);


    // if( !isValid){
    //     res.status(400).json({ message: 'wrong email' });
    // }

    if (await User.findOne({ email: userParam.email })) {
        res.status(400).send( 'email "' + userParam.email + '" is already exist');
    }
    if (await User.findOne({ phoneNumber: userParam.phoneNumber })) {
        res.status(400).send( 'phone "' + userParam.phoneNumber + '" is already exist');
    }



    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt)

    const user = new User(userParam);

    // save user
     const result= await user.save();

     res.status(201).send(result)

}catch(err)
{
    res.status(400).send('server error: '+ err);
}

});


