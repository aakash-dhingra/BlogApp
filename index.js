const express = require('express');
const app = express();
const Blog = require('./models/blog');
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const seed = require('./seed');
const path = require('path');


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(methodOverride('_method'));




//Connection------------------------
mongoose.connect('mongodb://localhost/BlogApp', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err.message);
})

// seed();

app.get('/',(req,res)=>{
    res.send("Hello From Server");
})



app.get('/blogs',async(req,res)=>{
    const blogData = await Blog.find({});
    res.render('blog',{blogData});
})

app.post('/blogs',(req,res)=>{
    const newBlog = req.body;
    Blog.create(newBlog);
    res.redirect('/blogs');
})

app.get('/blogs/new',(req,res)=>{
    res.render('new');
})

app.get('/blogs/:id',async(req,res)=>{

    const blog = await Blog.findById(req.params.id);
    res.render('show',{blog})
})


app.get('/blogs/:id/edit',async(req,res)=>{
    const blog = await Blog.findById(req.params.id)
    res.render('edit',{blog});
})

app.patch('/blogs/:id',async(req,res)=>{
    const blog = await Blog.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/blogs');
})
app.delete('/blogs/:id',async(req,res)=>{
    
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');

})


app.listen(3000,()=>{
    console.log("Server Running at Port 3000");
})