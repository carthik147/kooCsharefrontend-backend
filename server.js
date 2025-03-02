 const express=require('express')
 const mongoose=require('mongoose')
 require('dotenv').config()
 const User=require('./models/User')
 const bcrypt=require('bcryptjs')

 const app=express()
 const PORT=3000
 app.use(express.json());
 
app.get('/',(req, res)=>{
    res.send("<h1 align='center'>hello</h1>")
})

app.post('/register',async(req, res)=>{
   const {username,email,password}=req.body;
   try{
      const hashedpassword= await bccrypt.hash(password,10)
      const User=new User({username,email,password:hashedpassword})
      await username.save()
      res.json({message: "User Registerd.."})
      console.log("User Registration completed...")
   }
   catch(err){
      console.log(err)
   }
})

app.post('/login',async(req, res)=>{
   const {email,password}=req.body
   try{
      const user=await User.fimdOne({email}); 
      if (!user || !(await bycrypt.compare(password,user.password))){
         return res.status(400).json({ message: "Invalid Credentials"})
      }
      res.json({message:"Login Successful", username: user.username})
   }
   catch(err){
      console.log(err)
   }
  })

 mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully..")
 ).catch(
    (err)=>console.log(err)
 )

 app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("Server is running on port: "+PORT)
 })