import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, user, remove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleClick = () => {
    like(blog.id)
  }

  const handleRemove = () => {
    remove(blog.id)
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>view</button></p>
      </div>  
    )
  } else {
    return (
      <div style={blogStyle}>
        <p>Title: {blog.title} <button onClick={toggleVisibility}>hide</button> </p>
        <p>Author: {blog.author}</p>
        <p>Link: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleClick}>Like</button> </p>
        <p>Added by: {blog.user.name}</p>
        {user.username === blog.user.username && <button onClick={handleRemove}>Remove</button>}
      </div>  
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog