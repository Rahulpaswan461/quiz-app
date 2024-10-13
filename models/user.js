const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { createTokenForAuthenticateUser } = require("../services/jwtAuth");

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
     },
     email: {
        type: String,
        required: true,
     },
     password: {
        type: String,
        required: true,
     }
},{timestamps:true})

userSchema.pre("save",async function(next){
    const user = this;
     
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password,salt)
    user.password = hashedPassword

   next();
})

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
     const user = await this.findOne({email:email})
     if(!user){
      throw new Error("Invalid username or password ")
     }

     const isMatch = await bcrypt.compare(password,user.password)
     if(isMatch){
       const token = createTokenForAuthenticateUser(user)
       return token;
     }
     else{
      throw new Error("Inavlid username or password")
     }
})

const User = mongoose.model("user",userSchema)

module.exports = User