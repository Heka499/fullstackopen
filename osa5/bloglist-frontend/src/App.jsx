import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage('Logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

const addBlog = (blogObject) => {
  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    .catch(error => {
      setErrorMessage('Error adding blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  })
}

const handleLike = (id) => {
  const blog = blogs.find(b => b.id === id)
  const changedBlog = { ...blog, likes: blog.likes + 1 }

  blogService
    .update(id, changedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
    .catch(error => {
      setErrorMessage('Error updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
}

const handleRemove = (id) => {
  if (window.confirm('Remove blog?')) {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(error => {
        setErrorMessage('Error removing blog:', error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
}


  return (
    <div>
      {!user && <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>}
      {user && <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          {blogs
            .sort((a, b) => b.likes - a.likes) // Sort blogs based on likes
            .map(blog =>
              <Blog key={blog.id} blog={blog} user={user} like={handleLike} remove={handleRemove} />
            )}
        </div>
      </div>
      }
    </div>
  )
}

export default App