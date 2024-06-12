
const BlogForm = ({ title, author, url, handleBlogChange, addBlog  }) => {
    return (
        <form onSubmit={addBlog}>
            <label>title:</label>
            <input
                value={title}
                name='title'
                onChange={handleBlogChange}
            />
            <label>author:</label>
            <input
                value={author}
                name='author'
                onChange={handleBlogChange}
            />
            <label>url:</label>
            <input
                value={url}
                name='url'
                onChange={handleBlogChange}
            />
            <button type="submit">save</button>
        </form>
    )
}

export default BlogForm