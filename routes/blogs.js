const express = require('express')

const {
    createBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    updateBlog
} = require("../controllers/blogController")


const requireAuth = require('../middleware/requireAuth')



const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// routes
router.get('/', getBlogs )

router.get('/:id', getBlog)

router.post('/', createBlog )

router.delete('/:id', deleteBlog)

router.patch('/:id', updateBlog)





module.exports = router