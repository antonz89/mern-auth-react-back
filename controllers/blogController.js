const Blog = require("../models/BlogModel")
const mongoose = require('mongoose')

//get all blogs
const getBlogs = async(req,res)=>{
    //user will see only blogs he added
    const user_id = req.user._id

    //                                    descending order
    const blogs = await Blog.find({user_id}).sort({createdAt: -1})
    res.status(200).json(blogs)
}

//get a single blog
const getBlog = async(req,res)=>{
    
    const {id} = req.params

    // to check if id is valid 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})

    }

    const blog = await Blog.findById(id)

    if(!blog){
        return res.status(404).json({error: "No such blog"})
    }
    
    
    res.status(200).json(blog)
}

//create a new blog
const createBlog = async (req,res) =>{
    const {title, text, author,createdAt} = req.body
    
    try {
        const user_id = req.user._id
        const blog = await Blog.create({title,text,author,createdAt,user_id})
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
//delete a blog
const deleteBlog = async(req,res)=>{
    const {id} = req.params

    // to check if id is valid 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})

    }

    const blog = await Blog.findByIdAndDelete({_id:id})

    if(!blog){
        return res.status(404).json({error: "No such blog"})
    }

    res.status(200).json(blog)
}

//update a blog
const updateBlog = async(req,res)=>{
    const {id} = req.params

    // to check if id is valid 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})

    }
    
    const blog = await Blog.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!blog){
        return res.status(404).json({error: "No such blog"})
    }

    res.status(200).json(blog)
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}