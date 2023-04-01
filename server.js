require('dotenv').config()
const cors = require('cors');

const express = require('express')

const mongoose = require("mongoose")

const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors({ origin: true, credentials: true}))
app.options("*", cors());

app.use(express.json())

app.use((req,res, next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/blogs', blogRoutes)
app.use('/user', userRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        
    })
})
.catch ((error)=>{
    console.log(error)
})




