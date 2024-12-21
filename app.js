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
