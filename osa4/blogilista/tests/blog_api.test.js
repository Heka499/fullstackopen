const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { title } = require('node:process')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert(blog.id)
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Test blog',
        author: 'Test man',
        url: 'http://www.test.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${await helper.getToken()}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Test blog'))
})

test('blog without likes property defaults to 0', async () => {
    const newBlog = {
        title: '0 likes test blog',
        author: '0 likes',
        url: 'http://www.0likes.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${await helper.getToken()}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === '0 likes test blog')

    assert.strictEqual(addedBlog.likes, 0)
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: 'No title or url',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${await helper.getToken()}`)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const token = await helper.getToken()
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
        title: 'To delete',
        author: 'Dleter',
        url: 'http://www.delete.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogToDelete = await Blog.findOne({ title: 'To delete' })

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

})

test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        title: 'Updated blog',
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .set('Authorization', `Bearer ${await helper.getToken()}`)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)

    assert(titles.includes('Updated blog'))
})

test('a blog is not added without token', async () => {
    const newBlog = {
        title: 'Test blog',
        author: 'Test man',
        url: 'http://www.test.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)

})

after(async () => {
    await mongoose.connection.close()
})