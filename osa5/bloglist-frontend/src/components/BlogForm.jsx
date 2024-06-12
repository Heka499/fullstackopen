import { useState } from "react"

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
                />
            </div>
            <div>
                <label>author:</label>
                <input
                    value={newBlog.author}
                    name='author'
                    onChange={handleBlogChange}
                />
            </div>
            <div>
                <label>url:</label>
                <input
                    value={newBlog.url}
                    name='url'
                    onChange={handleBlogChange}
                />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

export default BlogForm