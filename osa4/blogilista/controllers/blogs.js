const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

  
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = request.user
  if (userId === null) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(userId)

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  console.log(blog)

  const savedBlog = await blog
    .save()
    .then(result => result.populate('user', { username: 1, name: 1 }).execPopulate())
    
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user

    if (!user.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id) {
        return response.status(401).json({ error: 'token invalid' })
    } else {
        await Blog.findByIdAndDelete(request.params.id)
    }
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({ error: 'body missing' })
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1 })

    response.json(updatedBlog)
})

  
module.exports = blogRouter