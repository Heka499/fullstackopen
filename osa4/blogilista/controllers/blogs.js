const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const body = request.body

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
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
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

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

  
module.exports = blogRouter