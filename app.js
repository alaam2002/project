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





app.post('/login',  async (req, res) => {


    try{
        //get user object from body 
        let userParam = req.body;
        // validate
          
      let user = await User.findOne({email: userParam.email});


        if (!user) {
            res.status(400).send( 'wrong email or password');
        }


const passwordMatch= await bcrypt.compare(userParam.password,user.password)
        
        // const salt=await bcrypt.genSalt(10);
        // req.body.password=await bcrypt.hash(req.body.password,salt)
    
       if(passwordMatch){
        res.status(201).send( ' login successfully!')
       }else{

        res.status(400).send( 'wrong email or password ')
       }
       

    
    }catch(err)
    {
        res.status(400).send('server error: '+ err);
    }


    
    });





    app.put('/update/:email', [body("username","username required and  must have min 4 characterand max 30 character ").isLength({min:4,max:30}).notEmpty(),
    body('password','password required must be min 8 character').isLength({min:8}).notEmpty(),
    body('phoneNumber','wrong phone namber').isLength({min:11,max:11}).notEmpty(),
    body('email','wrong email').isEmail().notEmpty()],async (req, res) => {
        try{   
        
        let userParam = req.body;

          
     
    const error=validationResult(req);
      
    if (!error.isEmpty()) {  
         res.status(400).json( {error : error.array()});
      }

        if(userParam.password){
    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        
        let user = await User.findOneAndUpdate({email :req.params.email},{
            username: userParam.username,
            email:userParam.email,
            password:userParam.password,
            phoneNumber:userParam.phoneNumber

        },{new:true});


if(user){
    res.status(201).json( ' updated successfully!')
}




        }catch(err)
    {
        res.status(400).json('server error: '+ err);
    }

    });

