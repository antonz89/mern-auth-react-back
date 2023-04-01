const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

//installed validator for passwords npm install validator
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//siqnup static method
userSchema.statics.signup = async function (email,password){
    //validator check 
    if(!email || !password){
        throw Error ("All fields must be filled")
    }
    //validator check for email
    if(!validator.isEmail(email)){
        throw Error ("Email is not valid")
    }
    //validator check for password: eight symbols long, upper, number, special char
    if(!validator.isStrongPassword(password)){
        throw Error ("Password not strong enough")
    }
    
    
    //another check to make sure email used to signup isnt taken already
    const exists = await this.findOne({email})
    if(exists){
        throw Error("email already in use")
    }

    // generating salt
    const salt = await bcrypt.genSalt(10)
    //hashing
    const hash = await bcrypt.hash(password,salt)
    //creatin user
    const user = await this.create({email,password: hash})

    return user

}

//static login method
userSchema.statics.login = async function (email,password){
    //validator check 
    if(!email || !password){
        throw Error ("All fields must be filled")
    }

    //another check to make sure email used to signup isnt taken already
    const user = await this.findOne({email})
    if(!user){
        throw Error("Incorrect email")
    }
    
    // matching passwords/hashes        pass       hash
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
    

}


module.exports = mongoose.model('User', userSchema)