const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)  

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'John Doe',
        url: 'http://www.example.com',
        likes: 5,
    },
    {
        title: 'Browser can execute only Javascript',
        author: 'Mary Jane',
        url: 'http://www.joku.com',
        likes: 10,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'John Doe', url: 'http://www.example.com', likes: 5 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const getToken = async () => {
    const user = {
        username: 'root',
        password: 'sekret',
    }

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    return response.body.token
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    getToken,
}