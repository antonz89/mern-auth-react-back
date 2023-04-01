const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    //need this so users will se only the blogs they added, not every blog by every user, every blog associated with the user
    user_id:{
        type:String,
        required:true
    },
    
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('blogs', blogSchema)