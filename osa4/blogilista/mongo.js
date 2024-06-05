const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://hejarvinen:${password}@cluster0.dosqfdc.mongodb.net/testBlogApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

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

Blog.insertMany(initialBlogs).then(result => {
    console.log('blogs saved!')
    mongoose.connection.close()
})