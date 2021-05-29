const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String  
    },
    img: {
        type: String
    },
    author:{
        type: String
    },
    desc:{
        type: String
    }
})


const Blog = new mongoose.model('Blog',blogSchema);

module.exports = Blog;