import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
    const blogInitialState = {
        title: '',
        author: '',
        url: ''
    }
    const [newBlog, setNewBlog] = useState(blogInitialState)

    const handleBlogChange = (event) => {
        setNewBlog({ ...newBlog, [event.target.name]: event.target.value})
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        })

        setNewBlog(blogInitialState)
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                <label>title:</label>
                <input
                    value={newBlog.title}
                    name='title'
                    onChange={handleBlogChange}
                    placeholder="Title"
                />
            </div>
            <div>
                <label>author:</label>
                <input
                    value={newBlog.author}
                    name='author'
                    onChange={handleBlogChange}
                    placeholder="Author"
                />
            </div>
            <div>
                <label>url:</label>
                <input
                    value={newBlog.url}
                    name='url'
                    onChange={handleBlogChange}
                    placeholder="URL"
                />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm