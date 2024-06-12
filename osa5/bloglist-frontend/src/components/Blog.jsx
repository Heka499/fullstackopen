import { useState } from 'react'

const Blog = ({ blog }) => {
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
        <p>Likes: {blog.likes} <button onClick={console.log("click")}>Like</button> </p>
      </div>  
    )
  }
}

export default Blog